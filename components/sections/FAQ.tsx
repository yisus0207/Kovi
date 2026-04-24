"use client"

import { useState } from 'react'
import styles from './FAQ.module.css'

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

function FAQItem({ question, answer, isOpen, onToggle }: FAQItemProps) {
  return (
    <div className={`${styles.faqItem} ${isOpen ? styles.open : ''}`}>
      <button className={styles.faqQ} onClick={onToggle} aria-expanded={isOpen}>
        <span className={styles.faqQText}>{question}</span>
        <span className={styles.faqIcon}>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M5 1V9M1 5H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </span>
      </button>
      <div className={styles.faqA} style={{ maxHeight: isOpen ? '600px' : '0' }}>
        <p className={styles.faqAInner}>{answer}</p>
      </div>
    </div>
  )
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    { q: "¿Mis clientes tienen que descargarse alguna app?", a: "No. Aura opera 100% dentro de WhatsApp — la app que tus clientes ya usan todos los días. Para ellos, es exactamente igual que chatear con una persona." },
    { q: "¿Cuánto tarda en estar listo?", a: "El setup completo tarda 30 minutos. Te asistimos paso a paso por WhatsApp para que Aura esté activa el mismo día." },
    { q: "¿Qué pasa si un cliente quiere hablar con una persona?", a: "Aura detecta cuando una consulta requiere atención humana y te transfiere la conversación con una notificación. Tú tomas el control cuando quieras." },
    { q: "¿Puedo personalizar cómo habla Aura?", a: "Sí. Puedes definir el tono, los servicios, precios, horarios y hasta el nombre que Aura usa. Suena como tu propio negocio, no como un bot genérico." },
    { q: "¿Qué pasa si cancelo?", a: "Sin permanencia. Cancelas cuando quieras desde el panel, sin trámites ni penalizaciones. Tus datos y citas quedan disponibles por 30 días." },
    { q: "¿Mis clientes se dan cuenta de que es un bot?", a: "Aura se presenta como la asistente virtual de tu negocio — no la escondemos. Lo que sí pasa: responde tan natural que la mayoría de clientes sigue la conversación sin pensar en eso. Si preguntan, Aura es transparente." },
    { q: "¿Qué pasa si WhatsApp bloquea el número?", a: "Usamos WhatsApp Business API oficial de Meta, no números personales ni bots piratas. Eso nos mantiene dentro de las reglas y el riesgo de bloqueo es mínimo. Si algo pasa, nuestro equipo lo resuelve contigo." },
    { q: "¿Aura entiende bien el español colombiano?", a: "Sí. Aura funciona con Claude — uno de los modelos de IA más avanzados — y está calibrada para el español de Colombia y LATAM. Entiende tuteo, modismos y lenguaje natural de negocios." },
    { q: "¿Sirve para negocios de cualquier tamaño?", a: "Sirve para todos. Aura maneja agendas de uno a múltiples profesionales o sedes, con sus horarios y servicios individuales. Si tienes un equipo grande, Aura asigna las citas al especialista correcto automáticamente." },
    { q: "¿Qué pasa con mis datos y los de mis clientes?", a: "Los datos viven en servidores cifrados y son tuyos. No los vendemos ni los compartimos. Cumplimos con las normas de privacidad de datos y puedes exportar o borrar todo cuando quieras." }
  ]

  return (
    <section id="faq" className={styles.section}>
      <div className={styles.inner}>
        <span className="label">Preguntas frecuentes</span>
        <h2 className="h2 fade-up">Todo lo que<br/><em>necesitas saber</em></h2>

        <div className={`${styles.faqList} fade-up`}>
          {faqs.map((faq, index) => (
            <FAQItem 
              key={index} 
              question={faq.q} 
              answer={faq.a} 
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
