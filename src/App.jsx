import { CartProvider } from './context/CartContext'
import { LocationProvider } from './context/LocationContext'
import Navbar from './components/Navbar'
import LocationBanner from './components/LocationBanner'
import Hero from './components/Hero'
import About from './components/About'
import Menu from './components/Menu'
import Cart from './components/Cart'
import OrderModal from './components/OrderModal'
import Gallery from './components/Gallery'
import Reviews from './components/Reviews'
import Contact from './components/Contact'

function App() {
  return (
    <LocationProvider>
      <CartProvider>
        {/* Fixed Elements */}
        <Navbar />
        <LocationBanner />
        <Cart />
        <OrderModal />

        {/* Page Sections */}
        <main>
          <Hero />
          <About />
          <Menu />
          <Gallery />
          <Reviews />
          <Contact />
        </main>
      </CartProvider>
    </LocationProvider>
  )
}

export default App
