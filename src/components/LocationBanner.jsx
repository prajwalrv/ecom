import { useState, useEffect } from 'react'
import { MapPin, X, CheckCircle, AlertTriangle } from 'lucide-react'
import { useLocation } from '../context/LocationContext'

const DISMISS_KEY = 'rcl-location-banner-dismissed'

export default function LocationBanner() {
  const { pinCode, locality, loading, error, permissionDenied, isInServiceArea, requestLocation } = useLocation()
  const [dismissed, setDismissed] = useState(() => {
    try {
      return localStorage.getItem(DISMISS_KEY) === 'true'
    } catch {
      return false
    }
  })

  useEffect(() => {
    if (!pinCode && !loading && !permissionDenied && !dismissed) {
      requestLocation()
    }
  }, [])

  const handleDismiss = () => {
    setDismissed(true)
    try {
      localStorage.setItem(DISMISS_KEY, 'true')
    } catch {
      // ignore
    }
  }

  if (dismissed && pinCode) return null

  // Loading state
  if (loading) {
    return (
      <div className="location-banner location-banner--loading">
        <div className="container location-banner-inner">
          <div className="location-banner-left">
            <span className="location-banner-spinner" />
            <span><span className="lb-full">Detecting your location...</span><span className="lb-short">Detecting...</span></span>
          </div>
          <button className="location-banner-close" onClick={handleDismiss} aria-label="Dismiss">
            <X size={14} />
          </button>
        </div>
      </div>
    )
  }

  // Permission denied / error — show detect button
  if (permissionDenied || error) {
    return (
      <div className="location-banner location-banner--info">
        <div className="container location-banner-inner">
          <div className="location-banner-left">
            <MapPin size={14} />
            <span><span className="lb-full">Want delivery? Detect your location to check availability.</span><span className="lb-short">Check delivery</span></span>
          </div>
          <div className="location-banner-actions">
            <button className="location-banner-btn" onClick={requestLocation}>
              Detect
            </button>
            <button className="location-banner-close" onClick={handleDismiss} aria-label="Dismiss">
              <X size={14} />
            </button>
          </div>
        </div>
      </div>
    )
  }

  // No PIN yet and not loading — show initial detect prompt
  if (!pinCode && !loading) {
    return (
      <div className="location-banner location-banner--info">
        <div className="container location-banner-inner">
          <div className="location-banner-left">
            <MapPin size={14} />
            <span><span className="lb-full">Check if we deliver to your area</span><span className="lb-short">Check delivery</span></span>
          </div>
          <div className="location-banner-actions">
            <button className="location-banner-btn" onClick={requestLocation}>
              Detect
            </button>
            <button className="location-banner-close" onClick={handleDismiss} aria-label="Dismiss">
              <X size={14} />
            </button>
          </div>
        </div>
      </div>
    )
  }

  // In service area
  if (isInServiceArea) {
    return (
      <div className="location-banner location-banner--success">
        <div className="container location-banner-inner">
          <div className="location-banner-left">
            <CheckCircle size={14} />
            <span>
              <span className="lb-full">We deliver to <strong>{locality || 'your area'}</strong> ({pinCode})</span>
              <span className="lb-short">{locality || pinCode}</span>
            </span>
          </div>
          <button className="location-banner-close" onClick={handleDismiss} aria-label="Dismiss">
            <X size={14} />
          </button>
        </div>
      </div>
    )
  }

  // Outside service area
  return (
    <div className="location-banner location-banner--warning">
      <div className="container location-banner-inner">
        <div className="location-banner-left">
          <AlertTriangle size={14} />
          <span>
            <span className="lb-full">We're not in <strong>{locality || 'your area'}</strong> ({pinCode}) yet — but we're coming soon!</span>
            <span className="lb-short">Coming soon!</span>
          </span>
        </div>
        <button className="location-banner-close" onClick={handleDismiss} aria-label="Dismiss">
          <X size={14} />
        </button>
      </div>
    </div>
  )
}
