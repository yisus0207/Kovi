# Análisis de Ingeniería Inversa: Barberia.lat

Este documento detalla la arquitectura visual, técnica y funcional de `barberia.lat` para su replicación en la plataforma Aura (KOVI.ai).

## 1. Identidad Visual (Look & Feel)
La aplicación se siente "firme" porque utiliza un contraste extremo y una rejilla (grid) muy rígida.

### Paleta de Colores (Hex)
*   **Fondo Base**: `#0a0a0a` (Negro OLED/Puro). Es la clave para que los colores resalten sin verse "baratos".
*   **Superficies (Cards/Sidebar)**: `#111111` o `#141414`. Apenas un tono por encima del fondo para dar profundidad.
*   **Bordes**: `#262626`. Muy sutiles, definen las secciones sin ensuciar la vista.
*   **Acento Primario**: `#eab308` (Oro/Amarillo marca). Usado solo en elementos de acción e indicadores de estado activo.
*   **Textos**: 
    *   Primario: `#ffffff` (Blanco puro para títulos).
    *   Secundario: `#a3a3a3` (Gris para descripciones y metadatos).

### Tipografía
*   **Estilo**: Sans-serif moderna (Inter / Geist).
*   **Jerarquía**: 
    *   Labels: `text-xs` (muy pequeñas) y en gris.
    *   Valores: `font-bold` y en blanco.
    *   Títulos de sección: `font-semibold` con tracking (espaciado entre letras) reducido.

---

## 2. Estrategia de Adaptabilidad (Mobile-First)
El secreto de por qué se ve bien en móvil es que **no intenta comprimir la versión de escritorio**, sino que la transforma completamente.

### Transiciones Críticas
1.  **Sidebar -> Bottom Nav**: En pantallas menores a 768px, el menú lateral desaparece. En su lugar, aparece una barra fija en la parte inferior (`fixed bottom-0`).
    *   *Beneficio*: Ergonómico para el pulgar. Se siente como una App de iOS/Android.
2.  **Stacking de Cards**: Las estadísticas que en escritorio están en fila, en móvil se apilan con un `w-full` y un `gap` generoso.
3.  **Floating Action Button (FAB)**: Un botón circular dorado con un `+` flota en la esquina inferior derecha. Es la "Acción Principal" (ej: Agendar) que siempre está visible.
4.  **Header Minimalista**: El saludo se mantiene arriba pero se eliminan los textos largos, dejando solo el nombre y los iconos de utilidad.

---

## 3. Stack Tecnológico (Estimado)
*   **Framework**: Next.js (por la velocidad de transición entre páginas).
*   **Estilos**: Tailwind CSS (se nota por el uso de utilidades de espaciado y colores estándar).
*   **Iconos**: Lucide React o similar (iconos de trazo fino y consistente).
*   **Animaciones**: Framer Motion (se perciben transiciones suaves al abrir modales y cambiar de pestañas).

---

## 4. Funcionalidades Clave Observadas
*   **Bandeja de Entrada Inteligente**: Clasificación por etiquetas (Soporte, Venta) con colores sutiles.
*   **Indicadores de Estado**: Puntos verdes de "Online" muy definidos.
*   **Dashboard de Métricas**: Uso de números grandes para Citas, Ingresos y Conversiones.

---

## 5. Próximos Pasos para KOVI.ai
Para igualar este nivel de calidad, debemos:
1.  **Ajustar los negros**: Cambiar nuestros grises oscuros por el `#0a0a0a` real.
2.  **Implementar la Mobile Nav**: Crear el componente de barra inferior que ya diseñamos en el paso anterior.
3.  **Refinar bordes**: Usar el tono `#262626` para todas las divisiones del dashboard.
