# Pendientes de CoreNews

Checklist rápido para retomar. Ver `CLAUDE.md` para contexto completo de
arquitectura y decisiones ya tomadas — esto es solo la lista accionable.

## Bloqueantes / por verificar

- [ ] Configurar `NEWS_DATA_URL` en Vercel (Project Settings → Environment
      Variables) apuntando a
      `https://raw.githubusercontent.com/Jaywrkr/CORENEWS/main/data/news.json`.
      Sin esto, el sitio solo muestra el `data/news.json` empaquetado en el
      último deploy, no se refresca solo.
- [ ] Confirmar que `.github/workflows/fetch-news.yml` corrió al menos una
      vez sin errores (pestaña Actions del repo en GitHub). Revisar el
      `data/news.json` resultante — validar que las noticias nuevas tengan
      `relevance` y `severity` razonables (las genera `pickRelevance` /
      `detectSeverity` en `scripts/fetch-news.ts`, son heurísticas, no
      perfectas).
- [ ] Confirmar que la Routine del digest por correo
      (`trig_01H7dG9x4DGa8N42Rsei9jan`) sigue activa y que los borradores
      que arma en Gmail se ven bien (asunto, agrupación, links).

## Pendientes de contenido/diseño

- [ ] Logo real de Coresolutions (SVG o PNG) — no se recibió. El header usa
      un wordmark tipográfico. Pedírselo al usuario si lo menciona.
- [ ] Si el usuario pide ajustes de diseño, **leer primero el historial de
      decisiones en `CLAUDE.md`** — ya hubo varias vueltas (minimalista →
      vuelta atrás → estilo IBM → mesh gradients) y no hay que repetirlas
      sin que él las pida de nuevo.

## Ideas mencionadas pero no pedidas todavía

No implementar sin que el usuario las pida explícitamente:

- Buscador con texto resaltado en los resultados.
- Paginación o "cargar más" si `data/news.json` crece mucho (hoy cachea
  hasta 300 items, poda a 45 días).
- Analítica de qué noticias/categorías se leen más.
- Enviar el digest por correo automáticamente en vez de solo dejarlo como
  borrador (hoy es intencional que sea manual — el usuario quiere control
  antes de que salga nada a su equipo).
