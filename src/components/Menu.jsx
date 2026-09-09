import { useState } from 'react'
import { Flame } from 'lucide-react'
import { menuCategories, menuItems } from '../data/menuData'
import MenuItem from './MenuItem'

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState('starters')

  const filtered = menuItems.filter(item => item.category === activeCategory)

  return (
    <section id="menu" className="menu-section">
      <div className="container">
        {/* Section Header */}
        <div className="badge badge-red" style={{ display: 'flex', width: 'fit-content', margin: '0 auto 16px' }}>
          <Flame size={12} />
          Our Menu
        </div>
        <h2 className="section-title">
          Crafted With <span>Passion</span>
        </h2>
        <div className="gold-divider" />
        <p className="section-subtitle">
          Every dish is prepared fresh using authentic recipes, bold spices, and
          premium ingredients — bringing the true taste of Asia to your table.
        </p>

        {/* Category Tabs */}
        <div className="menu-tabs" role="tablist" aria-label="Menu categories">
          {menuCategories.map(cat => (
            <button
              key={cat.id}
              id={`tab-${cat.id}`}
              role="tab"
              aria-selected={activeCategory === cat.id}
              className={`menu-tab ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              <span>{cat.emoji}</span>
              {cat.label}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <div
          className="menu-grid"
          role="tabpanel"
          aria-label={`${activeCategory} menu items`}
        >
          {filtered.map(item => (
            <MenuItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}
