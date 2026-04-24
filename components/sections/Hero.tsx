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
            Asistente IA · WhatsApp 24/7
          </div>

          <h1 className={styles.heroH1}>
            Tu negocio,<br/>
            siempre <em>atendido.</em>
          </h1>

          <p className={styles.heroSub}>
            Aura — la asistente IA de tu negocio en WhatsApp — responde, agenda citas y fideliza clientes mientras tú te enfocas en lo importante.
          </p>

          <Link href="/register" className={styles.btnHero}>
            Probar gratis — agenda activa 7 días
          </Link>
          
          <p className={styles.heroTrust}>
            Sin tarjeta de crédito
            <span>·</span>
            Setup en 30 minutos
            <span>·</span>
            Cancela cuando quieras
          </p>
        </div>

        <div className={`${styles.heroVisual} fade-up`} aria-label="Dashboard de gestión y Aura atendiendo por WhatsApp">
          <div className={styles.heroStage}>
            <div className={styles.macbook}>
              <div className={styles.macbookScreen}>
                <div className={styles.macbookScreenInner}>
                  <Image 
                    src="/assets/mockup/dashboard-general.png" 
                    alt="Dashboard de gestión con turnos del día" 
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
                  src="/assets/mockup/chat-general.png" 
                  alt="Aura conversando con un cliente" 
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
