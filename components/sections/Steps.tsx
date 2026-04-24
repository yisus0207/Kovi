import styles from './Steps.module.css'

export default function Steps() {
  return (
    <section id="como-funciona" className={styles.section}>
      <div className={styles.inner}>
        <span className="label">Cómo funciona</span>
        <h2 className="h2 fade-up">Aura trabaja por ti<br/><em>desde el día 1</em></h2>
        <p className="lead fade-up">Sin apps nuevas para tu cliente. Sin cambiar cómo trabajas. Solo conectas tu WhatsApp y Aura hace el resto.</p>

        <div className={`${styles.steps} fade-up`}>
          <div className={styles.step}>
            <div className={styles.stepNum}>1</div>
            <div className={styles.stepBody}>
              <p className={styles.stepTitle}>Conectas tu WhatsApp en 30 minutos</p>
              <p className={styles.stepDesc}>Te damos un número de WhatsApp Business con Aura ya configurada. Sin instalaciones, sin técnicos, solo sigues los pasos del setup.</p>
            </div>
          </div>
          <div className={styles.step}>
            <div className={styles.stepNum}>2</div>
            <div className={styles.stepBody}>
              <p className={styles.stepTitle}>Aura atiende a tus clientes 24/7</p>
              <p className={styles.stepDesc}>Responde preguntas, muestra horarios disponibles, agenda citas y envía confirmaciones — en tu tono, con el nombre de tu negocio.</p>
            </div>
          </div>
          <div className={styles.step}>
            <div className={styles.stepNum}>3</div>
            <div className={styles.stepBody}>
              <p className={styles.stepTitle}>Tú solo te enfocas en brindar tu servicio</p>
              <p className={styles.stepDesc}>Ves todos los turnos en tu panel, puedes editar, cancelar o confirmar con un clic. Todo sincronizado en tiempo real.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
