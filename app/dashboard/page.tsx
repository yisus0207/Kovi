"use client"

import styles from './dashboard.module.css'

export default function DashboardPage() {
  const chats = [
    { id: 1, name: 'Alaria Diamont', msg: '¿Podrían ayudarme con...', time: '24 abril', tag: 'Soporte', tagType: 'soporte' },
    { id: 2, name: 'Optus Barber', msg: 'Perfecto, ¡muchas gracias!', time: '24 abril', tag: 'Venta', tagType: 'venta' },
    { id: 3, name: 'Kania Smith', msg: 'Perfecto, ¡muchas gracias!', time: '24 abril', tag: 'Venta', tagType: 'venta' },
    { id: 4, name: 'Daniel Marrine', msg: '¿Podrían ayudarme con...', time: '24 abril', tag: 'Soporte', tagType: 'soporte' },
    { id: 5, name: 'Maria Smitia', msg: 'Quiero agendar para ...', time: '24 abril', tag: 'Venta', tagType: 'venta' },
    { id: 6, name: 'Jamie Morrdez', msg: 'Quiero agendar para ...', time: '24 abril', tag: 'Nuevo Lead', tagType: 'lead' },
  ]

  return (
    <div className={styles.dashboardGrid}>
      {/* Column 2: Inbox List */}
      <section className={styles.inboxColumn}>
        <div className={styles.inboxHeader}>
          <h2>Bandeja de entrada</h2>
          <div className={styles.inboxActions}>
            <button>🔄</button>
            <button className={styles.plusBtn}>+</button>
          </div>
        </div>
        
        <div className={styles.chatList}>
          {chats.map((chat) => (
            <div key={chat.id} className={`${styles.chatItem} ${chat.id === 1 ? styles.chatItemActive : ''}`}>
              <div className={styles.chatAvatar}>
                {chat.name.split(' ').map(n => n[0]).join('')}
                <span className={styles.onlineDot}></span>
              </div>
              <div className={styles.chatInfo}>
                <div className={styles.chatTop}>
                  <strong>{chat.name}</strong>
                  <span className={styles.chatTime}>{chat.time}</span>
                </div>
                <div className={styles.chatBottom}>
                  <p>{chat.msg}</p>
                  <span className={`${styles.tag} ${styles['tag-' + chat.tagType]}`}>
                    {chat.tag}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Column 3: Chat Conversation */}
      <section className={styles.chatColumn}>
        {/* Chat Header */}
        <header className={styles.chatHeader}>
          <div className={styles.chatHeaderUser}>
            <div className={styles.avatarLarge}>AD</div>
            <div className={styles.chatHeaderInfo}>
              <h3>Hola, Diamont</h3>
              <span>28 statuds</span>
            </div>
          </div>
          <div className={styles.chatStats}>
            <div className={styles.statItem}>
              <strong>15</strong>
              <span>Chats Activos</span>
            </div>
            <div className={styles.statItem}>
              <strong>1m</strong>
              <span>Respuesta Promedio</span>
            </div>
            <div className={styles.statItem}>
              <strong>1m</strong>
              <span>Respuesta Promedio</span>
            </div>
          </div>
          <div className={styles.chatHeaderActions}>
            <button className={styles.shareBtn}>🚀</button>
            <button>⋮</button>
          </div>
        </header>

        {/* Conversation Area */}
        <div className={styles.conversationArea}>
          <div className={styles.messageRow}>
            <div className={styles.messageBubble}>
              ¿Podrían ayudarme con irmessage con el trario de barbero contro de barberia?
              <span className={styles.msgTime}>7:30 p.m.</span>
            </div>
          </div>

          <div className={`${styles.messageRow} ${styles.messageRowOwner}`}>
            <div className={styles.messageBubbleOwner}>
              Repueste itodo, ñivroha rapido?
              <span className={styles.msgTime}>7:33 p.m. ✓✓</span>
            </div>
          </div>

          <div className={styles.messageRow}>
            <div className={styles.messageBubble}>
              Yo, que viesa gentar nostos?
              <span className={styles.msgTime}>7:30 p.m.</span>
            </div>
          </div>

          <div className={`${styles.messageRow} ${styles.messageRowOwner}`}>
            <div className={styles.messageBubbleOwner}>
              Y udiente irespunibles maritamente con le lirbar a WhatsApp.
              <span className={styles.msgTime}>7:33 p.m. ✓✓</span>
            </div>
          </div>

          <div className={styles.messageRow}>
            <div className={styles.messageBubble}>
              Si
              <span className={styles.msgTime}>7:37 p.m.</span>
            </div>
          </div>
        </div>

        {/* Message Input Area */}
        <footer className={styles.chatInputArea}>
          <div className={styles.inputWrapper}>
            <textarea placeholder="Enacar un composición..." />
            <div className={styles.inputToolbar}>
              <div className={styles.toolbarLeft}>
                <button>📎</button>
                <button>💬 Respuestas rápidas</button>
                <button>📅 Horario de seguimiento</button>
              </div>
              <button className={styles.sendBtn}>➤</button>
            </div>
          </div>
        </footer>
      </section>
    </div>
  )
}
