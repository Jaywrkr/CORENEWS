# CoreNews — memoria del proyecto

App de noticias diarias para **Coresolutions**: recolecta, filtra y clasifica
automáticamente noticias de fabricantes y medios de ciberseguridad/infraestructura
relevantes para las tecnologías que Core implementa (derivado del histórico real
de proyectos de Core, no genérico). Next.js 15 (App Router) + Tailwind, desplegado
en Vercel de forma **manual**.

Para arquitectura y flujo de datos en detalle, ver `README.md`. Este archivo es
para que una sesión nueva de Claude Code retome el trabajo sin perder contexto.

## Estado actual (referencia rápida)

- **⚠️ Workflow de git:** Claude **solo hace `commit` + `push` a una rama de
  trabajo**. **Nunca**: mergear a `main`, abrir/gestionar PRs, incluir
  `[deploy]` en el commit, ni disparar/verificar un deploy en Vercel. Todo
  eso (PR, merge, deploy) lo hace el usuario a mano. Si el usuario pide un
  deploy explícitamente en el momento, ahí sí se puede usar `[deploy]` en un
  commit — pero por defecto, no.
- **Rama de trabajo actual**: `claude/ux-interface-alignment-nhirhz`. **Ojo**:
  el usuario mergea los PRs muy rápido (a veces en minutos) y GitHub borra la
  rama remota al mergear. Si al hacer `git push` el remoto ya no tiene la
  rama, o `git log origin/main..HEAD` no muestra tus commits como esperabas,
  probablemente ya se mergeó — reconstruí la rama desde `main` antes de
  seguir: `git fetch origin main --quiet && git checkout -B
  claude/ux-interface-alignment-nhirhz origin/main`, reaplicá cualquier
  cambio sin commitear (`git stash` antes / `git stash pop` después si hace
  falta) y seguí commiteando ahí. Pasó varias veces en la sesión de agosto
  2026 (PRs #2 a #8), no es un caso raro.
- **Repo**: `Jaywrkr/CORENEWS` en GitHub. Rama por defecto: `main`.
- **Vercel**: proyecto `corenews` (id `prj_UCu0vJDkSo4rBLS8vTonxBMUjIEE`, team
  `jaywrkr-1498's projects` / `team_wRgcLCRUOPA8bcpYIpvZZ042`). Dominio de
  producción: `corenews-tau.vercel.app` (centralizado en `lib/site.ts` como
  `SITE_URL` — usalo para cualquier link absoluto, no hardcodees el dominio).
- **Deploy 100% manual y con dos trampas conocidas** (nos comimos las dos
  más de una vez en agosto 2026, documentarlo para no repetir):
  1. `vercel.json` tiene un `ignoreCommand` que corre
     `scripts/vercel-ignore-build.sh` — cualquier push (a `main` o a una
     rama) se cancela salvo que el mensaje del commit incluya `[deploy]`.
     Esto es intencional (segunda capa de seguridad del workflow manual).
  2. Para publicar de verdad hay que ir a Vercel → Deployments → buscar la
     fila del commit de `main` que querés (puede estar oculta si el filtro
     "Status" no incluye "Canceled") → `⋯` → **Redeploy**, y en el diálogo:
     **Choose Environment → Production** (por defecto viene en **Preview**,
     fácil de pasar por alto) y **destildar "Use project's Ignore Build
     Step"** (si lo dejás tildado, corre el mismo script del punto 1 y te
     cancela el build de nuevo). Si el usuario dice "no se ve lo nuevo" o
     "ya hice deploy pero no cambia nada", lo primero a chequear es
     `mcp__Vercel__list_deployments` y comparar qué commit tiene
     `target: "production"` contra el último commit de `origin/main` — casi
     siempre el problema es uno de estos dos puntos, no el código.
  3. El footer del sitio (`components/Footer.tsx`) muestra `build <sha
     corto> · <fecha>` usando `VERCEL_GIT_COMMIT_SHA` — es la forma más
     rápida de confirmar visualmente qué commit está realmente en vivo.
- **`NEWS_DATA_URL` (pendiente, sin confirmar):** variable de entorno que le
  permite al sitio ya desplegado leer `data/news.json` en vivo desde GitHub
  (revalidate 1h, sin necesidad de redeploy) — **todavía no se confirmó que
  esté configurada** en Vercel. Sin ella, el sitio sirve el `news.json`
  empaquetado en el último deploy nada más. Para activarla: Project Settings
  → Environment Variables, agregar
  `NEWS_DATA_URL=https://raw.githubusercontent.com/Jaywrkr/CORENEWS/main/data/news.json`.
  Preguntarle al usuario si ya la configuró la primera vez que se retome
  el proyecto.
- **GitHub Action** (`.github/workflows/fetch-news.yml`): corre L-V 06:00
  hora Ecuador, ejecuta `npm run fetch:news` y commitea `data/news.json`
  directo a `main` si cambió (ya se vieron commits `chore(news): actualización
  automática de noticias` en `main`, así que está corriendo).
- **Digest por correo al equipo**: Routine `trig_01N7MdiQ1W93kibLmkcHmS6A`
  ("CoreNews — Resumen por correo (lun/mié)"), dispara **lunes y miércoles
  6:30am** hora Ecuador. Por diseño de la plataforma **no se pudo atar a una
  sesión separada** (la organización no permite bindear triggers a otra
  sesión ni pasar el conector de Gmail a una sesión nueva) — quedó atado a
  **esta misma sesión de Claude Code** (`persistent_session_id` fijo), así
  que cada lunes/miércoles va a aparecer una corrida del bot mezclada en
  esta conversación. Si en el futuro se puede separar (UI de Routines en
  claude.ai), es una mejora pendiente.
  - Solo crea **borrador** en Gmail (`jaywrkr@gmail.com`) — la integración
    de Gmail disponible no tiene capacidad de enviar, así que el envío
    siempre es manual.
  - Evita repetir noticias entre corridas usando `data/digest-state.json`
    en la raíz del repo (keys `título|fuente` ya incluidas). Si no hay
    noticias nuevas desde el último envío, no genera borrador ese día.
  - Destaca arriba del correo cualquier noticia nueva con `severity:
    "critica"`.
  - Destinatario: por ahora solo el dueño. El usuario dijo que más adelante
    pasa la lista de correos del equipo para sumarlos al "Para"/"CC" — **no
    inventar destinatarios**, esperar a que los pase explícitamente.
  - Revisar de vez en cuando que el trigger siga vivo
    (`mcp__Claude_Code_Remote__list_triggers`).
- **Contenido**: `data/news.json` arrancó con 20 noticias sembradas a mano
  (jun–ago 2026), y el GitHub Action las va reemplazando/sumando.

## Historial de decisiones de diseño (para no repetir vueltas)

El home pasó por varias iteraciones a lo largo de varias sesiones:

1. **v1** — tarjetas con borde + sombra al hover, hero navy con textura de
   grilla, pills con borde para tags, footer de 3 columnas.
2. **v2 (rechazada)** — rediseño 100% minimalista: filas de lista sin caja,
   sin color. El usuario pidió explícitamente volver atrás.
3. **v3** — vuelta a v1 pero recortando peso visual.
4. **v4** — tratamiento tipo blog de IBM: ícono + label de categoría arriba,
   miniatura en bloque de color plano (`CategoryThumb`, sin degradados por
   guía de marca), tags con pill suave.
5. **v5** — miniaturas pasan a **mesh gradients con grano** coloreados según
   la marca mencionada (`data/vendorColors.ts`), reemplazando los bloques
   planos. Excepción deliberada a la regla "sin degradados" de la guía de
   marca, pedida explícitamente por el usuario — no revertir sin que él lo
   pida. `CategoryThumb.tsx` ya no existe, reemplazado por
   `components/MeshThumb.tsx`.
6. **v6 (estado actual, agosto 2026)** — pasada grande de UX/mobile/social:
   - **Alineación**: tarjetas con footer (fuente/fecha/tags) anclado al
     fondo (`mt-auto`) para que todas queden a la misma altura en el grid;
     fila de categoría/severidad con `min-h` fijo para que el badge de
     severidad no desalinee la miniatura entre tarjetas de la misma fila.
   - **Tono editorial**: títulos de tarjeta en `font-serif` (igual que el
     drawer), sombra suave al hover en la miniatura en vez de solo opacidad,
     más aire en hero/header/grid.
   - **Azul de marca más claro**: base del mesh pasa de navy-950 (casi
     negro) a navy-500/600, con toda la paleta de fallback un escalón más
     clara — ver `data/vendorColors.ts`.
   - **Gradientes vivos**: el mesh de las miniaturas anima con `transform`
     (translate+scale sutil, `@keyframes mesh-drift` en `globals.css`, 20s,
     `will-change: transform`, delay determinístico por noticia para que no
     "respiren" en sincro). Respeta `prefers-reduced-motion`. Fue elegido
     explícitamente por el usuario de una lista de 5 ideas creativas (ver
     "Pendientes" abajo, las otras 4 quedaron sin construir).
   - **Marcas Core por noticia**: `getCoreVendorTags()` en
     `data/vendorColors.ts` separa los tags que son fabricantes que Core
     vende de los tags genéricos; se muestran con `VendorTag` (punto de
     color + nombre) en tarjeta, drawer y página de noticia, aparte de los
     tags normales.
   - **Mobile**: `Header` con menú hamburguesa (antes no había navegación
     mobile en absoluto), `CategoryTabs` y los chips de marca en
     `NewsExplorer` con scroll horizontal en vez de wrap, botón de cerrar
     del drawer a 44px de área táctil.
   - **Compartir con imagen brandeada**: cada noticia tiene su propia página
     (`app/noticia/[id]/page.tsx`) con imagen Open Graph generada
     dinámicamente (`app/noticia/[id]/opengraph-image.tsx`, vía `next/og`:
     mesh de marca + logo + categoría + severidad + titular). El home y las
     categorías comparten una imagen OG genérica (`app/opengraph-image.tsx`).
     `components/ShareBar.tsx` da botón de compartir nativo (Web Share API,
     fallback copiar link) + accesos directos a WhatsApp/X/LinkedIn.
   - **Favicon**: `app/icon.tsx` (32×32) y `app/apple-icon.tsx` (180×180),
     generados con `next/og`, mismo tratamiento que el logo del header
     (cuadro navy-950 + "C" blanca). Antes no había ninguno.
   - **Sello de versión**: `components/Footer.tsx` muestra `build <sha> ·
     <fecha>` usando `VERCEL_GIT_COMMIT_SHA` — ver nota de deploy arriba.

## Pendientes / ideas no implementadas

- Logo real de Coresolutions: nunca se recibió el archivo (SVG/PNG), solo
  el PDF de guía de marca. El wordmark del header/favicon es tipográfico.
  Si el usuario lo pasa, integrarlo en `components/Header.tsx` y los ícomos.
- Confirmar que `NEWS_DATA_URL` esté configurada en Vercel (ver arriba).
- **Ideas creativas propuestas y no elegidas todavía** (el usuario ya
  aprobó "gradientes vivos" de esta lista; las otras 4 siguen sobre la
  mesa si pregunta "cómo seguimos" de nuevo):
  1. **Modo Radar**: vista tipo heatmap-calendario (estilo GitHub
     contributions) coloreado por severidad del día.
  2. **Stories mobile**: briefing full-screen swipeable de las 5 noticias
     más críticas del día, pensado para leer en 30 segundos.
  3. **Página `/marcas`**: "trading cards" por fabricante — color, cantidad
     de menciones del mes, noticia más severa. Útil para el equipo
     comercial.
  4. **Command palette (`Cmd+K`)**: buscador global tipo Linear/Raycast.
- Cuando el usuario pase la lista de correos del equipo, sumarlos al
  destinatario del digest (Routine `trig_01N7MdiQ1W93kibLmkcHmS6A`) — hoy
  solo le llega a `jaywrkr@gmail.com`.
- Posible mejora futura ya conversada pero no pedida aún: atajo `/` para
  enfocar el buscador, filtros en la URL (`?vendor=`), estado de "ya leído"
  en `localStorage`.

## Comandos útiles

```bash
npm install
npm run dev            # desarrollo local, http://localhost:3000
npm run fetch:news     # corre el pipeline de recolección real
npm run build           # build de producción (usar antes de cualquier [deploy])
```

Antes de dar por buena una tarea de UI: correr `npm run build`, levantar
`npm run start -- -p 3100` y sacar screenshots con Playwright (browser
preinstalado en `/opt/pw-browsers/chromium-1194/chrome-linux/chrome`) para
verificar visualmente — no asumir que se ve bien solo porque compila. Si el
puerto 3100 da `EADDRINUSE` o el sitio tira "client-side exception" al
cargar, casi siempre es un proceso `next start` viejo que quedó colgado:
`fuser -k 3100/tcp` antes de levantar uno nuevo.

Al terminar un cambio: `git add` + `git commit` + `git push origin
<rama-de-trabajo-actual>` (ver arriba, y ojo con la rama borrada — sección
de workflow de git). **Ahí termina el trabajo de Claude.** No mergear a
`main`, no abrir PR, no tocar Vercel (salvo consultar `list_deployments`
para diagnosticar, eso sí está bien) — publicar lo hace el usuario.
