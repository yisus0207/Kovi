"use client"

import { useState } from 'react'
import Link from 'next/link'
import styles from './register.module.css'

export default function RegisterPage() {
  const [isLogin, setIsLogin] = useState(false)

  return (
    <main className={styles.container}>
      {/* Left Side: Value Prop & Testimonial */}
      <section className={styles.brandingSide}>
        <div className={styles.brandingContent}>
          <Link href="/" className={styles.logo}>
            KOVI<span>.ai</span>
          </Link>
          
          <div className={styles.valueProp}>
            <h1 className={styles.title}>
              Tu negocio,<br/>
              <span>automatizado</span>
            </h1>
            <p className={styles.description}>
              Aura atiende WhatsApp, agenda citas y fideliza clientes — mientras tú trabajas en lo que importa.
            </p>

            <ul className={styles.featureList}>
              <li>
                <div className={styles.icon}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z"/><path d="M12 6v6l4 2"/></svg>
                </div>
                <span>Aura responde WhatsApp 24/7 y agenda citas automáticamente</span>
              </li>
              <li>
                <div className={styles.icon}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                </div>
                <span>Dashboard con citas, conversaciones y programa de lealtad</span>
              </li>
              <li>
                <div className={styles.icon}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                </div>
                <span>Página pública de reservas lista en minutos</span>
              </li>
            </ul>

            <div className={styles.testimonial}>
              <p>"Mis clientes reservan solos mientras yo trabajo. Aura no falla."</p>
              <div className={styles.testimonialAuthor}>
                <div className={styles.avatar}>AM</div>
                <div>
                  <strong>Alejandro Medina</strong>
                  <span>Dueño de Negocio</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Right Side: Form */}
      <section className={styles.formSide}>
        <div className={styles.formWrapper}>
          {/* Tabs Selector */}
          <div className={styles.tabsContainer}>
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
          </div>

          <div className={styles.formContent}>
            <header className={styles.formHeader}>
              <h2>{isLogin ? 'Inicia sesión' : 'Crea tu cuenta'}</h2>
              <p>{isLogin ? 'Gestiona tu negocio' : 'Empieza en minutos, sin tarjeta de crédito'}</p>
            </header>

            <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
              {!isLogin && (
                <>
                  <div className={styles.inputGroup}>
                    <label>Tu nombre</label>
                    <input type="text" placeholder="Ej. Juan García" required />
                  </div>
                  <div className={styles.inputGroup}>
                    <label>Nombre de tu negocio</label>
                    <input type="text" placeholder="Ej. Barbería El Clásico" required />
                  </div>
                  <div className={styles.inputGroup}>
                    <label>Teléfono de contacto</label>
                    <div className={styles.phoneInput}>
                      <select defaultValue="co">
                        <option value="co">co +57</option>
                        <option value="mx">mx +52</option>
                      </select>
                      <input type="tel" placeholder="300 000 0000" required />
                    </div>
                  </div>
                </>
              )}

              <div className={styles.inputGroup}>
                <label>Email</label>
                <input type="email" placeholder="tu@email.com" required />
              </div>

              <div className={styles.inputGroup}>
                <label>Contraseña</label>
                <input type="password" placeholder="••••••••" required />
              </div>

              <button type="submit" className={styles.submitBtn}>
                {isLogin ? 'Acceder ahora' : 'Crear cuenta gratis'}
              </button>

              {!isLogin && (
                <div className={styles.trustIcons}>
                  <span>✓ Sin tarjeta</span>
                  <span>✓ Setup guiado</span>
                  <span>✓ Cancela cuando quieras</span>
                </div>
              )}

              {isLogin && (
                <p className={styles.forgotPass}>
                  <Link href="/forgot-password">¿Olvidaste tu contraseña?</Link>
                </p>
              )}
            </form>
          </div>
        </div>
      </section>
    </main>
  )
}
