"use client"

import { useState } from 'react'
import styles from '../dashboard.module.css'

const Icons = {
  Plus: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14"/></svg>,
  Back: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>,
  Search: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
}

export default function InboxPage() {
  const [selectedChat, setSelectedChat] = useState<number | null>(null)
  const [filter, setFilter] = useState('Todos')

  const chats = [
    { id: 1, name: 'Alaria Diamont', msg: '¿Podrían ayudarme con el horario?', time: '14:20', tag: 'Soporte', tagType: 'soporte' },
    { id: 2, name: 'Optus Barber', msg: 'Excelente servicio, gracias Aura!', time: '13:45', tag: 'Venta', tagType: 'venta' },
    { id: 3, name: 'Kania Smith', msg: '¿Tienen citas para mañana?', time: '12:10', tag: 'Venta', tagType: 'venta' },
    { id: 4, name: 'Daniel Marrine', msg: 'Necesito cancelar mi reserva', time: '11:05', tag: 'Soporte', tagType: 'soporte' },
  ]

  const filters = ['Todos', 'No leídos', 'Ventas']

  return (
    <div className={styles.dashboardContainer}>
      {/* Header List */}
      <header className={styles.inboxHeader}>
        <h2>Bandeja</h2>
        <div className={styles.searchInner}>
          <Icons.Search />
          <input type="text" placeholder="Buscar..." />
        </div>
        <div className={styles.filterRow}>
          {filters.map(f => (
            <button 
              key={f} 
              onClick={() => setFilter(f)}
              className={`${styles.filterTab} ${filter === f ? styles.filterTabActive : ''}`}
            >
              {f}
            </button>
          ))}
        </div>
      </header>

      <div className={`${styles.gridColumns} ${selectedChat ? styles.showChat : ''}`}>
        
        {/* List Section */}
        <div className={styles.inboxWrapper}>
          <div className={styles.chatItems}>
            {chats.map(chat => (
              <div 
                key={chat.id} 
                onClick={() => setSelectedChat(chat.id)}
                className={`${styles.chatRow} ${selectedChat === chat.id ? styles.chatRowActive : ''}`}
              >
                <div className={styles.chatAvatar}>
                  {chat.name.split(' ').map(n => n[0]).slice(0,2).join('')}
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
        </div>

        {/* Chat Conversation Overlay */}
        <div className={styles.chatWrapper}>
          {selectedChat && (
            <>
              <header className={styles.chatHeader}>
                <button onClick={() => setSelectedChat(null)} className={styles.backBtn}>
                  <Icons.Back />
                </button>
                <div>
                  <h4 style={{ margin: 0 }}>{chats.find(c => c.id === selectedChat)?.name}</h4>
                  <div className={styles.auraStatus}>
                    <span className={styles.blinkingLight}></span>
                    <span>Aura Control</span>
                  </div>
                </div>
              </header>

              <div className={styles.messagesContainer}>
                <div className={styles.bubbleLeft}>
                  <p>¿Podrían ayudarme con el horario?</p>
                </div>
                <div className={styles.bubbleRight}>
                  <p>¡Hola! Abrimos a las 8:00 AM.</p>
                </div>
              </div>

              <footer className={styles.composerWrapper}>
                <div className={styles.lockedComposer}>
                  <p>Mantener presionado para control manual</p>
                  <span>🔒</span>
                </div>
              </footer>
            </>
          )}
        </div>
      </div>

      <button className={styles.fab}><Icons.Plus /></button>
    </div>
  )
}
