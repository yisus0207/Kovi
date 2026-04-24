import Link from 'next/link'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <div>
            <div className={styles.brand}>barberia<span className={styles.dot}>.lat</span></div>
            <p className={styles.tagline}>Recepcionista IA para barberías en LATAM</p>
          </div>
          <nav className={styles.links}>
            <Link href="#como-funciona">Cómo funciona</Link>
            <Link href="#pricing">Pricing</Link>
            <Link href="https://www.barberia.lat/book/optus-barber" target="_blank" rel="noopener">Demo</Link>
            <Link href="mailto:hola@barberia.lat">Contacto</Link>
          </nav>
        </div>
        <div className={styles.bottom}>
          &copy; 2026 barberia.lat — Recepcionista IA para barberías en LATAM
        </div>
      </div>
    </footer>
  )
}
