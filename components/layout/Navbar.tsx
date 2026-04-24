"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import styles from './Navbar.module.css'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
        <div className={styles.navInner}>
          <Link href="#" className={styles.navLogo}>
            <span className={styles.navLogoText}>KOVI<span className={styles.dot}>.ai</span></span>
          </Link>

          <div className={styles.navRight}>
            <ul className={styles.navLinks}>
              <li><Link href="#como-funciona">Cómo funciona</Link></li>
              <li><Link href="#pricing">Precios</Link></li>
              <li><Link href="#faq">FAQ</Link></li>
              <li><Link href="/register" className={styles.btnNav}>Probar gratis</Link></li>
            </ul>
            
            <Link href="/register" className={styles.btnNavMobile}>Probar gratis</Link>
            
            <button 
              className={`${styles.hamburger} ${isOpen ? styles.hamburgerOpen : ''}`} 
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Menú"
            >
              <span></span><span></span><span></span>
            </button>
          </div>
        </div>
      </nav>

      <div className={`${styles.drawer} ${isOpen ? styles.drawerOpen : ''}`}>
        <ul>
          <li><Link href="#como-funciona" onClick={() => setIsOpen(false)}>Cómo funciona</Link></li>
          <li><Link href="#pricing" onClick={() => setIsOpen(false)}>Precios</Link></li>
          <li><Link href="#faq" onClick={() => setIsOpen(false)}>FAQ</Link></li>
        </ul>
        <div className={styles.drawerCta}>
          <Link href="/register" onClick={() => setIsOpen(false)}>Probar gratis — 7 días sin costo</Link>
        </div>
      </div>
    </>
  )
}
