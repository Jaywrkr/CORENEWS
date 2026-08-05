# CoreNews

App de noticias diarias para **Coresolutions**: recolecta, filtra y clasifica
automáticamente noticias de fabricantes y medios de ciberseguridad/infraestructura
relevantes para las tecnologías que Core implementa (VMware, Veeam, Check Point,
Aruba/HPE, Cisco, IBM, Lenovo, Oracle, F5, Fortinet, Microsoft/Active Directory,
Synology, Nutanix, entre otros — derivado del histórico real de proyectos de Core).

Diseño basado en la guía de marca `CORESOLUTIONS_BRANDING_2026`: navy `#01095C`,
tipografía IBM Plex (Sans/Serif/Mono), esquinas rectas, tarjetas planas con
bordes hairline, grilla de 8px, contenedor máx. 1280px.

## Arquitectura

```
data/sources.ts     → feeds RSS/Atom de fabricantes y medios de seguridad
data/keywords.ts     → taxonomía de palabras clave (derivada del CSV de proyectos de Core)
data/categories.ts   → categorías del sitio
scripts/fetch-news.ts→ recolecta, filtra, categoriza y escribe data/news.json
lib/getNews.ts        → lee las noticias en runtime (ver "Contenido vs. Deploy")
app/                  → páginas Next.js (home + /categoria/[slug])
```

### Cómo se decide qué noticia es "relevante para Core"

1. Cada feed de `data/sources.ts` tiene `strict: true/false`.
   - `strict: false` → feed dedicado de un fabricante que Core usa (ej. VMware
     Blog, Veeam Blog): todo lo que publican es relevante.
   - `strict: true` → feed genérico (Hacker News, BleepingComputer, CISA, etc.):
     solo se acepta un artículo si matchea alguna palabra clave de
     `data/keywords.ts` (nombres de fabricantes o tecnologías: firewall, NSX,
     vSAN, SD-WAN, ransomware, CVE, backup, Active Directory, etc.).
2. Cada keyword tiene una o más categorías asociadas; el artículo se clasifica
   en la categoría con mayor peso acumulado de keywords.
3. Artículos con más de 45 días se descartan. Se mantiene un máximo de 300.

## Contenido vs. Deploy (muy importante)

**El deploy en Vercel es 100% manual.** Nunca se dispara automáticamente por
un commit normal. Pero las noticias sí deben actualizarse todos los días sin
que eso implique un nuevo deploy. Por eso hay dos mecanismos separados:

1. **Actualización de contenido (automática, diaria):**
   `.github/workflows/fetch-news.yml` corre de lunes a viernes a las 06:00
   (Ecuador) vía GitHub Actions, ejecuta `npm run fetch:news` y hace commit de
   `data/news.json` directo a la rama. Este commit **no** incluye `[deploy]`
   en el mensaje.

2. **Lectura en runtime:** `lib/getNews.ts` no lee el JSON empaquetado en el
   build — hace `fetch()` al JSON crudo del repo (`NEWS_DATA_URL`, ver abajo)
   con revalidación de 1 hora (`next: { revalidate: 3600 }`). Así, el sitio ya
   desplegado se refresca solo cada hora con las noticias más nuevas, sin
   necesidad de ningún deploy nuevo. Si esa variable no está configurada o
   falla, cae al `data/news.json` local empaquetado en el último deploy.

3. **Protección contra auto-deploy de Vercel:** `vercel.json` define un
   `ignoreCommand` (`scripts/vercel-ignore-build.sh`) que **cancela el build**
   a menos que el mensaje del commit contenga la etiqueta `[deploy]`. Esto
   significa:
   - Push normal (código o el bot de noticias) → Vercel no construye nada.
   - Push con `[deploy]` en el mensaje del commit → Vercel construye y publica.
   - Botón **"Redeploy"** o **"Deploy"** desde el dashboard de Vercel → siempre
     funciona, sin importar el mensaje del commit (el ignoreCommand solo
     aplica a builds disparados por Git).

## Deploy manual — cómo publicar

- **Opción A (recomendada):** desde el dashboard de Vercel, botón **Deploy** /
  **Redeploy** sobre el último commit de la rama que quieras publicar.
- **Opción B:** hacer push a la rama conectada con `[deploy]` en el mensaje
  del commit, por ejemplo:
  ```
  git commit -m "feat: nuevo diseño de tarjetas [deploy]"
  ```
- **Opción C:** Vercel CLI: `vercel --prod` desde tu máquina.

## Configuración en Vercel

1. Importar el repo `jaywrkr/corenews`.
2. En **Project Settings → Environment Variables**, agregar:
   ```
   NEWS_DATA_URL = https://raw.githubusercontent.com/jaywrkr/corenews/<rama-de-produccion>/data/news.json
   ```
3. No es necesario tocar el toggle de auto-deploy de Git: el `ignoreCommand`
   ya se encarga de bloquear los builds automáticos.

## Desarrollo local

```bash
npm install
npm run fetch:news   # recolecta noticias reales en data/news.json
npm run dev           # http://localhost:3000
```

## Agregar/quitar fuentes o palabras clave

- Fuentes RSS: `data/sources.ts`
- Palabras clave y categorías asociadas: `data/keywords.ts`
- Categorías del sitio: `data/categories.ts`

No hace falta tocar el resto del código: el script de recolección y las
páginas leen estos archivos dinámicamente.
