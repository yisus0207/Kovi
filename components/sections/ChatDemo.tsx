"use client"

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import styles from './ChatDemo.module.css'

interface Message {
  id: number;
  text: string;
  sender: 'luna' | 'user';
  isCard?: boolean;
}

interface Option {
  label: string;
  next: string;
  set?: Record<string, string>;
}

export default function ChatDemo() {
  const [messages, setMessages] = useState<Message[]>([])
  const [options, setOptions] = useState<Option[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const [isRevealed, setIsRevealed] = useState(false)
  const [context, setContext] = useState<Record<string, string>>({})
  const chatBodyRef = useRef<HTMLDivElement>(null)

  const FLOW: any = {
    start: {
      luna: ['¡Hola! 👋 Soy Luna, la recepcionista virtual de Optus Barber.', '¿En qué te ayudo hoy?'],
      options: [
        { label: 'Ver horarios de hoy', next: 'horarios' },
        { label: '¿Cuánto cuesta?', next: 'precios' },
        { label: 'Quiero reservar ya', next: 'reservar' }
      ]
    },
    horarios: {
      luna: ['Hoy tengo disponible con Sebastián: 2:00 PM · 3:30 PM · 5:00 PM · 6:30 PM.', '¿Cuál te funciona?'],
      options: [
        { label: '3:30 PM', next: 'nombre', set: { hora: 'hoy a las 3:30 PM', servicio: 'Corte clásico' } },
        { label: '5:00 PM', next: 'nombre', set: { hora: 'hoy a las 5:00 PM', servicio: 'Corte clásico' } },
        { label: '6:30 PM', next: 'nombre', set: { hora: 'hoy a las 6:30 PM', servicio: 'Corte clásico' } }
      ]
    },
    precios: {
      luna: ['Estos son nuestros servicios: Corte clásico $30.000 · Corte + barba $45.000 · Diseño premium $60.000.', '¿Te agendo alguno?'],
      options: [
        { label: 'Corte clásico', next: 'horariosTras', set: { servicio: 'Corte clásico' } },
        { label: 'Corte + barba', next: 'horariosTras', set: { servicio: 'Corte + barba' } },
        { label: 'Diseño premium', next: 'horariosTras', set: { servicio: 'Diseño premium' } }
      ]
    },
    horariosTras: {
      luna: ['Genial. Tengo estos turnos disponibles hoy: 3:30 PM · 5:00 PM · 6:30 PM.', '¿Cuál prefieres?'],
      options: [
        { label: '3:30 PM', next: 'nombre', set: { hora: 'hoy a las 3:30 PM' } },
        { label: '5:00 PM', next: 'nombre', set: { hora: 'hoy a las 5:00 PM' } },
        { label: '6:30 PM', next: 'nombre', set: { hora: 'hoy a las 6:30 PM' } }
      ]
    },
    reservar: {
      luna: ['¡Perfecto! Estos son los turnos más cercanos con Sebastián:'],
      options: [
        { label: 'Hoy 3:30 PM', next: 'nombre', set: { hora: 'hoy a las 3:30 PM', servicio: 'Corte clásico' } },
        { label: 'Hoy 5:00 PM', next: 'nombre', set: { hora: 'hoy a las 5:00 PM', servicio: 'Corte clásico' } },
        { label: 'Mañana 11:00 AM', next: 'nombre', set: { hora: 'mañana a las 11:00 AM', servicio: 'Corte clásico' } }
      ]
    },
    nombre: {
      luna: ['Listo 🙌 ¿A nombre de quién la agendo?'],
      options: [
        { label: 'Felipe H.', next: 'confirmado', set: { nombre: 'Felipe H.' } },
        { label: 'Carlos R.', next: 'confirmado', set: { nombre: 'Carlos R.' } },
        { label: 'Otro nombre', next: 'confirmado', set: { nombre: 'Juan P.' } }
      ]
    },
    confirmado: {
      luna: ['¡Reservado! Te envío el detalle:'],
      card: true,
      final: ['Te mandaré un recordatorio 2 horas antes. ¿Necesitas algo más?']
    }
  }

  const showNode = (id: string) => {
    const node = FLOW[id]
    if (!node) return

    setOptions([])
    setIsTyping(true)
    
    setTimeout(() => {
      setIsTyping(false)
      
      const newMessages: Message[] = []
      node.luna.forEach((msg: string, i: number) => {
        setTimeout(() => {
          setMessages(prev => [...prev, { id: Date.now() + i, text: msg, sender: 'luna' }])
          
          if (i === node.luna.length - 1) {
            setTimeout(() => {
              if (node.card) {
                setMessages(prev => [...prev, { id: Date.now() + 100, text: '', sender: 'luna', isCard: true }])
                if (node.final) {
                  setTimeout(() => {
                    setIsTyping(true)
                    setTimeout(() => {
                      setIsTyping(false)
                      node.final.forEach((m: string, k: number) => {
                        setTimeout(() => {
                          setMessages(prev => [...prev, { id: Date.now() + 200 + k, text: m, sender: 'luna' }])
                          if (k === node.final.length - 1) setIsRevealed(true)
                        }, k * 800)
                      })
                    }, 1000)
                  }, 700)
                } else {
                  setIsRevealed(true)
                }
              } else if (node.options) {
                setOptions(node.options)
              }
            }, 420)
          }
        }, i * 800)
      })
    }, 1100)
  }

  const handleOptionClick = (opt: Option) => {
    setMessages(prev => [...prev, { id: Date.now(), text: opt.label, sender: 'user' }])
    if (opt.set) setContext(prev => ({ ...prev, ...opt.set }))
    setTimeout(() => showNode(opt.next), 380)
  }

  useEffect(() => {
    showNode('start')
  }, [])

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight
    }
  }, [messages, isTyping])

  return (
    <section id="demo" className={styles.section}>
      <div className={styles.inner}>
        <span className="label">Luna en acción</span>
        <h2 className="h2 fade-up">Pruébala ahora mismo<br/><em>sin salir de aquí</em></h2>
        <p className="lead fade-up" style={{margin: '0 auto'}}>Toca las opciones y mira cómo Luna agenda una cita paso a paso.</p>

        <div className={`${styles.demoNote} fade-up`}>
          <span className={styles.dotGold}></span>
          <span><strong>En tu barbería real, tus clientes escriben lo que quieran</strong> — Luna entiende mensajes, audios y preguntas abiertas. Aquí usamos botones solo para que puedas recorrer el flujo rápido.</span>
        </div>

        <div className={`${styles.phoneWrap} fade-up`}>
          <div className={styles.phoneFrame}>
            <div className={styles.phoneNotch}></div>
            <div className={styles.phoneScreen}>
              <div className={styles.waHeader}>
                <div className={styles.waAvatar}><span className={styles.waAvatarT}>L</span></div>
                <div>
                  <div className={styles.waName}>Luna — Optus Barber</div>
                  <div className={styles.waStatus}>{isTyping ? 'escribiendo...' : 'en línea'}</div>
                </div>
              </div>
              <div className={styles.waBody} ref={chatBodyRef}>
                {messages.map(msg => (
                  msg.isCard ? (
                    <div key={msg.id} className={styles.confirmCard}>
                      <div className={styles.dccTitle}>✅ Cita confirmada</div>
                      <div className={styles.dccRow}><span>Cliente</span><b>{context.nombre || '—'}</b></div>
                      <div className={styles.dccRow}><span>Servicio</span><b>{context.servicio || 'Corte clásico'}</b></div>
                      <div className={styles.dccRow}><span>Día y hora</span><b>{context.hora || 'Hoy 3:30 PM'}</b></div>
                      <div className={styles.dccRow}><span>Barbero</span><b>Sebastián</b></div>
                      <div className={styles.dccRow}><span>Barbería</span><b>Optus Barber</b></div>
                    </div>
                  ) : (
                    <div key={msg.id} className={`${styles.bubble} ${styles[msg.sender === 'luna' ? 'luna' : 'you']}`}>
                      {msg.text}
                      <div className={styles.bTime}>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} {msg.sender === 'user' && '✓✓'}</div>
                    </div>
                  )
                ))}
                {isTyping && (
                  <div className={styles.typing}>
                    <div className={styles.typingDots}><span></span><span></span><span></span></div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.quickReplies}>
          {options.map((opt, i) => (
            <button key={i} className={styles.qrBtn} onClick={() => handleOptionClick(opt)}>
              {opt.label}
            </button>
          ))}
        </div>

        <div className={`${styles.ctaReveal} ${isRevealed ? styles.revealed : ''}`}>
          <div className={styles.dcrHeadline}>Así responde Luna en tu barbería — <em>24/7, sin que tú muevas un dedo.</em></div>
          <Link href="/register" className={styles.btnHero}>Probar Luna 7 días gratis</Link>
          <button className={styles.restartBtn} onClick={() => {
            setMessages([]);
            setContext({});
            setIsRevealed(false);
            showNode('start');
          }}>
            ↻ Probar el demo de nuevo
          </button>
        </div>
      </div>
    </section>
  )
}
