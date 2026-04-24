"use client"

import { useState } from 'react'
import Link from 'next/link'
import styles from './register.module.css'

export default function RegisterPage() {
  const [isLogin, setIsLogin] = useState(false)

  return (
    <main className={styles.container}>
      {/* Left Side: Branding & Value Prop */}
      <section className={styles.brandingSide}>
        <div className={styles.brandingContent}>
          <Link href="/" className={styles.logo}>
            KOVI<span>.ai</span>
          </Link>
          
          <div className={styles.valueProp}>
            <span className="label">Plataforma de IA</span>
            <h1 className={styles.title}>
              {isLogin ? 'Bienvenido de vuelta.' : 'El futuro de tu negocio empieza con Aura.'}
            </h1>
            <p className={styles.description}>
              {isLogin 
                ? 'Accede a tu panel de control y gestiona la inteligencia de tu negocio en tiempo real.' 
                : 'Únete a los negocios que ya delegaron su agenda y atención al cliente a la IA más avanzada del mercado.'}
            </p>

            <ul className={styles.featureList}>
              <li>
                <div className={styles.icon}>✦</div>
                <div>
                  <strong>Aura 24/7</strong>
                  <p>Atención inmediata sin intervención humana.</p>
                </div>
              </li>
              <li>
                <div className={styles.icon}>✦</div>
                <div>
                  <strong>Control Total</strong>
                  <p>Dashboard avanzado de citas y analíticas.</p>
                </div>
              </li>
              <li>
                <div className={styles.icon}>✦</div>
                <div>
                  <strong>Cero Fricción</strong>
                  <p>Configuración lista en menos de 5 minutos.</p>
                </div>
              </li>
            </ul>
          </div>

          <div className={styles.brandingFooter}>
            <p>© 2026 KOVI.ai — Potenciado por Aura Intelligence</p>
          </div>
        </div>
        
        {/* Abstract Background Element */}
        <div className={styles.glow} />
      </section>

      {/* Right Side: Form */}
      <section className={styles.formSide}>
        <div className={styles.formWrapper}>
          {/* Tabs Selector */}
          <div className={styles.tabs}>
            <button 
              className={!isLogin ? styles.activeTab : ''} 
              onClick={() => setIsLogin(false)}
            >
              Crear cuenta
            </button>
            <button 
              className={isLogin ? styles.activeTab : ''} 
              onClick={() => setIsLogin(true)}
            >
              Iniciar sesión
            </button>
          </div>

          <div className={`${styles.formContent} fade-up visible`}>
            <header className={styles.formHeader}>
              <h2>{isLogin ? 'Ingresa a tu cuenta' : 'Empieza tu prueba gratis'}</h2>
              <p>{isLogin ? 'Gestiona tu negocio' : '7 días de acceso total, sin tarjetas.'}</p>
            </header>

            <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
              {!isLogin && (
                <>
                  <div className={styles.inputGroup}>
                    <label>Tu nombre completo</label>
                    <input type="text" placeholder="Ej. Alejandro Medina" required />
                  </div>
                  <div className={styles.inputGroup}>
                    <label>Nombre de tu negocio o marca</label>
                    <input type="text" placeholder="Ej. Clínica Dental Elite" required />
                  </div>
                </>
              )}

              <div className={styles.inputGroup}>
                <label>Correo profesional</label>
                <input type="email" placeholder="tu@empresa.com" required />
              </div>

              {!isLogin && (
                <div className={styles.inputGroup}>
                  <label>WhatsApp del negocio (Para Aura)</label>
                  <div className={styles.phoneInput}>
                    <select defaultValue="CO">
                      <option value="CO">CO +57</option>
                      <option value="MX">MX +52</option>
                      <option value="ES">ES +34</option>
                    </select>
                    <input type="tel" placeholder="300 000 0000" required />
                  </div>
                </div>
              )}

              <div className={styles.inputGroup}>
                <label>Contraseña</label>
                <input type="password" placeholder="••••••••" required />
              </div>

              <button type="submit" className={styles.submitBtn}>
                {isLogin ? 'Acceder al Dashboard' : 'Activar mi prueba gratis'}
              </button>

              <p className={styles.terms}>
                {isLogin ? (
                  <Link href="/forgot-password">¿Olvidaste tu contraseña?</Link>
                ) : (
                  <>Al continuar, aceptas nuestros <Link href="/terms">Términos</Link> y <Link href="/privacy">Privacidad</Link></>
                )}
              </p>
            </form>
          </div>
        </div>
      </section>
    </main>
  )
}
