import { Star, Quote } from 'lucide-react'

const reviews = [
  {
    id: 1,
    name: 'Priya Raghunath',
    initial: 'P',
    date: '2 months ago',
    rating: 5,
    text: 'Absolutely loved the food here! The Drums of Heaven are incredibly crispy and the sauce is perfectly balanced — not too sweet, not too spicy. Will definitely be ordering again!',
  },
  {
    id: 2,
    name: 'Karthik Menon',
    initial: 'K',
    date: '3 months ago',
    rating: 5,
    text: 'Exceptional momos! Pan-fried to perfection with a golden crust and juicy filling. The chilli dip pairs wonderfully. This is easily the best Asian food in Kalyan Nagar.',
  },
  {
    id: 3,
    name: 'Ananya Sharma',
    initial: 'A',
    date: '1 month ago',
    rating: 5,
    text: 'The Manchow Soup on a rainy evening is pure comfort food heaven. Thick, flavourful, with crispy noodles on top. The place has a warm and cosy vibe — highly recommend!',
  },
  {
    id: 4,
    name: 'Rohan Patel',
    initial: 'R',
    date: '3 weeks ago',
    rating: 5,
    text: 'Ordered Honey Chilli Chicken and Hakka Noodles for a family dinner. Both were outstanding — restaurant-quality taste at very reasonable prices. Amazing value!',
  },
  {
    id: 5,
    name: 'Meghana K',
    initial: 'M',
    date: '5 months ago',
    rating: 5,
    text: `First time visiting and I'm already a regular. The Chilli Paneer is absolutely phenomenal — crispy outside, soft inside, with a sauce that's full of depth. Love this place!`,
  },
  {
    id: 6,
    name: 'Suresh Venkataraman',
    initial: 'S',
    date: '6 months ago',
    rating: 5,
    text: `Great ambiance, friendly staff, and food that genuinely wows you. The Singapore Noodles were perfectly cooked and packed with flavour. A gem in Bengaluru's food scene.`,
  },
]

export default function Reviews() {
  return (
    <section id="reviews" className="reviews-section">
      <div className="container">
        <div className="badge badge-gold" style={{ display: 'flex', width: 'fit-content', margin: '0 auto 16px' }}>
          <Star size={12} fill="currentColor" />
          Reviews
        </div>
        <h2 className="section-title">
          What Our <span>Guests Say</span>
        </h2>
        <div className="gold-divider" />
        <p className="section-subtitle">
          Over 40 five-star reviews and counting — here's what people are
          saying about the Red Chilli Lantern experience.
        </p>

        {/* Overall Rating Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '24px',
          marginBottom: '60px',
          flexWrap: 'wrap',
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '4rem',
              fontWeight: 900,
              color: 'var(--color-gold)',
              lineHeight: 1,
            }}>5.0</div>
            <div style={{ color: 'var(--color-gold)', fontSize: '1.4rem', margin: '4px 0' }}>★★★★★</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--color-text-dim)', letterSpacing: '0.1em' }}>
              40+ Google Reviews
            </div>
          </div>
          <div style={{ width: '1px', height: '80px', background: 'var(--color-border)' }} className="responsive-hide-mobile" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {[5, 4, 3, 2, 1].map(n => (
              <div key={n} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', width: '8px' }}>{n}</span>
                <span style={{ color: 'var(--color-gold)', fontSize: '0.75rem' }}>★</span>
                <div style={{
                  width: '140px', height: '6px',
                  background: 'var(--color-surface-2)',
                  borderRadius: 'var(--radius-full)',
                  overflow: 'hidden',
                }}>
                  <div style={{
                    width: n === 5 ? '98%' : '2%',
                    height: '100%',
                    background: n === 5 ? 'var(--color-gold)' : 'var(--color-border)',
                    borderRadius: 'var(--radius-full)',
                  }} />
                </div>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-text-dim)' }}>
                  {n === 5 ? '40+' : '0'}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="reviews-grid">
          {reviews.map(review => (
            <div key={review.id} className="review-card" id={`review-${review.id}`}>
              {/* Stars */}
              <div className="review-stars">
                {[...Array(review.rating)].map((_, i) => (
                  <span key={i} className="review-star">★</span>
                ))}
              </div>

              <p className="review-text">"{review.text}"</p>

              <div className="review-author">
                <div className="review-avatar">{review.initial}</div>
                <div className="review-author-info">
                  <span className="review-author-name">{review.name}</span>
                  <span className="review-author-date">
                    ✓ Verified Google Review · {review.date}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
