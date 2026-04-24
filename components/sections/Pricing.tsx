import Link from 'next/link'
import styles from './Pricing.module.css'

export default function Pricing() {
  return (
    <section id="pricing" className={styles.section}>
      <div className={styles.inner}>
        <span className="label">Precio</span>
        <h2 className={`${styles.title} fade-up`}>Sin sorpresas.<br/><em>Un solo plan.</em></h2>
        <p className={`${styles.subtitle} fade-up`}>Todo incluido desde el primer día.</p>

        <div className={`${styles.pricingGrid} fade-up`}>

          <div className={`${styles.pricingCard} ${styles.recommended}`}>
            <div className={styles.pricingBadge}>Más popular</div>
            <p className={styles.pricingName}>Plan Mensual</p>
            <div className={styles.pricingPrice}><sub>$</sub>100.000 <sub style={{fontSize: '0.85rem'}}>COP</sub></div>
            <p className={styles.pricingPeriod}>por mes · por barbería</p>
            <span className={styles.pricingAnchor}>Lo que cobras por 3 cortes al mes</span>
            <ul className={styles.pricingFeatures}>
              <li><span className={styles.check}>✓</span> Luna activa 24/7 en WhatsApp</li>
              <li><span className={styles.check}>✓</span> Citas ilimitadas</li>
              <li><span className={styles.check}>✓</span> Dashboard completo</li>
              <li><span className={styles.check}>✓</span> Tarjeta de lealtad digital</li>
              <li><span className={styles.check}>✓</span> Recordatorios automáticos</li>
              <li><span className={styles.check}>✓</span> Soporte por WhatsApp</li>
              <li><span className={styles.check}>✓</span> 7 días gratis del sistema base, sin tarjeta</li>
            </ul>
            <Link href="/register" className={styles.btnPricing}>Empezar gratis — agenda 7 días</Link>
            <p style={{fontSize: '0.72rem', color: 'var(--muted)', textAlign: 'center', marginTop: '10px'}}>
              En la prueba usas dashboard, agendamiento web y tarjeta de lealtad. Luna se activa al contratar.
            </p>
          </div>

          <div className={styles.pricingCard}>
            <p className={styles.pricingName}>Plan Anual</p>
            <div className={styles.pricingPrice}><sub>$</sub>1.000.000 <sub style={{fontSize: '0.85rem'}}>COP</sub></div>
            <p className={styles.pricingPeriod}>por año · pagas 10, usas 12</p>
            <span className={styles.pricingAnchor}>Equivale a 2 cortes y medio al mes</span>
            <ul className={styles.pricingFeatures}>
              <li><span className={styles.check}>✓</span> Todo lo del plan mensual</li>
              <li><span className={styles.check}>✓</span> 2 meses gratis incluidos</li>
              <li><span className={styles.check}>✓</span> Prioridad en soporte</li>
              <li><span className={styles.check}>✓</span> Acceso a nuevas funciones primero</li>
            </ul>
            <Link href="/register?plan=anual" className={styles.btnPricingGhost}>Pagar anual — ahorra $200.000</Link>
            <p className={styles.pricingSaving}>Ahorras $200.000 al año</p>
          </div>

        </div>
      </div>
    </section>
  )
}
