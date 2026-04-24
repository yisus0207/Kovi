"use client"

import { useState } from 'react'
import styles from '../dashboard.module.css'

const Icons = {
  Refresh: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/><polyline points="21 3 21 8 16 8"/></svg>,
  Plus: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  Send: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="#25d366"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>,
  More: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>,
  Check: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#25d366" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>,
  Back: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6"/></svg>,
  DoubleCheck: () => (
    <div style={{ display: 'flex', marginLeft: '4px' }}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#25d366" strokeWidth="3" style={{ marginRight: '-8px' }}><polyline points="20 6 9 17 4 12"/></svg>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#25d366" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
    </div>
  ),
  Clip: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#737373" strokeWidth="2"><path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>,
  Quick: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#737373" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
  Calendar: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#737373" strokeWidth="2"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
}

export default function InboxPage() {
  const [selectedChat, setSelectedChat] = useState<number | null>(null)

  const chats = [
    { id: 1, name: 'Alaria Diamont', msg: '¿Podrían ayudarme con el horario?', time: '14:20', tag: 'Soporte', tagType: 'soporte', status: 'online' },
    { id: 2, name: 'Optus Barber', msg: 'Perfecto, ¡muchas gracias!', time: '13:45', tag: 'Venta', tagType: 'venta', status: 'online' },
    { id: 3, name: 'Kania Smith', msg: '¿Tienen citas para mañana?', time: '12:10', tag: 'Venta', tagType: 'venta', status: 'offline' },
    { id: 4, name: 'Daniel Marrine', msg: 'Necesito cancelar mi reserva', time: '11:05', tag: 'Soporte', tagType: 'soporte', status: 'online' },
    { id: 5, name: 'Maria Smith', msg: 'Quiero agendar para...', time: '10:30', tag: 'Venta', tagType: 'venta', status: 'online' },
    { id: 6, name: 'Jamie Morrdez', msg: 'Quiero agendar para...', time: '09:15', tag: 'Nuevo Lead', tagType: 'nuevoLead', status: 'online' },
  ]

  return (
    <div className={`${styles.gridColumns} ${selectedChat ? styles.showChat : ''}`}>
      
      {/* COLUMN 2: INBOX LIST */}
      <div className={styles.inboxWrapper}>
        <div className={styles.inboxHeaderInner}>
          <div className={styles.inboxHeaderTitle}>
            <span>Bandeja de entrada</span>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button className={styles.topAction}><Icons.Refresh /></button>
              <button className={styles.topAction}><Icons.Plus /></button>
            </div>
          </div>
        </div>

        <div className={styles.chatItems}>
          {chats.map(chat => (
            <div 
              key={chat.id} 
              onClick={() => setSelectedChat(chat.id)}
              className={`${styles.chatRow} ${selectedChat === chat.id ? styles.chatRowActive : ''}`}
            >
              <div className={styles.chatAvatarWrapper}>
                <div className={styles.chatAvatar}></div>
                {chat.status === 'online' && <div className={styles.statusDot}></div>}
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

      {/* COLUMN 3: CONVERSATION AREA */}
      <div className={styles.chatWrapper}>
        {selectedChat ? (
          <>
            <header className={styles.chatHeader}>
              <div className={styles.chatUserLarge}>
                <button onClick={() => setSelectedChat(null)} className={styles.backBtn}>
                  <Icons.Back />
                </button>
                <div className={styles.chatAvatarLarge}></div>
                <div>
                  <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 700 }}>{chats.find(c => c.id === selectedChat)?.name}</h4>
                  <span style={{ fontSize: '0.7rem', color: '#525252' }}>28 status</span>
                </div>
              </div>

              <div className={styles.chatStats}>
                <div className={styles.statItem}>
                  <span className={styles.statVal}>15</span>
                  <span className={styles.statLab}>Chats Activos</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statVal}>1m</span>
                  <span className={styles.statLab}>Respuesta Promedio</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statVal}>1m</span>
                  <span className={styles.statLab}>Respuesta Promedio</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <button className={styles.topAction} style={{ background: '#25d366', color: '#000', border: 'none', width: '28px', height: '28px' }}><Icons.Send /></button>
                <button className={styles.topAction} style={{ width: '28px', height: '28px' }}><Icons.More /></button>
              </div>
            </header>

            <div className={styles.messagesContainer}>
              <div className={styles.bubbleLeft}>
                <p style={{ margin: 0 }}>¿Podrían ayudarme con el horario?</p>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '4px' }}>
                  <span className={styles.time} style={{ fontSize: '0.65rem' }}>14:20</span>
                </div>
              </div>
              <div className={styles.bubbleRight}>
                <p style={{ margin: 0 }}>¡Hola! Con gusto. Abrimos de lunes a sábado de 8:00 AM a 8:00 PM.</p>
                <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginTop: '4px', gap: '4px' }}>
                  <span className={styles.time} style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.6)' }}>14:21</span>
                  <Icons.DoubleCheck />
                </div>
              </div>
            </div>

            <footer className={styles.composerWrapper}>
              <div className={styles.composerInner}>
                <input className={styles.composerInput} placeholder="Escribe un mensaje..." />
                <div style={{ display: 'flex', justifyItems: 'center', justifyContent: 'space-between', marginTop: '12px', alignItems: 'center' }}>
                  <div style={{ display: 'flex', gap: '20px' }}>
                    <Icons.Clip />
                    <Icons.Quick />
                    <Icons.Calendar />
                  </div>
                  <button style={{ background: '#25d366', border: 'none', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icons.Send />
                  </button>
                </div>
              </div>
            </footer>
          </>
        ) : (
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#404040' }}>
            <p>Selecciona un chat para comenzar</p>
          </div>
        )}
      </div>
    </div>
  )
}
