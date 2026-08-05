# CoreNews — memoria del proyecto

App de noticias diarias para **Coresolutions**: recolecta, filtra y clasifica
automáticamente noticias de fabricantes y medios de ciberseguridad/infraestructura
relevantes para las tecnologías que Core implementa (derivado del histórico real
de proyectos de Core, no genérico). Next.js 15 (App Router) + Tailwind, desplegado
en Vercel de forma **manual**.

Para arquitectura y flujo de datos en detalle, ver `README.md`. Este archivo es
para que una sesión nueva de Claude Code retome el trabajo sin perder contexto.

## Estado actual (referencia rápida)

- **⚠️ Workflow de git — cambió (instrucción directa del usuario, agosto
  2026):** Claude **solo hace `commit` + `push` a la rama de trabajo**
  (`claude/coresolutions-news-app-2z6fub`). **Nunca**:
  - mergear a `main` (antes se hacía fast-forward automático — ya no),
  - abrir ni gestionar PRs,
  - incluir `[deploy]` en el mensaje del commit,
  - ni disparar/verificar un deploy en Vercel.
  El usuario dijo explícitamente: *"quiero que de ahora en adelante solo
  hagas commit en esto... que el deploy no se haga... que tanto pr, merge
  y deploy hago yo mismo."* Todo eso (PR, merge a main, deploy) lo hace él
  a mano. Si el usuario pide un deploy explícitamente en el momento, ahí sí
  se puede usar `[deploy]` — pero por defecto, no.
- **Repo**: `Jaywrkr/CORENEWS` en GitHub. Rama por defecto: `main`. Rama de
  desarrollo activa: `claude/coresolutions-news-app-2z6fub` (acá se
  commitea siempre; `main` la actualiza el usuario, no Claude).
- **Vercel**: proyecto `corenews` (id `prj_UCu0vJDkSo4rBLS8vTonxBMUjIEE`, team
  `jaywrkr-1498's projects` / `team_wRgcLCRUOPA8bcpYIpvZZ042`). Dominio de
  producción: `corenews-tau.vercel.app`. Conectado por Git al repo de arriba.
- **Deploy 100% manual**: `vercel.json` tiene un `ignoreCommand` que corre
  `scripts/vercel-ignore-build.sh` — solo construye si el mensaje del commit
  incluye `[deploy]`. Con el nuevo workflow esto es casi redundante (Claude
  ya no mergea a `main` ni deploya), pero se deja como segunda capa de
  seguridad. Los commits automáticos del bot de noticias (GitHub Action)
  tampoco lo incluyen.
- **`NEWS_DATA_URL` (pendiente):** la variable de entorno que le permite al
  sitio ya desplegado leer `data/news.json` en vivo desde GitHub (revalidate
  1h, sin necesidad de redeploy) **todavía no está configurada** en Vercel.
  Hoy el sitio sirve el `data/news.json` que quedó empaquetado en el último
  deploy. Para activarlo: Project Settings → Environment Variables en Vercel,
  agregar `NEWS_DATA_URL=https://raw.githubusercontent.com/Jaywrkr/CORENEWS/main/data/news.json`.
- **GitHub Action** (`.github/workflows/fetch-news.yml`): corre L-V 06:00
  hora Ecuador (11:00 UTC), ejecuta `npm run fetch:news` y commitea
  `data/news.json` si cambió. **Todavía no se ha confirmado que corra sin
  errores en producción** — el sandbox de desarrollo tiene el egress
  bloqueado para casi todos los feeds RSS, así que solo se pudo probar
  parcialmente en local. Primera vez que se revise esta sesión: chequear
  las corridas en la pestaña Actions del repo.
- **Digest diario por correo**: Routine (`trig_01H7dG9x4DGa8N42Rsei9jan`,
  nombre "CoreNews — Resumen diario por correo") que dispara L-V 06:30
  Ecuador (11:30 UTC) dentro de esta misma sesión de Claude Code. Arma un
  resumen HTML de las noticias más recientes/severas y crea un **borrador**
  en Gmail (`jaywrkr@gmail.com`) — nunca lo envía solo. Revisar de vez en
  cuando que el trigger siga vivo (`mcp__Claude_Code_Remote__list_triggers`).
- **Contenido**: `data/news.json` tiene 20 noticias reales sembradas a mano
  (jun–ago 2026, vía búsqueda web) como contenido inicial, con `relevance`
  y `severity` curados. La recolección automática vía RSS (`scripts/fetch-news.ts`)
  las irá reemplazando/sumando con el tiempo si el GitHub Action corre bien.

## Historial de decisiones de diseño (para no repetir vueltas)

El home pasó por varias iteraciones en la misma sesión de trabajo:

1. **v1** — tarjetas con borde + sombra al hover, hero navy con textura de
   grilla, pills con borde para tags, footer de 3 columnas.
2. **v2 (rechazada)** — rediseño 100% minimalista: filas de lista sin caja,
   sin color, header/footer de una línea. El usuario pidió explícitamente
   volver atrás: *"no no... vuelve al ui anterior... sobre este con ese
   estilo, vuelvelo mas simple"*.
3. **v3** — vuelta a v1 pero recortando peso: sin sombra hover, sin barra
   superior redundante, sin fila de tags en las tarjetas, footer de una línea.
4. **v4** — el usuario mostró el blog de IBM como referencia (ícono + label
   de categoría arriba, miniatura gráfica, tags con pill de color suave) y
   pidió inspirarse ahí. Se agregó `CategoryThumb` (bloque de color plano +
   ícono de línea grande, **sin degradados** porque la guía de marca de
   Coresolutions lo prohíbe explícitamente) y se quitó el banner navy.
5. **v5 (estado actual)** — el usuario pidió más aire en el encabezado del
   home (se sentía apretado) **y** reemplazar los íconos/colores planos de
   las miniaturas por **mesh gradients con grano**, coloreados según la
   marca mencionada en cada noticia (VMware, Check Point, IBM, etc. — ver
   `data/vendorColors.ts`), sin íconos ni texto dentro. Esto es una
   excepción deliberada a la regla "sin degradados" de la guía de marca,
   pedida explícitamente por el usuario — no revertir a bloques planos sin
   que él lo pida.

`CategoryThumb.tsx` (bloques planos con ícono) **ya no existe** — fue
reemplazado por `components/MeshThumb.tsx`. Los íconos de `components/icons.tsx`
se siguen usando, pero solo chiquitos junto al label de categoría (kicker),
no como gráfico central de la miniatura.

## Pendientes / ideas no implementadas

- Logo real de Coresolutions: nunca se recibió el archivo (SVG/PNG), solo
  el PDF de guía de marca. El wordmark del header es tipográfico. Si el
  usuario lo pasa, integrarlo en `components/Header.tsx`.
- Verificar que `NEWS_DATA_URL` se configure en Vercel (ver arriba).
- Verificar que el GitHub Action de recolección corra sin errores al menos
  una vez en producción y revisar `data/news.json` resultante.
- Posible mejora futura ya conversada pero no pedida aún: buscador con
  resultados resaltados, paginación si `data/news.json` crece mucho,
  analítica de qué noticias se leen más.

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
verificar visualmente — no asumir que se ve bien solo porque compila.

Al terminar un cambio: `git add` + `git commit` + `git push origin
claude/coresolutions-news-app-2z6fub`. **Ahí termina el trabajo de Claude.**
No mergear a `main`, no abrir PR, no tocar Vercel — eso lo hace el usuario.
