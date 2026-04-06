import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero/Hero'
import UseCases from './components/UseCases/UseCases'
import WhyKaizuna from './components/WhyKaizuna/WhyKaizuna'
import WaitlistCTA from './components/WaitlistCTA'
import ContactForm from './components/ContactForm'
import Footer from './components/Footer'
import Toast from './components/Toast'
import ProductsPage from './components/ProductsPage/ProductsPage'
import { productDetails } from './data/ecosystem'

function getProductIdFromPath(pathname: string) {
  const match = pathname.match(/^\/product\/([a-z0-9-]+)$/)
  if (!match) return null

  const productId = match[1]
  const isValid = productDetails.some((product) => product.id === productId)
  return isValid ? productId : null
}

type ThemeMode = 'light' | 'dark'

function getInitialTheme(): ThemeMode {
  const currentTheme = document.documentElement.dataset.theme
  if (currentTheme === 'dark') return 'dark'

  try {
    const saved = localStorage.getItem('kaizuna-theme')
    if (saved === 'dark' || saved === 'light') return saved
  } catch {
    // ignore storage access errors and fall back to light
  }

  return 'light'
}

function HomePage() {
  return (
    <>
      <Hero />
      <WhyKaizuna />
      <UseCases />
      <WaitlistCTA />
      <ContactForm />
    </>
  )
}

function App() {
  const { pathname } = window.location
  const productId = getProductIdFromPath(pathname)
  const isProductPage = Boolean(productId)
  const [theme, setTheme] = useState<ThemeMode>(getInitialTheme)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try {
      localStorage.setItem('kaizuna-theme', theme)
    } catch {
      // no-op for private browsing or restricted storage
    }
  }, [theme])

  useEffect(() => {
    function scrollToHashTarget() {
      const hash = window.location.hash
      if (!hash || hash.length <= 1) return

      const targetId = decodeURIComponent(hash.slice(1))
      let attempts = 0
      const maxAttempts = 20

      const tryScroll = () => {
        const target = document.getElementById(targetId)
        if (target) {
          const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
          target.scrollIntoView({
            behavior: reduceMotion ? 'auto' : 'smooth',
            block: 'start',
          })
          return
        }

        attempts += 1
        if (attempts < maxAttempts) {
          window.setTimeout(tryScroll, 80)
        }
      }

      window.requestAnimationFrame(tryScroll)
    }

    scrollToHashTarget()
    window.addEventListener('hashchange', scrollToHashTarget)
    window.addEventListener('popstate', scrollToHashTarget)

    return () => {
      window.removeEventListener('hashchange', scrollToHashTarget)
      window.removeEventListener('popstate', scrollToHashTarget)
    }
  }, [])

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Navbar
        isProductPage={isProductPage}
      />
      <main id="main-content">
        {isProductPage ? <ProductsPage productId={productId} /> : <HomePage />}
      </main>
      <Footer isProductPage={isProductPage} />
      <Toast />
    </>
  )
}

export default App
