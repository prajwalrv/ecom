import { useRef } from 'react'
import { Flame, Star } from 'lucide-react'
import { useCart } from '../context/CartContext'
import video1 from '../../assets/red_chilly_latern_assest/Video-59594.mp4'
import video2 from '../../assets/red_chilly_latern_assest/Video-89530.mp4'
import heroImg from '../../assets/red_chilly_latern_assest/unnamed.jpg'

export default function Hero() {
  const { setIsOpen } = useCart()
  const videoRef = useRef(null)

  const scrollToMenu = () => {
    document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="hero" className="hero">
      {/* Video Background */}
      <div className="hero-video-bg">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          poster={heroImg}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        >
          <source src={video1} type="video/mp4" />
          <source src={video2} type="video/mp4" />
          <img src={heroImg} alt="Red Chilli Lantern" className="hero-fallback-img" />
        </video>
      </div>

      {/* Overlays & Glows */}
      <div className="hero-overlay" />
      <div className="hero-glow-left" />
      <div className="hero-glow-right" />

      {/* Lantern Decorations */}
      <div className="lantern-decoration lantern-left" role="presentation">🏮</div>
      <div className="lantern-decoration lantern-right" role="presentation">🏮</div>

      {/* Hero Content */}
      <div className="hero-content">
        <div className="hero-eyebrow">
          <Star size={12} fill="currentColor" />
          Chinese &nbsp;·&nbsp; Asian Cuisine &nbsp;·&nbsp; Bengaluru
          <Star size={12} fill="currentColor" />
        </div>

        <h1 className="hero-title">
          <span className="hero-title-accent">Bold</span>
          Flavours.
          <span className="hero-title-sub">Big Cravings.</span>
        </h1>

        <p className="hero-description">
          Authentic Indo-Chinese & Asian dishes made with bold spices, fresh
          ingredients, and a passion for flavour that keeps you coming back.
        </p>

        <div className="hero-actions">
          <button
            id="hero-order-btn"
            className="btn-primary"
            onClick={scrollToMenu}
            style={{ fontSize: '0.9rem', padding: '16px 40px' }}
          >
            <Flame size={18} />
            Order Now
          </button>
          <button
            id="hero-view-cart-btn"
            className="btn-secondary"
            onClick={() => setIsOpen(true)}
            style={{ fontSize: '0.9rem', padding: '16px 40px' }}
          >
            View Cart
          </button>
        </div>

        <div className="hero-stats">
          <div className="hero-stat-item">
            <div className="hero-stat-value">⭐ 5.0</div>
            <div className="hero-stat-label">Google Rating</div>
          </div>
          <div className="hero-stat-item">
            <div className="hero-stat-value">40+</div>
            <div className="hero-stat-label">Reviews</div>
          </div>
          <div className="hero-stat-item">
            <div className="hero-stat-value">24/7</div>
            <div className="hero-stat-label">Open Always</div>
          </div>
          <div className="hero-stat-item">
            <div className="hero-stat-value">₹200</div>
            <div className="hero-stat-label">Starts From</div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="hero-scroll-indicator" aria-hidden="true">
        <div className="hero-scroll-line" />
        <div className="hero-scroll-dot" />
      </div>
    </section>
  )
}
