import type { Metadata } from "next";
import "./globals.css";
import ScrollObserver from "@/components/utils/ScrollObserver";

export const metadata: Metadata = {
  title: "KOVI.ai — Aura, asistente de IA en WhatsApp 24/7",
  description: "Aura es la asistente de IA de tu negocio en WhatsApp. Agenda citas, responde consultas 24/7 y fideliza clientes automáticamente.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-CO" suppressHydrationWarning>
      <head>
        {/* Bypassing Turbopack next/font bug with standard links for milimetric fidelity */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&family=Shippori+Mincho+B1:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        <script dangerouslySetInnerHTML={{ __html: `document.documentElement.classList.add('js-ready')` }} />
      </head>
      <body className="body" suppressHydrationWarning>
        {children}
        <ScrollObserver />
      </body>
    </html>
  );
}
