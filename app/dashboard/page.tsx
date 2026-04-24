"use client"

import styles from './dashboard.module.css'

const Icons = {
  Plus: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7v14"/></svg>,
  Refresh: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/></svg>,
  Send: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>,
  Calendar: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>,
  Wallet: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/></svg>
}

export default function DashboardPage() {
  const stats = [
    { title: 'Citas Hoy', value: '12', icon: <Icons.Calendar />, color: '#eab308' },
    { title: 'Ingresos', value: '$1.2M', icon: <Icons.Wallet />, color: '#22c55e' },
  ]

  const chats = [
    { id: 1, name: 'Alaria Diamont', msg: '¿Podrían ayudarme con el horario?', time: '14:20', tag: 'Soporte', tagType: 'soporte' },
    { id: 2, name: 'Optus Barber', msg: 'Excelente servicio, gracias Aura!', time: '13:45', tag: 'Venta', tagType: 'venta' },
    { id: 3, name: 'Kania Smith', msg: '¿Tienen citas para mañana?', time: '12:10', tag: 'Venta', tagType: 'venta' },
  ]

  return (
    <div className={styles.dashboardContainer}>
      {/* Top Header */}
      <header className={styles.mainHeader}>
        <div className={styles.headerTitle}>
          <h2>Resumen General</h2>
          <span>Viernes, 24 de Abril</span>
        </div>
        <div className={styles.headerActions}>
          <div className={styles.statusPill}>
            <span className={styles.dot}></span> Aura Online
          </div>
          <button className={styles.iconBtn}><Icons.Refresh /></button>
        </div>
      </header>

      {/* Grid Columns */}
      <div className={styles.gridColumns}>
        
        {/* Inbox Wrapper */}
        <section className={styles.inboxWrapper}>
          
          {/* Mobile Only Stats - Refined */}
          <div className={styles.statsGrid}>
            {stats.map((stat, i) => (
              <div key={i} className={styles.statCard}>
                <h4>{stat.title}</h4>
                <strong>{stat.value}</strong>
                <div className={styles.statCardIcon} style={{ color: stat.color }}>{stat.icon}</div>
              </div>
            ))}
          </div>

          <div className={styles.columnHeader}>
            <h3>Mensajes Recientes</h3>
            <div className={styles.columnIcons}>
              <button className={styles.iconBtn}><Icons.Plus /></button>
            </div>
          </div>

          <div className={styles.chatItems}>
            {chats.map(chat => (
              <div key={chat.id} className={`${styles.chatRow} ${chat.id === 1 ? styles.chatRowActive : ''}`}>
                <div className={styles.chatAvatar}>
                  {chat.name.split(' ').map(n => n[0]).join('')}
                  <span className={styles.onlineDot}></span>
                </div>
                <div className={styles.chatMeta}>
                  <div className={styles.chatLine1}>
                    <strong>{chat.name}</strong>
                    <span className={styles.time}>{chat.time}</span>
                  </div>
                  <div className={styles.chatLine2}>
                    <p>{chat.msg}</p>
                    <span className={`${styles.tag} ${styles[chat.tagType]}`}>{chat.tag}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Chat Detail - On mobile this is initially hidden or toggled */}
        <section className={styles.chatWrapper}>
          <header className={styles.chatHeader}>
            <div className={styles.chatUser}>
              <div className={styles.avatarLarge}>AD</div>
              <div>
                <h4>Alaria Diamont</h4>
                <span>Activa ahora • Aura gestionando</span>
              </div>
            </div>
          </header>

          <div className={styles.messagesContainer}>
            <div className={styles.bubbleLeft}>
              <p>Hola! ¿Podrían ayudarme con el horario de mañana?</p>
              <span className={styles.bubbleTime}>14:20</span>
            </div>
            <div className={styles.bubbleRight}>
              <p>¡Hola Alaria! Abrimos a las 8:00 AM. ¿Deseas agendar?</p>
              <span className={styles.bubbleTime}>14:21 • Aura AI</span>
            </div>
          </div>

          <footer className={styles.composerWrapper}>
            <div className={styles.composer}>
              <textarea placeholder="Responder..." />
              <div className={styles.composerTools}>
                <button className={styles.finalSend}>
                  <Icons.Send />
                </button>
              </div>
            </div>
          </footer>
        </section>
      </div>

      {/* Floating Action Button */}
      <button className={styles.fab}><Icons.Plus /></button>
    </div>
  )
}
