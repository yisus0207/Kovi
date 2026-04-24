import styles from './SocialProof.module.css'

export default function SocialProof() {
  return (
    <div id="proof-strip" className={`${styles.proofStrip} fade-up`}>
      <div className={styles.inner}>
        <div className={styles.avatar}>OB</div>
        <div className={styles.text}>
          <p className={styles.quote}>"Luna atiende mientras estoy cortando. Ya no perdemos ningún cliente."</p>
          <div className={styles.meta}>
            <span className={styles.stars}>★★★★★</span>
            <span>Optus Barber, Bogotá</span>
          </div>
        </div>
        <div className={styles.stat}>47 citas este mes</div>
      </div>
    </div>
  )
}
