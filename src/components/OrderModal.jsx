import { useState, useMemo } from 'react'
import { X, Send, MapPin, ShoppingBag, CheckCircle, AlertTriangle } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { supabase } from '../lib/supabase'
import { isDeliveryArea, extractPinCode } from '../data/deliveryAreas'

function generateOrderId() {
  return 'RCL-' + Date.now().toString(36).toUpperCase()
}

export default function OrderModal() {
  const {
    items, total, subtotal, tax,
    isOrderModalOpen, setIsOrderModalOpen,
    clearCart,
  } = useCart()

  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    deliveryType: 'pickup',
    address: '',
    instructions: '',
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [orderId, setOrderId] = useState('')
  const [error, setError] = useState('')
  const [emailFailed, setEmailFailed] = useState(false)

  // Delivery area PIN check
  const detectedPin = useMemo(() => extractPinCode(form.address), [form.address])
  const deliveryAvailable = useMemo(() => isDeliveryArea(detectedPin), [detectedPin])
  const isDeliveryBlocked = form.deliveryType === 'delivery' && detectedPin && !deliveryAvailable

  if (!isOrderModalOpen) return null

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Prevent double-submission while a request is in flight
    if (loading || success) return

    if (!form.name.trim() || !form.phone.trim()) {
      setError('Please fill in your name and phone number.')
      return
    }

    // Phone validation: strip non-digits, check for at least 10 digits
    const phoneDigits = form.phone.replace(/\D/g, '')
    if (phoneDigits.length < 10) {
      setError('Please enter a valid 10-digit phone number.')
      return
    }

    if (form.deliveryType === 'delivery' && !form.address.trim()) {
      setError('Please enter your delivery address.')
      return
    }

    // Hard block: delivery to non-served area
    if (form.deliveryType === 'delivery' && detectedPin && !deliveryAvailable) {
      setError('Sorry, we don\'t deliver to your area yet. We\'ll be coming soon!')
      return
    }

    setLoading(true)
    setEmailFailed(false)
    const oid = generateOrderId()

    // 1. DB insert — best-effort log for developer tracking; never blocks the order
    try {
      const { error: dbError } = await supabase
        .from('orders')
        .insert({
          order_id: oid,
          customer_name: form.name.trim(),
          phone: form.phone.trim(),
          email: form.email.trim() || null,
          order_type: form.deliveryType,
          address: form.address.trim() || null,
          instructions: form.instructions.trim() || null,
          items: items.map(item => ({
            id: item.id,
            name: item.name,
            price: item.price,
            qty: item.qty,
          })),
          subtotal,
          tax,
          total,
          status: 'pending',
        })

      if (dbError) {
        console.error('Order DB insert failed:', dbError)
      }
    } catch (dbErr) {
      console.error('Order DB insert threw:', dbErr)
    }

    // 2. Email send — this is the actual order fulfillment channel
    const orderDate = new Date().toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'full',
      timeStyle: 'short',
    })

    const deliveryAddress = form.deliveryType === 'delivery'
      ? (form.address.trim() || '—')
      : 'Pickup at restaurant'

    const itemsFormatted = items
      .map(i => `${i.name}\n  ₹${i.price} × ${i.qty} = ₹${i.price * i.qty}`)
      .join('\n\n')

    const emailBody = `══════════════════════════════════════════════════
    NEW ORDER - RED CHILLI LANTERN 🏮
═══════════════════════════════════════════════════

Order Date & Time:
${orderDate}

───────────────────────────────────────────────────
CUSTOMER DETAILS
───────────────────────────────────────────────────
Name:     ${form.name.trim()}
Phone:    ${form.phone.trim()}
Email:    ${form.email.trim() || '—'}

Delivery Address:
${deliveryAddress}

───────────────────────────────────────────────────
ORDER ITEMS
───────────────────────────────────────────────────
${itemsFormatted}

───────────────────────────────────────────────────
TOTAL AMOUNT: ₹${total}
───────────────────────────────────────────────────

Special Instructions:
${form.instructions.trim() || 'None'}

═══════════════════════════════════════════════════

⚡ ACTION REQUIRED:
1. Call customer to confirm order
2. Prepare the food
3. Arrange delivery

Customer is waiting for confirmation!

═══════════════════════════════════════════════════`

    let emailOk = false
    try {
      const emailRes = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_KEY,
          subject: `🍜 New Order ${oid} — ${form.deliveryType === 'delivery' ? 'Delivery' : 'Pickup'}`,
          from_name: 'Red Chilli Lantern',
          email: form.email.trim() || 'no-reply@redchillilantern.in',
          _replyto: form.email.trim() || 'no-reply@redchillilantern.in',
          message: emailBody,
        }),
      })
      const emailData = await emailRes.json()
      if (emailData.success) {
        emailOk = true
      } else {
        console.warn('Order email failed:', emailData)
      }
    } catch (emailErr) {
      console.warn('Order email error:', emailErr)
    }

    // Result: email success = order placed; email failure = show success with a "please call" notice
    if (emailOk) {
      setOrderId(oid)
      setSuccess(true)
      setEmailFailed(false)
    } else {
      // Email failed but we still consider the order placed — alert the customer
      setOrderId(oid)
      setSuccess(true)
      setEmailFailed(true)
    }
    clearCart()
    setLoading(false)
  }

  const handleClose = () => {
    setIsOrderModalOpen(false)
    setSuccess(false)
    setEmailFailed(false)
    setForm({
      name: '', phone: '', email: '',
      deliveryType: 'pickup', address: '', instructions: '',
    })
    setError('')
  }

  return (
    <div className="modal-wrapper" role="dialog" aria-modal="true" aria-label="Place order">
      <div className="modal-overlay" onClick={handleClose} />

      <div className="modal">
        {/* Close Button */}
        <button
          className="cart-close-btn"
          style={{ position: 'absolute', top: '20px', right: '20px' }}
          onClick={handleClose}
          aria-label="Close order form"
        >
          <X size={18} />
        </button>

        {success ? (
          /* ── SUCCESS STATE ── */
          <div className="modal-success">
            <div className="success-icon-wrapper">✅</div>
            <h2 className="success-title">Order Placed!</h2>
            <p className="success-text">
              Your order has been received! We'll contact you on{' '}
              <strong style={{ color: 'var(--color-gold)' }}>{form.phone}</strong> shortly
              to confirm your order.
            </p>
            <div className="success-order-id">Order ID: {orderId}</div>
            {emailFailed && (
              <p style={{
                marginTop: '12px',
                padding: '10px 14px',
                background: 'rgba(212, 175, 55, 0.12)',
                border: '1px solid rgba(212, 175, 55, 0.3)',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.82rem',
                color: 'var(--color-gold)',
                textAlign: 'center',
              }}>
                ⚠️ We couldn't send the email notification — please call us at +91 93302 69986 to confirm your order.
              </p>
            )}
            <p style={{ fontSize: '0.8rem', color: 'var(--color-text-dim)' }}>
              📍 435, 2nd Cross Rd, HRBR Layout, Kalyan Nagar, Bengaluru 560043
            </p>
            <button
              className="btn-primary"
              style={{ marginTop: '8px' }}
              onClick={handleClose}
            >
              Back to Menu
            </button>
          </div>
        ) : (
          /* ── ORDER FORM ── */
          <>
            <div className="modal-header">
              <div className="modal-icon">🏮</div>
              <h2 className="modal-title">Place Your Order</h2>
              <p className="modal-subtitle">Fill in your details and we'll confirm shortly</p>
            </div>

            {/* Order Summary */}
            <div className="modal-order-summary">
              <div className="modal-order-summary-title">
                <ShoppingBag size={12} style={{ display: 'inline', marginRight: '6px' }} />
                Order Summary
              </div>
              {items.map(item => (
                <div key={item.id} className="modal-order-item">
                  <span className="modal-order-item-name">
                    {item.name} × {item.qty}
                  </span>
                  <span className="modal-order-item-price">₹{item.price * item.qty}</span>
                </div>
              ))}
              <div className="modal-order-total">
                <span>Total (incl. GST)</span>
                <span style={{ color: 'var(--color-gold)' }}>₹{total}</span>
              </div>
            </div>

            {/* Form */}
            <form className="modal-form" onSubmit={handleSubmit} id="order-form">
              {/* Delivery Type Toggle */}
              <div className="form-group">
                <label className="form-label">Order Type</label>
                <div className="delivery-toggle">
                  <button
                    type="button"
                    id="opt-pickup"
                    className={`delivery-option ${form.deliveryType === 'pickup' ? 'active' : ''}`}
                    onClick={() => setForm(p => ({ ...p, deliveryType: 'pickup' }))}
                  >
                    🏃 Pickup
                  </button>
                  <button
                    type="button"
                    id="opt-delivery"
                    className={`delivery-option ${form.deliveryType === 'delivery' ? 'active' : ''}`}
                    onClick={() => setForm(p => ({ ...p, deliveryType: 'delivery' }))}
                  >
                    🚴 Delivery
                  </button>
                </div>
              </div>

              <div className="modal-form-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="order-name">Your Name *</label>
                  <input
                    id="order-name"
                    name="name"
                    type="text"
                    className="form-input"
                    placeholder="e.g. Rahul Sharma"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="order-phone">Phone Number *</label>
                  <input
                    id="order-phone"
                    name="phone"
                    type="tel"
                    className="form-input"
                    placeholder="+91 98765 43210"
                    value={form.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="order-email">Email (optional)</label>
                <input
                  id="order-email"
                  name="email"
                  type="email"
                  className="form-input"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>

              {form.deliveryType === 'delivery' && (
                <div className="form-group">
                  <label className="form-label" htmlFor="order-address">
                    <MapPin size={12} style={{ display: 'inline', marginRight: '4px' }} />
                    Delivery Address *
                  </label>
                  <textarea
                    id="order-address"
                    name="address"
                    className="form-textarea"
                    placeholder="Enter your full delivery address with PIN code..."
                    value={form.address}
                    onChange={handleChange}
                    style={{ minHeight: '80px' }}
                  />

                  {/* PIN Code Delivery Check */}
                  {detectedPin && (
                    <div className={`delivery-check ${deliveryAvailable ? 'delivery-check--ok' : 'delivery-check--blocked'}`}>
                      {deliveryAvailable ? (
                        <>
                          <CheckCircle size={14} />
                          <span>Delivery available to {detectedPin}</span>
                        </>
                      ) : (
                        <>
                          <AlertTriangle size={14} />
                          <span>Sorry, we don't deliver to {detectedPin} yet. We'll be coming soon!</span>
                        </>
                      )}
                    </div>
                  )}
                </div>
              )}

              <div className="form-group">
                <label className="form-label" htmlFor="order-instructions">Special Instructions</label>
                <textarea
                  id="order-instructions"
                  name="instructions"
                  className="form-textarea"
                  placeholder="Spice level, allergies, or any requests..."
                  value={form.instructions}
                  onChange={handleChange}
                  style={{ minHeight: '72px' }}
                />
              </div>

              {error && (
                <div style={{
                  padding: '12px 16px',
                  background: 'rgba(192, 57, 43, 0.1)',
                  border: '1px solid rgba(192, 57, 43, 0.3)',
                  borderRadius: 'var(--radius-sm)',
                  color: 'var(--color-crimson-light)',
                  fontSize: '0.88rem',
                }}>
                  ⚠️ {error}
                </div>
              )}

              {/* Hidden anti-bot honeypot */}
              <input type="checkbox" name="botcheck" style={{ display: 'none' }} />

              <button
                id="submit-order-btn"
                type="submit"
                className="modal-submit-btn"
                disabled={loading || items.length === 0 || isDeliveryBlocked}
              >
                {loading ? (
                  <>
                    <span className="spinner" />
                    Placing Order...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Confirm Order — ₹{total}
                  </>
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
