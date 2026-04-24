import styles from './SocialProof.module.css'

export default function SocialProof() {
  return (
    <div id="proof-strip" className={`${styles.proofStrip} fade-up`}>
      <div className={styles.inner}>
        <div className={styles.avatar}>CP</div>
        <div className={styles.text}>
          <p className={styles.quote}>"Aura atiende mientras estoy trabajando. Ya no perdemos ninguna consulta."</p>
          <div className={styles.meta}>
            <span className={styles.stars}>★★★★★</span>
            <span>Centro Profesional, Bogotá</span>
          </div>
        </div>
        <div className={styles.stat}>47 citas gestionadas este mes</div>
      </div>
    </div>
  )
}
