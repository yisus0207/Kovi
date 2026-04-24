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
    { title: 'Citas Hoy', value: '12', icon: <Icons.Calendar />, color: '#25d366' },
    { title: 'Ingresos del día', value: '$1,250', icon: <Icons.Wallet />, color: '#3b82f6' },
    { title: 'Citas esta semana', value: '48', icon: <Icons.Trending />, color: '#f97316' },
    { title: 'Confirmadas hoy', value: '8', icon: <Icons.Check />, color: '#25d366' },
  ]

  return (
    <div className={styles.contentArea} style={{ padding: '40px' }}>
      <main className={styles.statsGrid}>
        {stats.map((stat, i) => (
          <div key={i} className={styles.statCard}>
            <h4>{stat.title}</h4>
            <strong>{stat.value}</strong>
            <div style={{ position: 'absolute', bottom: '24px', right: '24px', color: stat.color, opacity: 0.8 }}>
              {stat.icon}
            </div>
          </div>
        ))}

        {/* Action Suggestion Card */}
        <div className={styles.statCard} style={{ gridColumn: 'span 4', marginTop: '20px' }}>
          <h4 style={{ color: '#25d366' }}>Enlace de reservas para tus clientes</h4>
          <p style={{ fontSize: '0.9rem', color: '#737373', marginTop: '12px' }}>
            Aura está gestionando tus citas. Comparte este enlace para agendar automáticamente.
          </p>
          <div style={{ background: '#0a0a0a', padding: '20px', borderRadius: '12px', marginTop: '20px', border: '1px solid #141414', color: '#fff', fontSize: '0.9rem', fontWeight: '600', letterSpacing: '0.02em' }}>
            https://aura.kovi.ai/booking/diamont-barber
          </div>
        </div>
      </main>
    </div>
  )
}
