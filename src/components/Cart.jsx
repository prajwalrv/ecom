import { X, Trash2, ShoppingBag } from 'lucide-react'
import { useCart } from '../context/CartContext'

const MAX_QTY = 10

export default function Cart() {
  const {
    items, isOpen, setIsOpen,
    updateQty, removeItem,
    subtotal, tax, total,
    setIsOrderModalOpen,
    totalItems,
  } = useCart()

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="overlay"
        onClick={() => setIsOpen(false)}
        aria-label="Close cart"
      />

      {/* Sidebar */}
      <aside className="cart-sidebar" role="dialog" aria-label="Shopping cart" aria-modal="true">
        {/* Header */}
        <div className="cart-header">
          <div className="cart-header-title">
            <ShoppingBag size={20} color="var(--color-crimson-light)" />
            <h2 className="cart-title">Your Order</h2>
            {totalItems > 0 && (
              <span className="cart-count-pill">{totalItems} items</span>
            )}
          </div>
          <button
            className="cart-close-btn"
            onClick={() => setIsOpen(false)}
            aria-label="Close cart"
          >
            <X size={18} />
          </button>
        </div>

        {/* Items */}
        {items.length === 0 ? (
          <div className="cart-empty">
            <div className="cart-empty-icon">🛒</div>
            <div className="cart-empty-title">Your cart is empty</div>
            <div className="cart-empty-subtitle">
              Add some delicious items from our menu!
            </div>
          </div>
        ) : (
          <div className="cart-items">
            {items.map(item => (
              <div key={item.id} className="cart-item" id={`cart-item-${item.id}`}>
                {/* Image */}
                <div className="cart-item-image">
                  {item.image ? (
                    <img src={item.image} alt={item.name} />
                  ) : (
                    <div style={{
                      width: '100%', height: '100%',
                      background: 'var(--color-surface-3)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '1.8rem',
                    }}>
                      🍽️
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="cart-item-content">
                  <div className="cart-item-name">{item.name}</div>
                  <div className="cart-item-price">₹{item.price} each</div>
                  <div className="cart-item-controls">
                    <button
                      className="qty-btn"
                      onClick={() => updateQty(item.id, -1)}
                      aria-label={`Decrease ${item.name} quantity`}
                    >−</button>
                    <span className="qty-value">{item.qty}</span>
                    <button
                      className="qty-btn"
                      onClick={() => updateQty(item.id, +1)}
                      aria-label={`Increase ${item.name} quantity`}
                      disabled={item.qty >= MAX_QTY}
                      style={item.qty >= MAX_QTY ? { opacity: 0.35, cursor: 'default' } : undefined}
                    >+</button>
                  </div>
                </div>

                {/* Remove */}
                <button
                  className="cart-item-remove"
                  onClick={() => removeItem(item.id)}
                  aria-label={`Remove ${item.name} from cart`}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        {items.length > 0 && (
          <div className="cart-footer">
            <div className="cart-totals">
              <div className="cart-total-row">
                <span>Subtotal</span>
                <span className="cart-total-value">₹{subtotal}</span>
              </div>
              <div className="cart-total-row">
                <span>GST (5%)</span>
                <span className="cart-total-value">₹{tax}</span>
              </div>
              <div className="cart-total-row grand">
                <span>Total</span>
                <span className="cart-total-value">₹{total}</span>
              </div>
            </div>

            <button
              id="proceed-to-order-btn"
              className="cart-order-btn"
              onClick={() => {
                setIsOpen(false)
                setIsOrderModalOpen(true)
              }}
            >
              🏮 Place Order — ₹{total}
            </button>
          </div>
        )}
      </aside>
    </>
  )
}
