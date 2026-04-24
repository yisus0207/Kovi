import Link from 'next/link'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <div>
            <div className={styles.brand}>KOVI<span className={styles.dot}>.ai</span></div>
            <p className={styles.tagline}>Asistente de IA para negocios en LATAM</p>
          </div>
          <nav className={styles.links}>
            <Link href="#como-funciona">Cómo funciona</Link>
            <Link href="#pricing">Precio</Link>
            <Link href="#hero">Demo</Link>
            <Link href="mailto:hola@kovi.ai">Contacto</Link>
          </nav>
        </div>
        <div className={styles.bottom}>
          &copy; 2026 KOVI.ai — Asistente de IA para negocios en LATAM
        </div>
      </div>
    </footer>
  )
}
