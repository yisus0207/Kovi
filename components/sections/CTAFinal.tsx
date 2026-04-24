import Link from 'next/link'
import styles from './CTAFinal.module.css'

export default function CTAFinal() {
  return (
    <section id="cta-final" className={styles.section}>
      <div className={`${styles.inner} fade-up`}>
        <h2 className={styles.h2}>Tu barbería,<br/>siempre atendida.</h2>
        <p className={styles.sub}>Prueba gratis la agenda, la tarjeta de lealtad y el dashboard 7 días. Luna se activa al contratar.</p>
        <Link href="/register" className={styles.btnHero}>Crear cuenta gratis</Link>
        <p className={styles.trust}>
          Sin tarjeta de crédito
          <span>·</span>
          Setup en 30 minutos
          <span>·</span>
          Cancela cuando quieras
        </p>
      </div>
    </section>
  )
}
