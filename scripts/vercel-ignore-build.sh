#!/bin/bash
# Vercel "Ignored Build Step": por defecto NO se despliega en cada push.
# Solo se construye si el mensaje del commit incluye la etiqueta "[deploy]".
# Esto deja que GitHub Actions siga actualizando data/news.json a diario
# sin disparar un build/deploy, y te da control manual total sobre cuándo
# se publica una nueva versión del sitio.
#
# Para publicar: incluye "[deploy]" en tu mensaje de commit, o usa el botón
# "Redeploy" / "Deploy" en el dashboard de Vercel (eso siempre funciona,
# sin importar este script).

if [[ "$VERCEL_GIT_COMMIT_MESSAGE" == *"[deploy]"* ]]; then
  echo "Commit marcado con [deploy] — procediendo con el build."
  exit 1
fi

echo "Deploy manual únicamente. Agrega [deploy] al mensaje del commit para publicar, o despliega desde el dashboard de Vercel."
exit 0
