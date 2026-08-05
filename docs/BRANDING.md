# Guía de marca de Coresolutions — resumen para desarrollo

Extraído de `CORESOLUTIONS_BRANDING_2026.pdf` (guía de marca v1.0, uso interno),
que el usuario compartió una sola vez al inicio del proyecto y **no está en
este repo**. Si hace falta un detalle que no está acá, pedirle el PDF de
nuevo — no inventar valores.

## Color

- **Navy `#01095C`** es el ancla de marca (Tailwind: `navy-950` en
  `tailwind.config.ts`).
- Ramp de azul y de gris definidos, grises **fríos, nunca cálidos**.
- Estados semánticos: éxito verde `var(--green-60)`, advertencia amarillo
  `var(--yellow-30)`, error rojo `var(--red-60)` → mapeados a `success`,
  `warning`, `danger` en el theme de Tailwind.
- Regla explícita del PDF: **"sin degradados como relleno"** para los
  grises/paleta de marca. **Excepción deliberada y pedida por el usuario**:
  las miniaturas de noticias (`components/MeshThumb.tsx`) sí usan mesh
  gradients con colores asociados a cada fabricante — fue una decisión de
  diseño explícita, no un error, no revertir sin que el usuario lo pida.

## Tipografía — IBM Plex

- **Plex Sans**: UI y marketing (texto general).
- **Plex Serif**: uso editorial (títulos de artículos, headlines).
- **Plex Mono**: datos, IDs, métricas (kickers, fechas, badges técnicos).
- Escala: Display 1 72px/600, H1 32px/600, H2 26px/600, H3 20px/600,
  Body 16px/400, Caption 12px/400.
- Los valores técnicos (SLAs, disponibilidad, IDs de incidentes) siempre en
  monospace, ej. `99.97%`, `sa-east-1`, `INC-2039`.

## Espaciado y layout

- Sistema de 8px: `space-02` (4px) hasta `space-10` (64px).
- Contenedor máximo de contenido: **1280px**, con márgenes que crecen desde
  24px en compacto.
- Preferir divisores de 1px entre columnas en vez de sombras con gutters
  amplios.
- Elevación: sombras bajas y frías con matiz azul-negro, **solo en hover**
  de tarjetas y overlays — no por defecto.
- Esquinas: **rectas por defecto (`radius: 0`)**. Radio de 2px solo en tags
  y avatares; píldora (`radius: full`) reservada para esos mismos casos.
  (`tailwind.config.ts` → `borderRadius.pill`).

## Voz y tono

- Español latinoamericano, formal, se dirige de "usted".
- Confiado, preciso, orientado a resultados. Respalda afirmaciones con
  cifras concretas (SLA, uptime, disponibilidad). **Nunca hipérbole, nunca
  signos de exclamación.**
- Vocabulario clave: infraestructura, ciberseguridad, nube, servicios
  gestionados, disponibilidad, SLA, protección de datos, continuidad
  operativa.
- Ejemplo del PDF: *"Diseñamos, implementamos y damos soporte a su
  infraestructura, con disponibilidad de 99.97%."*

## Componentes base (del PDF)

- Botón primario: navy sólido, esquinas rectas (`btn-primary` en
  `app/globals.css`).
- Tarjeta plana, borde hairline, sin sombra en reposo (`hairline` /
  tratamiento de `NewsCard`).
- Tags/estado: píldora, borde sutil, texto pequeño en mayúsculas o
  monospace según el caso.
