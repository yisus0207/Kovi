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
            <div className={styles.pricingPrice}><sub>$</sub>90.000 <sub style={{fontSize: '0.85rem'}}>COP</sub></div>
            <p className={styles.pricingPeriod}>por mes · por sede</p>
            <span className={styles.pricingAnchor}>Recupera tu inversión con un solo cliente adicional</span>
            <ul className={styles.pricingFeatures}>
              <li><span className={styles.check}>✓</span> Aura activa 24/7 en WhatsApp</li>
              <li><span className={styles.check}>✓</span> Gestión ilimitada</li>
              <li><span className={styles.check}>✓</span> Dashboard completo</li>
              <li><span className={styles.check}>✓</span> Sistema de fidelización</li>
              <li><span className={styles.check}>✓</span> Recordatorios automáticos</li>
              <li><span className={styles.check}>✓</span> Soporte prioritario</li>
              <li><span className={styles.check}>✓</span> 7 días gratis del sistema, sin tarjeta</li>
            </ul>
            <Link href="/register" className={styles.btnPricing}>Empezar gratis — agenda 7 días</Link>
            <p style={{fontSize: '0.72rem', color: 'var(--muted)', textAlign: 'center', marginTop: '10px'}}>
              En la prueba usas el dashboard y sistema de gestión. Aura se activa al contratar el plan.
            </p>
          </div>

          <div className={styles.pricingCard}>
            <p className={styles.pricingName}>Plan Anual</p>
            <div className={styles.pricingPrice}><sub>$</sub>999.999 <sub style={{fontSize: '0.85rem'}}>COP</sub></div>
            <p className={styles.pricingPeriod}>por año · pagas 10, usas 12</p>
            <span className={styles.pricingAnchor}>La opción más rentable para tu negocio</span>
            <ul className={styles.pricingFeatures}>
              <li><span className={styles.check}>✓</span> Todo lo del plan mensual</li>
              <li><span className={styles.check}>✓</span> 2 meses gratis incluidos</li>
              <li><span className={styles.check}>✓</span> Prioridad máxima en soporte</li>
              <li><span className={styles.check}>✓</span> Acceso a nuevas funciones primero</li>
            </ul>
            <Link href="/register?plan=anual" className={styles.btnPricingGhost}>Pagar anual — ahorra más de $80.000</Link>
            <p className={styles.pricingSaving}>Ahorras más de $80.000 al año</p>
          </div>

        </div>
      </div>
    </section>
  )
}
