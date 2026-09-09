// Areas we currently serve
export const SERVED_PIN_CODES = ['560043', '560084']

export const SERVED_LOCALITIES = [
  { name: 'Kalyan Nagar', pinCode: '560043' },
  { name: 'HRBR Layout', pinCode: '560043' },
  { name: 'Babusapalya', pinCode: '560043' },
  { name: 'Kammanahalli', pinCode: '560084' },
]

// Check if a PIN code is in our service area
export function isDeliveryArea(pinCode) {
  if (!pinCode) return false
  return SERVED_PIN_CODES.includes(pinCode)
}

// Extract 6-digit PIN from address text
export function extractPinCode(address) {
  if (!address) return null
  const match = address.match(/(\d{6})/)
  return match ? match[1] : null
}
