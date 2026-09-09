import { MapPin, Phone, Clock, Instagram, Facebook, ExternalLink } from 'lucide-react'
import { useCart } from '../context/CartContext'

export default function Contact() {
  const { setIsOpen } = useCart()

  return (
    <>
      <section id="contact" className="contact-section">
        <div className="container">
          <div className="badge badge-red" style={{ display: 'flex', width: 'fit-content', margin: '0 auto 16px' }}>
            <MapPin size={12} />
            Find Us
          </div>
          <h2 className="section-title">
            Visit <span>Red Chilli Lantern</span>
          </h2>
          <div className="gold-divider" />
          <p className="section-subtitle">
            Located in the heart of Kalyan Nagar, Bengaluru.
            Walk in or order online — we're always open.
          </p>

          <div className="contact-grid">
            {/* Contact Info */}
            <div className="contact-info">
              <h3 className="contact-title">
                Come for the Food, <span>Stay for the Vibe</span>
              </h3>

              <div className="contact-item">
                <div className="contact-item-icon">
                  <MapPin size={20} />
                </div>
                <div className="contact-item-content">
                  <span className="contact-item-label">Address</span>
                  <span className="contact-item-value">
                    435, 2nd Cross Rd, HRBR Layout<br />
                    Kalyan Nagar, Bengaluru — 560043<br />
                    Karnataka, India
                  </span>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-item-icon">
                  <Phone size={20} />
                </div>
                <div className="contact-item-content">
                  <span className="contact-item-label">Phone</span>
                  <span className="contact-item-value">
                    <a href="tel:+919330269986" id="contact-phone-link">
                      +91 93302 69986
                    </a>
                  </span>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-item-icon">
                  <Clock size={20} />
                </div>
                <div className="contact-item-content">
                  <span className="contact-item-label">Hours</span>
                  <span className="contact-item-value">
                    Open 24 Hours — 7 Days a Week 🕐
                  </span>
                </div>
              </div>

              {/* Social Links */}
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <a
                  href="https://www.instagram.com/redchillilanternbnglr/"
                  id="instagram-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                  style={{ padding: '10px 20px', fontSize: '0.8rem' }}
                >
                  <Instagram size={16} />
                  Instagram
                </a>
                <a
                  href="https://www.google.com/maps/place/Red+Chilli+Lantern/@13.0262593,77.6334177,17z/"
                  id="google-maps-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                  style={{ padding: '10px 20px', fontSize: '0.8rem' }}
                >
                  <ExternalLink size={16} />
                  Google Maps
                </a>
              </div>

              {/* CTA */}
              <button
                id="contact-order-btn"
                className="btn-primary"
                style={{ width: 'fit-content' }}
                onClick={() => setIsOpen(true)}
              >
                🏮 Order Online Now
              </button>
            </div>

            {/* Map */}
            <div className="map-container">
              <iframe
                title="Red Chilli Lantern location on Google Maps"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.3!2d77.6334!3d13.0262!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae17b2cad4a5e7%3A0x2a1dd2d8e5b8f4c2!2sRed%20Chilli%20Lantern!5e0!3m2!1sen!2sin!4v1"
                width="100%"
                height="100%"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container footer-inner">
          <div className="footer-logo">
            🏮 Red Chilli <span>Lantern</span>
          </div>

          <div className="footer-links">
            {['Home', 'About', 'Menu', 'Gallery', 'Reviews', 'Contact'].map(link => (
              <button
                key={link}
                className="footer-link"
                onClick={() => document.getElementById(link.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })}
              >
                {link}
              </button>
            ))}
          </div>

          <p className="footer-copy">
            © {new Date().getFullYear()} Red Chilli Lantern — Chinese | Asian Cuisine, Bengaluru.{' '}
            Made with <span>♥</span> for bold flavours.
          </p>
        </div>
      </footer>
    </>
  )
}
