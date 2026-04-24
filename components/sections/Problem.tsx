import Link from 'next/link'
import styles from './Problem.module.css'

export default function Problem() {
  return (
    <section id="problema" className={styles.section}>
      <div className={styles.inner}>
        <span className="label">El problema</span>
        <h2 className="h2 fade-up">¿Cuántas citas<br/><em>pierdes cada día?</em></h2>
        <p className="lead fade-up">Cada cliente que escribe y no recibe respuesta es una oportunidad que se va a la competencia.</p>

        <div className={styles.painGrid}>
          <div className={`${styles.painCard} fade-up`}>
            <div className={styles.painIcon}>📵</div>
            <div>
              <p className={styles.painTitle}>Mensajes fuera de horario sin respuesta</p>
              <p className={styles.painDesc}>Clientes que escriben tarde para reservar turno — y al otro día ya buscaron otra opción.</p>
            </div>
          </div>
          <div className={`${styles.painCard} fade-up`}>
            <div className={styles.painIcon}>💼</div>
            <div>
              <p className={styles.painTitle}>Manos ocupadas, consultas ignoradas</p>
              <p className={styles.painDesc}>Mientras estás trabajando, el WhatsApp se llena de mensajes que no puedes atender. Cada uno es una venta perdida.</p>
            </div>
          </div>
          <div className={`${styles.painCard} fade-up`}>
            <div className={styles.painIcon}>🗓️</div>
            <div>
              <p className={styles.painTitle}>Agenda desorganizada o manual</p>
              <p className={styles.painDesc}>Turnos en chats, cuadernos o de memoria. Doble reserva, olvidos y clientes insatisfechos.</p>
            </div>
          </div>
        </div>

        {/* CTA after pain */}
        <div className="fade-up" style={{textAlign: 'center', marginTop: '40px'}}>
          <Link href="/register" className={styles.btnHeroPost}>Prueba gratis el sistema — Aura se activa al contratar</Link>
        </div>
      </div>
    </section>
  )
}
