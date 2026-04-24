import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "barberia.lat — Luna, recepcionista IA en WhatsApp 24/7",
  description: "Luna es la recepcionista IA de tu barbería en WhatsApp. Agenda citas, responde 24/7 y fideliza clientes mientras tú cortas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-CO">
      <head>
        {/* Bypassing Turbopack next/font bug with standard links for milimetric fidelity */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&family=Shippori+Mincho+B1:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="body">
        {children}
        <script dangerouslySetInnerHTML={{ __html: `
          const observerOptions = {
            threshold: 0.05,
            rootMargin: '0px 0px -50px 0px'
          };

          const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
              if (entry.isIntersecting) {
                // Pequeño delay escalonado para elementos que entran juntos
                setTimeout(() => {
                  entry.target.classList.add('visible');
                }, 50);
                observer.unobserve(entry.target);
              }
            });
          }, observerOptions);

          const observeElements = () => {
            document.querySelectorAll('.fade-up:not(.visible)').forEach(el => observer.observe(el));
          };

          observeElements();
          
          // Re-observe periodically or on dynamic changes
          const mutationObserver = new MutationObserver((mutations) => {
            let shouldUpdate = false;
            mutations.forEach(mutation => {
              if (mutation.addedNodes.length) shouldUpdate = true;
            });
            if (shouldUpdate) observeElements();
          });
          mutationObserver.observe(document.body, { childList: true, subtree: true });
        ` }} />
      </body>
    </html>
  );
}
