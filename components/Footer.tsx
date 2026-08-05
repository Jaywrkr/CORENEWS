const COMMIT = process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) ?? "local";
const BUILT_AT = new Date().toLocaleString("es-EC", { dateStyle: "short", timeStyle: "short" });

export function Footer() {
  return (
    <footer className="mt-10 border-t border-ink-200 bg-navy-950">
      <div className="container-content flex flex-col gap-02 py-06 text-xs text-ink-300 sm:flex-row sm:items-center sm:justify-between">
        <span className="text-sm font-semibold text-white">
          CORE<span className="font-normal text-ink-400">NEWS</span>
        </span>
        <span>Coresolutions · Uso interno · Contenido curado automáticamente</span>
        <span className="font-mono text-ink-400" title="Commit y hora de este build">
          build {COMMIT} · {BUILT_AT}
        </span>
      </div>
    </footer>
  );
}
