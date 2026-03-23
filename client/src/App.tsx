import Navbar from './components/Navbar'
import Hero from './components/Hero/Hero'
import GradientDivider from './components/GradientDivider'
import HowItWorks from './components/HowItWorks'
import UseCases from './components/UseCases/UseCases'
import Principles from './components/Principles'
import WhyKaizuna from './components/WhyKaizuna/WhyKaizuna'
import FutureVision from './components/FutureVision'
import WaitlistCTA from './components/WaitlistCTA'
import ContactForm from './components/ContactForm'
import BlogSection from './components/BlogSection'
import Footer from './components/Footer'
import Toast from './components/Toast'
import ProductsPage from './components/ProductsPage/ProductsPage'

function HomePage() {
  return (
    <>
      <Hero />
      <GradientDivider />
      <HowItWorks />
      <GradientDivider />
      <UseCases />
      <GradientDivider />
      <Principles />
      <GradientDivider />
      <WhyKaizuna />
      <GradientDivider />
      <FutureVision />
      <GradientDivider />
      <WaitlistCTA />
      <GradientDivider />
      <ContactForm />
      <BlogSection />
    </>
  )
}

function App() {
  const isProductsPage = window.location.pathname === '/products'

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Navbar isProductsPage={isProductsPage} />
      <main id="main-content">
        {isProductsPage ? <ProductsPage /> : <HomePage />}
      </main>
      <Footer isProductsPage={isProductsPage} />
      <Toast />
    </>
  )
}

export default App
