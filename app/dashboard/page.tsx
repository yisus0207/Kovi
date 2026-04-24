"use client"

import styles from './dashboard.module.css'

const Icons = {
  Calendar: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>,
  Wallet: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/></svg>,
  Trending: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>,
  Check: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
}

export default function DashboardPage() {
  const stats = [
    { title: 'Citas Hoy', value: '12', icon: <Icons.Calendar />, color: '#eab308' },
    { title: 'Ingresos del día', value: '$1,250', icon: <Icons.Wallet />, color: '#22c55e' },
    { title: 'Citas esta semana', value: '48', icon: <Icons.Trending />, color: '#3b82f6' },
    { title: 'Confirmadas hoy', value: '8', icon: <Icons.Check />, color: '#22c55e' },
  ]

  return (
    <div className={styles.dashboardContainer}>
      <header className={styles.mainHeader}>
        <div className={styles.headerTitle}>
          <h2>Hola, Diamont</h2>
          <span>Viernes, 24 de Abril de 2026</span>
        </div>
        <div className={styles.headerActions}>
          <div className={styles.statusPill}>
            <span className={styles.dot}></span> Aura Online
          </div>
        </div>
      </header>

      <main className={styles.statsGrid}>
        {stats.map((stat, i) => (
          <div key={i} className={styles.statCard}>
            <h4>{stat.title}</h4>
            <strong>{stat.value}</strong>
            <div className={styles.statCardIcon} style={{ color: stat.color }}>{stat.icon}</div>
          </div>
        ))}

        {/* Action Suggestion Card */}
        <div className={`${styles.statCard} ${styles.fullWidthCard}`}>
          <h4>Enlace de reservas para tus clientes</h4>
          <p style={{ fontSize: '0.8rem', color: '#737373', marginTop: '8px' }}>
            Aura está gestionando tus citas. Comparte este enlace para agendar automáticamente.
          </p>
          <div style={{ background: '#0a0a0a', padding: '12px', borderRadius: '8px', marginTop: '16px', border: '1px solid #262626', color: '#eab308', fontSize: '0.8rem' }}>
            https://aura.kovi.ai/booking/diamont-barber
          </div>
        </div>
      </main>

      <button className={styles.fab}>+</button>
    </div>
  )
}
