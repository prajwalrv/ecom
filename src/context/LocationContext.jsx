import { createContext, useContext, useState, useCallback } from 'react'
import { isDeliveryArea } from '../data/deliveryAreas'

const LocationContext = createContext(null)

// Cache location in sessionStorage so we don't re-ask every render
const LOCATION_CACHE_KEY = 'rcl-location'

function loadCachedLocation() {
  try {
    const cached = sessionStorage.getItem(LOCATION_CACHE_KEY)
    return cached ? JSON.parse(cached) : null
  } catch {
    return null
  }
}

function saveLocationCache(data) {
  try {
    sessionStorage.setItem(LOCATION_CACHE_KEY, JSON.stringify(data))
  } catch {
    // ignore
  }
}

export function LocationProvider({ children }) {
  const cached = loadCachedLocation()
  const [location, setLocation] = useState({
    pinCode: cached?.pinCode || null,
    locality: cached?.locality || null,
    loading: false,
    error: null,
    permissionDenied: false,
  })

  const requestLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setLocation(prev => ({ ...prev, error: 'Geolocation not supported' }))
      return
    }

    setLocation(prev => ({ ...prev, loading: true, error: null }))

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords
        try {
          // Reverse geocode using Nominatim (OpenStreetMap) — free, no API key
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&addressdetails=1`,
            {
              headers: {
                'Accept': 'application/json',
              },
            }
          )

          if (!res.ok) throw new Error('Geocoding failed')

          const data = await res.json()
          const pinCode = data.address?.postcode || null
          const locality =
            data.address?.suburb ||
            data.address?.neighbourhood ||
            data.address?.residential ||
            data.address?.city_district ||
            data.address?.city ||
            null

          const result = {
            pinCode,
            locality,
            loading: false,
            error: null,
            permissionDenied: false,
          }

          setLocation(result)
          saveLocationCache({ pinCode, locality })
        } catch (geoErr) {
          setLocation(prev => ({
            ...prev,
            loading: false,
            error: 'Could not determine your location',
          }))
        }
      },
      (err) => {
        // Permission denied or unavailable
        setLocation({
          pinCode: null,
          locality: null,
          loading: false,
          error: null,
          permissionDenied: true,
        })
      },
      {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 300000, // 5 min cache
      }
    )
  }, [])

  const isInServiceArea = isDeliveryArea(location.pinCode)

  return (
    <LocationContext.Provider
      value={{
        ...location,
        isInServiceArea,
        requestLocation,
      }}
    >
      {children}
    </LocationContext.Provider>
  )
}

export function useLocation() {
  const ctx = useContext(LocationContext)
  if (!ctx) throw new Error('useLocation must be used within LocationProvider')
  return ctx
}
