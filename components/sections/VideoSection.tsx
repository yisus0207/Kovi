import styles from './VideoSection.module.css'

export default function VideoSection() {
  return (
    <section id="video-section" className={styles.videoSection}>
      <div className={styles.videoWrap}>
        {/* Usando la imagen generada como fondo ambiental */}
        <div 
          className={styles.fallback} 
          style={{ backgroundImage: 'url("/assets/04-brand-foto-navaja.png")' }}
          role="img" 
          aria-label="Navaja barbera clásica sobre superficie oscura con reflejo dorado"
        ></div>
      </div>
      <div className={`${styles.content} fade-up`}>
        <h2 className="h2">Mientras tú <em>cortas</em></h2>
        <div className={styles.statRow}>
          <div className={styles.stat}>
            <div className={styles.statNum}>47</div>
            <div className={styles.statLabel}>Citas por mes</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statNum}>24/7</div>
            <div className={styles.statLabel}>Luna activa</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statNum}>100%</div>
            <div className={styles.statLabel}>Atendidas</div>
          </div>
        </div>
      </div>
    </section>
  )
}
