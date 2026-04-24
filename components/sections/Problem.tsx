import Link from 'next/link'
import styles from './Problem.module.css'

export default function Problem() {
  return (
    <section id="problema" className={styles.section}>
      <div className={styles.inner}>
        <span className="label">El problema</span>
        <h2 className="h2 fade-up">¿Cuántas citas<br/><em>pierdes cada día?</em></h2>
        <p className="lead fade-up">Cada cliente que escribe y no recibe respuesta es plata que se va a la barbería de al lado.</p>

        <div className={styles.painGrid}>
          <div className={`${styles.painCard} fade-up`}>
            <div className={styles.painIcon}>📵</div>
            <div>
              <p className={styles.painTitle}>Mensajes de madrugada sin respuesta</p>
              <p className={styles.painDesc}>Clientes que escriben a las 11 PM para reservar turno — y al otro día ya fueron a otra barbería.</p>
            </div>
          </div>
          <div className={`${styles.painCard} fade-up`}>
            <div className={styles.painIcon}>✂️</div>
            <div>
              <p className={styles.painTitle}>Manos ocupadas, celular ignorado</p>
              <p className={styles.painDesc}>Mientras estás cortando, el WhatsApp se llena de mensajes que no puedes atender. Cada uno es un turno perdido.</p>
            </div>
          </div>
          <div className={`${styles.painCard} fade-up`}>
            <div className={styles.painIcon}>🗓️</div>
            <div>
              <p className={styles.painTitle}>Agenda desorganizada o en la cabeza</p>
              <p className={styles.painDesc}>Turnos en el chat, en el cuaderno, o de memoria. Doble booking, olvidos, clientes molestos.</p>
            </div>
          </div>
        </div>

        {/* CTA after pain */}
        <div className="fade-up" style={{textAlign: 'center', marginTop: '40px'}}>
          <Link href="/register" className={styles.btnHeroPost}>Prueba gratis el sistema — Luna se activa al contratar</Link>
        </div>
      </div>
    </section>
  )
}
