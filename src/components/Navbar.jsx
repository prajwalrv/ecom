import { useState, useEffect } from 'react'
import { ShoppingCart, Menu, X, Flame } from 'lucide-react'
import { useCart } from '../context/CartContext'

export default function Navbar() {
  const { totalItems, setIsOpen } = useCart()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMobileOpen(false)
  }

  const links = [
    { label: 'Home', id: 'hero' },
    { label: 'About', id: 'about' },
    { label: 'Menu', id: 'menu' },
    { label: 'Gallery', id: 'gallery' },
    { label: 'Reviews', id: 'reviews' },
    { label: 'Contact', id: 'contact' },
  ]

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="container navbar-inner">
          {/* Logo */}
          <a href="#hero" className="navbar-logo" onClick={(e) => { e.preventDefault(); scrollTo('hero') }}>
            <div className="navbar-logo-icon">🏮</div>
            <div className="navbar-logo-text">
              <span className="navbar-logo-name">Red Chilli Lantern</span>
              <span className="navbar-logo-tagline">Chinese · Asian Cuisine</span>
            </div>
          </a>

          {/* Desktop Links */}
          <div className="navbar-links">
            {links.map(link => (
              <button
                key={link.id}
                className="navbar-link"
                onClick={() => scrollTo(link.id)}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Actions */}
          <div className="navbar-actions">
            <button
              id="cart-open-btn"
              className="cart-btn"
              onClick={() => setIsOpen(true)}
              aria-label="Open cart"
            >
              <ShoppingCart size={16} />
              Cart
              {totalItems > 0 && (
                <span className="cart-badge">{totalItems}</span>
              )}
            </button>

            {/* Mobile menu toggle */}
            <button
              className="mobile-menu-btn"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              <span style={{ transform: mobileOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none', transition: '0.3s' }} />
              <span style={{ opacity: mobileOpen ? 0 : 1, transition: '0.3s' }} />
              <span style={{ transform: mobileOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none', transition: '0.3s' }} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="mobile-nav">
          {links.map(link => (
            <button
              key={link.id}
              className="mobile-nav-link"
              onClick={() => scrollTo(link.id)}
            >
              {link.label}
              <span style={{ color: 'var(--color-crimson)' }}>→</span>
            </button>
          ))}
          <button
            className="btn-primary"
            style={{ width: '100%', justifyContent: 'center' }}
            onClick={() => { scrollTo('menu'); setMobileOpen(false) }}
          >
            <Flame size={16} />
            Order Now
          </button>
        </div>
      )}
    </>
  )
}
