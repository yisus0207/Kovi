import Link from 'next/link'
import styles from './CTAFinal.module.css'

export default function CTAFinal() {
  return (
    <section id="cta-final" className={styles.section}>
      <div className={`${styles.inner} fade-up`}>
        <h2 className={styles.h2}>Tu negocio,<br/>siempre atendido.</h2>
        <p className={styles.sub}>Prueba gratis el sistema de gestión y el dashboard por 7 días. Aura se activa al contratar el plan.</p>
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
