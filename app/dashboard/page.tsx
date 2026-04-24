"use client"

import styles from './dashboard.module.css'

export default function DashboardPage() {
  const stats = [
    { title: 'Citas hoy', value: '0', icon: '📅' },
    { title: 'Ingresos del día', value: '$0', icon: '💰' },
    { title: 'Citas esta semana', value: '0', icon: '📈' },
    { title: 'Confirmadas hoy', value: '0', icon: '✅' },
  ]

  const chats = [
    { id: 1, name: 'Alaria Diamont', msg: '¿Podrían ayudarme con ...', time: '24 abril', tag: 'Soporte', tagType: 'soporte' },
    { id: 2, name: 'Optus Barber', msg: 'Perfecto, ¡muchas gracias!', time: '24 abril', tag: 'Venta', tagType: 'venta' },
    { id: 3, name: 'Kania Smith', msg: 'Perfecto, ¡muchas gracias!', time: '24 abril', tag: 'Venta', tagType: 'venta' },
    { id: 4, name: 'Daniel Marrine', msg: '¿Podrían ayudarme con ...', time: '24 abril', tag: 'Soporte', tagType: 'soporte' },
  ]

  return (
    <div className={styles.dashboardContainer}>
      {/* Top Header */}
      <header className={styles.mainHeader}>
        <div className={styles.headerTitle}>
          <h2>Hola, Diamont</h2>
          <span>Viernes 24 de Abril</span>
        </div>
        <div className={styles.headerActions}>
          <div className={styles.statusPill}>
            <span className={styles.dot}></span> Estatus
          </div>
          <div className={styles.searchBox}>
            Buscar... <span>⌘K</span>
          </div>
          <div className={styles.utilityIcons}>
            <span>🌙</span>
            <span>❓</span>
            <span>🚪</span>
          </div>
        </div>
      </header>

      {/* Mobile Stats Grid */}
      <div className={styles.statsGrid}>
        {stats.map((stat, i) => (
          <div key={i} className={styles.statCard}>
            <h4>{stat.title}</h4>
            <strong>{stat.value}</strong>
            <div className={styles.statCardIcon}>{stat.icon}</div>
          </div>
        ))}
        {/* Floating Action Button - Mobile */}
        <button className={styles.fab}>+</button>
      </div>

      {/* Desktop Content Columns */}
      <div className={styles.gridColumns}>
        {/* Inbox */}
        <section className={styles.inboxWrapper}>
          <div className={styles.columnHeader}>
            <h3>Bandeja de entrada</h3>
            <div className={styles.columnIcons}>
              <button>🔄</button>
              <button className={styles.plusBtn}>+</button>
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

        {/* Chat Detail */}
        <section className={styles.chatWrapper}>
          <div className={styles.chatHeader}>
            <div className={styles.chatUser}>
              <div className={styles.avatarSmall}>AD</div>
              <div>
                <h4>Hola, Diamont</h4>
                <span>28 statuds</span>
              </div>
            </div>
            <div className={styles.chatAnalytics}>
              <div className={styles.analytic}><strong>15</strong><span>Chats Activos</span></div>
              <div className={styles.analytic}><strong>1m</strong><span>Respuesta</span></div>
            </div>
            <div className={styles.chatControls}>
              <button className={styles.plusBtn}>🚀</button>
              <button>⋮</button>
            </div>
          </div>

          <div className={styles.messagesContainer}>
            <div className={styles.bubbleLeft}>
              <p>¿Podrían ayudarme con irmessage con el trario de barbero contro de barberia?</p>
              <span className={styles.bubbleTime}>7:30 p.m.</span>
            </div>
            <div className={styles.bubbleRight}>
              <p>Repueste itodo, ñivroha rapido?</p>
              <span className={styles.bubbleTime}>7:33 p.m. ✓✓</span>
            </div>
          </div>

          <footer className={styles.composerWrapper}>
            <div className={styles.composer}>
              <textarea placeholder="Enacar un composición..." />
              <div className={styles.composerTools}>
                <div className={styles.toolsLeft}>
                  <button>📎</button>
                  <button>💬 Respuestas rápidas</button>
                </div>
                <button className={styles.finalSend}>➤</button>
              </div>
            </div>
          </footer>
        </section>
      </div>
    </div>
  )
}
