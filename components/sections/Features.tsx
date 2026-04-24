import Link from 'next/link'
import styles from './Features.module.css'

export default function Features() {
  const feats = [
    { icon: '💬', title: 'Atiende en WhatsApp', desc: 'Responde al instante, en el tono de tu propio negocio.' },
    { icon: '📅', title: 'Agenda citas sola', desc: 'Ve disponibilidad en tiempo real y confirma turnos automáticamente.' },
    { icon: '🔔', title: 'Recordatorios automáticos', desc: 'Reduce las inasistencias con avisos antes de la cita.' },
    { icon: '💰', title: 'Informa precios y servicios', desc: 'Tu catálogo de servicios siempre actualizado para cada cliente.' },
    { icon: '🔄', title: 'Fidelización activa', desc: 'Recuerda a clientes inactivos e invita a volver.' },
    { icon: '📊', title: 'Métricas en tu panel', desc: 'Citas, ingresos y clientes, siempre actualizados.' }
  ]

  return (
    <section id="features" className={styles.section}>
      <div className={styles.inner}>
        <span className="label">Qué puede hacer Aura</span>
        <h2 className="h2 fade-up">Una asistente virtual<br/><em>que no descansa</em></h2>

        <div className={styles.featGrid}>
          {feats.map((f, i) => (
            <div key={i} className={`${styles.feat} fade-up`}>
              <div className={styles.featIcon}>{f.icon}</div>
              <p className={styles.featTitle}>{f.title}</p>
              <p className={styles.featDesc}>{f.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA after features */}
        <div className="fade-up" style={{textAlign: 'center', marginTop: '48px'}}>
          <Link href="/register" className={styles.btnHero}>Probar gratis — 7 días sin costo</Link>
          <p style={{fontSize: '0.8rem', color: 'var(--muted)', marginTop: '10px'}}>
            Sin tarjeta · Aura se activa al contratar · Cancela cuando quieras
          </p>
        </div>
      </div>
    </section>
  )
}
