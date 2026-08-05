import { readFile } from "node:fs/promises";
import path from "node:path";
import type { NewsItem } from "@/scripts/fetch-news";
import type { CategorySlug } from "@/data/categories";

export interface NewsPayload {
  generatedAt: string;
  count: number;
  items: NewsItem[];
}

const LOCAL_PATH = path.join(process.cwd(), "data", "news.json");

/**
 * El sitio se despliega manualmente en Vercel, pero las noticias deben
 * actualizarse todos los días sin necesidad de un nuevo deploy. Por eso
 * el contenido se lee en tiempo de ejecución desde el JSON crudo del
 * repositorio (actualizado a diario por GitHub Actions) usando el cache
 * de datos de Next.js con revalidación horaria. Si esa lectura falla
 * (offline, primer deploy, etc.) se usa el archivo local empaquetado
 * como respaldo.
 */
export async function getNews(): Promise<NewsPayload> {
  const remoteUrl = process.env.NEWS_DATA_URL;

  if (remoteUrl) {
    try {
      const res = await fetch(remoteUrl, { next: { revalidate: 3600 } });
      if (res.ok) {
        return (await res.json()) as NewsPayload;
      }
    } catch {
      // sigue al respaldo local
    }
  }

  try {
    const raw = await readFile(LOCAL_PATH, "utf-8");
    return JSON.parse(raw) as NewsPayload;
  } catch {
    return { generatedAt: new Date().toISOString(), count: 0, items: [] };
  }
}

export function filterByCategory(items: NewsItem[], category: CategorySlug): NewsItem[] {
  return items.filter((i) => i.category === category);
}
