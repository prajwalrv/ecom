import { Clock, MapPin, Phone, Award, Heart, Users } from 'lucide-react'
import restaurantImg from '../../assets/red_chilly_latern_assest/unnamed.png'

export default function About() {
  return (
    <section id="about" className="about bg-ink section-padding">
      <div className="container">
        <div className="about-grid">
          {/* Image Column */}
          <div className="about-image-wrapper">
            <div className="about-image-frame" />
            <div className="about-image-main">
              <img
                src={restaurantImg}
                alt="Red Chilli Lantern restaurant exterior — Kalyan Nagar, Bengaluru"
                loading="lazy"
              />
            </div>
            <div className="about-rating-badge">
              <div className="about-rating-value">5.0</div>
              <div className="about-rating-stars">★★★★★</div>
              <div className="about-rating-label">Google</div>
            </div>
          </div>

          {/* Content Column */}
          <div className="about-content">
            <div className="about-eyebrow">Our Story</div>

            <h2 className="about-title">
              Where Every Dish Tells a <span>Story of Flavour</span>
            </h2>

            <p className="about-text">
              Nestled in the heart of Kalyan Nagar, Red Chilli Lantern brings you
              the authentic tastes of Chinese and Asian cuisine — crafted with bold
              spices, fresh ingredients, and an unwavering passion for flavour.
            </p>

            <p className="about-text">
              From our signature Drums of Heaven and sizzling Momos to comforting
              Manchow Soups and wok-tossed Hakka Noodles, every bite is an
              experience worth savouring.
            </p>

            <div className="about-features">
              <div className="about-feature">
                <div className="about-feature-icon"><Heart size={16} /></div>
                Women-owned Business
              </div>
              <div className="about-feature">
                <div className="about-feature-icon"><Users size={16} /></div>
                Family Friendly
              </div>
              <div className="about-feature">
                <div className="about-feature-icon"><Award size={16} /></div>
                LGBTQ+ Welcoming
              </div>
              <div className="about-feature">
                <div className="about-feature-icon"><Clock size={16} /></div>
                Open 24 Hours
              </div>
            </div>

            <div className="about-info-bar">
              <div className="about-info-item">
                <span className="about-info-label">Location</span>
                <span className="about-info-value">HRBR Layout, Bengaluru</span>
              </div>
              <div className="about-info-divider" />
              <div className="about-info-item">
                <span className="about-info-label">Hours</span>
                <span className="about-info-value">Open 24 / 7</span>
              </div>
              <div className="about-info-divider" />
              <div className="about-info-item">
                <span className="about-info-label">Price</span>
                <span className="about-info-value">₹200 – ₹400</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
