import { useState, useCallback, useEffect, useRef } from 'react'
import { ShoppingCart, Check, Star, Minus } from 'lucide-react'
import { useCart } from '../context/CartContext'

const PLACEHOLDER_COLORS = {
  starters: 'linear-gradient(135deg, #3D0C0C, #6B1A1A)',
  momos: 'linear-gradient(135deg, #1A1A3D, #2D2B6B)',
  'rice-noodles': 'linear-gradient(135deg, #1A3D1A, #2B6B2B)',
  'main-course': 'linear-gradient(135deg, #3D220C, #6B3B1A)',
  soups: 'linear-gradient(135deg, #3D2A0C, #6B4A1A)',
  beverages: 'linear-gradient(135deg, #0C2E3D, #1A506B)',
}

const PLACEHOLDER_EMOJI = {
  starters: '🔥',
  momos: '🥟',
  'rice-noodles': '🍜',
  'main-course': '🥘',
  soups: '🍲',
  beverages: '🧃',
}

const MAX_QTY = 10

export default function MenuItem({ item }) {
  const { addItem, updateQty, items } = useCart()
  const [qty, setQty] = useState(1)
  const [justAdded, setJustAdded] = useState(false)

  // Check if this item is actually in the cart
  const cartItem = items.find(i => i.id === item.id)
  const isInCart = !!cartItem

  // Track whether the item just left the cart so we can reset the pre-add qty
  const wasInCart = useRef(isInCart)
  useEffect(() => {
    if (wasInCart.current && !isInCart) setQty(1)
    wasInCart.current = isInCart
  }, [isInCart])

  // Once the item is in the cart, the +/- buttons adjust the cart directly,
  // so the displayed quantity always mirrors what's actually in the cart.
  const displayedQty = isInCart ? cartItem.qty : qty

  const handleQtyChange = useCallback((delta) => {
    if (isInCart) {
      updateQty(item.id, delta)
    } else {
      setQty(q => delta === -1 ? Math.max(1, q - 1) : Math.min(10, q + 1))
    }
  }, [isInCart, item.id, updateQty])

  const justAddedTimerRef = useRef(null)

  const handleAdd = useCallback(() => {
    if (isInCart) return
    addItem(item, qty)
    setJustAdded(true)
    clearTimeout(justAddedTimerRef.current)
    justAddedTimerRef.current = setTimeout(() => setJustAdded(false), 1600)
    setQty(1)
  }, [addItem, isInCart, item, qty])

  // Clear the "Added!" timer if this card unmounts (e.g. category change)
  useEffect(() => {
    return () => clearTimeout(justAddedTimerRef.current)
  }, [])

  return (
    <article className="menu-card" id={`menu-item-${item.id}`}>
      {/* Image Container */}
      <div className="menu-card-image">
        {item.image ? (
          <img
            src={item.image}
            alt={item.name}
            loading="lazy"
          />
        ) : (
          <div style={{
            width: '100%',
            height: '100%',
            background: PLACEHOLDER_COLORS[item.category] || 'var(--color-surface-3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '3.5rem',
          }}>
            {PLACEHOLDER_EMOJI[item.category]}
          </div>
        )}

        {/* Badges */}
        <div className="menu-card-badge-container">
          <span className={`badge ${item.isVeg ? 'badge-veg' : 'badge-nonveg'}`}>
            <span style={{ fontSize: '0.6rem' }}>●</span>
            {item.isVeg ? 'Veg' : 'Non-Veg'}
          </span>
          {item.tag && (
            <span className="badge badge-gold" style={{ marginLeft: '6px' }}>
              {item.tag}
            </span>
          )}
        </div>

        {item.rating && (
          <div className="menu-card-popular" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Star size={12} fill="#D4AF37" color="#D4AF37" />
            <span>{item.rating}</span>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="menu-card-body">
        <h3 className="menu-card-name">{item.name}</h3>
        <p className="menu-card-desc">{item.description}</p>

        <div className="menu-card-footer">
          <div className="menu-card-price">
            ₹{item.price}
            <span>{item.portion || 'per serve'}</span>
          </div>

          <div className="menu-card-actions">
            <div className="qty-selector">
              <button
                className="qty-btn"
                onClick={() => handleQtyChange(-1)}
                aria-label={`Decrease ${item.name} quantity`}
              >
                <Minus size={12} />
              </button>
              <span className="qty-value">{displayedQty}</span>
              <button
                className="qty-btn"
                onClick={() => handleQtyChange(+1)}
                aria-label={`Increase ${item.name} quantity`}
                disabled={displayedQty >= MAX_QTY}
                style={displayedQty >= MAX_QTY ? { opacity: 0.35, cursor: 'default' } : undefined}
              >
                +
              </button>
            </div>

            <button
              id={`add-to-cart-${item.id}`}
              className={`add-to-cart-btn ${justAdded ? 'added' : ''}`}
              onClick={handleAdd}
              aria-label={`Add ${item.name} to cart`}
            >
              {justAdded ? (
                <>
                  <Check size={14} />
                  Added!
                </>
              ) : isInCart ? (
                <>
                  <Check size={14} />
                  In Cart ({cartItem.qty})
                </>
              ) : (
                <>
                  <ShoppingCart size={14} />
                  Add
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}
