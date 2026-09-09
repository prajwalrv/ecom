import { useRef, useState, useEffect } from 'react'
import { Flame, Star } from 'lucide-react'
import { useCart } from '../context/CartContext'
import video1 from '../../assets/red_chilly_latern_assest/Video-59594.mp4'
import video2 from '../../assets/red_chilly_latern_assest/Video-89530.mp4'
import heroImg from '../../assets/red_chilly_latern_assest/unnamed.jpg'

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])
  return isMobile
}

export default function Hero() {
  const { setIsOpen } = useCart()
  const videoRef = useRef(null)
  const preloaderRef = useRef(null)
  const isMobile = useIsMobile()
  const [preloaderDone, setPreloaderDone] = useState(false)

  useEffect(() => {
    const video = preloaderRef.current
    if (!isMobile || !video) return

    const handleEnd = () => {
      // Keep showing for 4 seconds after video ends
      setTimeout(() => setPreloaderDone(true), 4000)
    }
    video.addEventListener('ended', handleEnd)
    // Fallback: if video can't play, dismiss after 7s
    const fallback = setTimeout(() => setPreloaderDone(true), 7000)
    return () => {
      video.removeEventListener('ended', handleEnd)
      clearTimeout(fallback)
    }
  }, [isMobile])

  const scrollToMenu = () => {
    document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="hero" className="hero">
      {/* Mobile Preloader — fullscreen video that fades out */}
      {isMobile && (
        <div className={`hero-preloader ${preloaderDone ? 'hero-preloader--hidden' : ''}`}>
          <video
            ref={preloaderRef}
            autoPlay
            muted
            playsInline
            className="hero-preloader-video"
            poster={heroImg}
          >
            <source src={video1} type="video/mp4" />
            <source src={video2} type="video/mp4" />
          </video>
        </div>
      )}

      {/* Video Background — desktop only */}
      {!isMobile && (
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
      )}

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
