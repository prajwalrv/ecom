import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { menuItems } from '../data/menuData'

const CartContext = createContext(null)
const STORAGE_KEY = 'rcl-cart'

const MAX_QTY = 10

function loadCart() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (!saved) return []

    const parsed = JSON.parse(saved)
    if (!Array.isArray(parsed)) return []

    // Map saved ids to the current menu so the restored cart always uses
    // fresh names/prices and drops items that are no longer on the menu.
    const menuById = new Map(menuItems.map(item => [item.id, item]))

    return parsed
      .filter(item =>
        item &&
        typeof item.id === 'number' &&
        Number.isInteger(item.qty) &&
        item.qty >= 1
      )
      .filter(item => menuById.has(item.id))
      .map(item => ({
        ...menuById.get(item.id),
        qty: Math.min(MAX_QTY, item.qty),
      }))
  } catch {
    return []
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(loadCart)
  const [isOpen, setIsOpen] = useState(false)
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false)

  const addItem = useCallback((item, qty = 1) => {
    setItems(prev => {
      const existing = prev.find(i => i.id === item.id)
      if (existing) {
        const newQty = Math.min(MAX_QTY, existing.qty + qty)
        return prev.map(i =>
          i.id === item.id ? { ...i, ...item, qty: newQty } : i
        )
      }
      return [...prev, { ...item, qty: Math.min(MAX_QTY, qty) }]
    })
  }, [])

  const removeItem = useCallback((id) => {
    setItems(prev => prev.filter(i => i.id !== id))
  }, [])

  const updateQty = useCallback((id, delta) => {
    setItems(prev => {
      return prev
        .map(i => i.id === id ? { ...i, qty: Math.min(MAX_QTY, i.qty + delta) } : i)
        .filter(i => i.qty > 0)
    })
  }, [])

  const clearCart = useCallback(() => {
    setItems([])
  }, [])

  // Save to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  const totalItems = items.reduce((sum, i) => sum + i.qty, 0)
  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0)
  const tax = Math.round(subtotal * 0.05)
  const total = subtotal + tax

  return (
    <CartContext.Provider value={{
      items,
      isOpen, setIsOpen,
      isOrderModalOpen, setIsOrderModalOpen,
      addItem,
      removeItem,
      updateQty,
      clearCart,
      totalItems,
      subtotal,
      tax,
      total,
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
