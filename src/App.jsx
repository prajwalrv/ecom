import { CartProvider } from './context/CartContext'
import Navbar from './components/Navbar'
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
    <CartProvider>
      {/* Fixed Elements */}
      <Navbar />
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
  )
}

export default App
