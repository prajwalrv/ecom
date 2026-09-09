import { Images } from 'lucide-react'
import img1 from '../../assets/red_chilly_latern_assest/unnamed.jpg'
import img2 from '../../assets/red_chilly_latern_assest/unnamed (1).jpg'
import img3 from '../../assets/red_chilly_latern_assest/unnamed (2).jpg'
import img4 from '../../assets/red_chilly_latern_assest/unnamed (3).jpg'
import img5 from '../../assets/red_chilly_latern_assest/unnamed (4).jpg'
import img6 from '../../assets/red_chilly_latern_assest/unnamed (5).jpg'
import img7 from '../../assets/red_chilly_latern_assest/unnamed.png'

const galleryItems = [
  { src: img1, alt: 'Drums of Heaven — Crispy glazed chicken' },
  { src: img7, alt: 'Red Chilli Lantern restaurant exterior — Kalyan Nagar' },
  { src: img2, alt: 'Fried Momos with chilli dip' },
  { src: img4, alt: 'Chilli Paneer — stir-fried with peppers' },
  { src: img3, alt: 'Honey Chilli Chicken' },
  { src: img5, alt: 'Pan-fried Momos' },
  { src: img6, alt: 'Manchow Soup' },
]

export default function Gallery() {
  return (
    <section id="gallery" className="gallery-section">
      <div className="container">
        <div className="badge badge-gold" style={{ display: 'flex', width: 'fit-content', margin: '0 auto 16px' }}>
          <Images size={12} />
          Gallery
        </div>
        <h2 className="section-title">
          A Feast for <span>the Eyes</span>
        </h2>
        <div className="gold-divider" />
        <p className="section-subtitle">
          Every dish is a work of art. Explore the vibrant colours and bold
          textures of our Indo-Chinese creations.
        </p>

        <div className="gallery-grid">
          {galleryItems.map((item, i) => (
            <div
              key={i}
              className={`gallery-item gallery-item-${i + 1}`}
              id={`gallery-item-${i + 1}`}
            >
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
              />
              <div className="gallery-icon-overlay" aria-hidden="true">🔍</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
