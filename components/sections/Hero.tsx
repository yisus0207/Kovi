import Image from 'next/image'
import Link from 'next/link'
import styles from './Hero.module.css'

export default function Hero() {
  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.heroGrid}>
        <div className={`${styles.heroContent} fade-up`}>
          <div className={styles.heroBadge}>
            <span className={styles.heroBadgeDot}></span>
            Recepcionista IA · WhatsApp 24/7
          </div>

          <h1 className={styles.heroH1}>
            Tu barbería,<br/>
            siempre <em>atendida.</em>
          </h1>

          <p className={styles.heroSub}>
            Luna — la recepcionista IA de tu barbería en WhatsApp — responde, agenda citas y fideliza clientes mientras tú te dedicas a cortar.
          </p>

          <Link href="/register" className={styles.btnHero}>
            Probar gratis — prueba la agenda 7 días
          </Link>
          
          <p className={styles.heroTrust}>
            Sin tarjeta de crédito
            <span>·</span>
            Setup en 30 minutos
            <span>·</span>
            Cancela cuando quieras
          </p>
        </div>

        <div className={`${styles.heroVisual} fade-up`} aria-label="Dashboard de barberia.lat y Luna atendiendo por WhatsApp">
          <div className={styles.heroStage}>
            <div className={styles.macbook}>
              <div className={styles.macbookScreen}>
                <div className={styles.macbookScreenInner}>
                  <Image 
                    src="/assets/mockup/dashboard-citas.jpg" 
                    alt="Dashboard Citas de barberia.lat con turnos del día" 
                    width={600}
                    height={375}
                    priority
                  />
                </div>
              </div>
              <div className={styles.hinge}></div>
              <div className={styles.base}></div>
            </div>
            <div className={styles.iphone}>
              <div className={styles.notch}></div>
              <div className={styles.screen}>
                <Image 
                  src="/assets/mockup/app-conversacion.jpg" 
                  alt="Luna conversando con un cliente" 
                  width={250}
                  height={500}
                  loading="lazy"
                />
              </div>
              <div className={styles.homeBar}></div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.heroScroll} aria-hidden="true">
        <div className={styles.heroScrollLine}></div>
      </div>
    </section>
  )
}
