import Parser from "rss-parser";
import { writeFile, readFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { SOURCES } from "../data/sources";
import { matchKeywords } from "../data/keywords";
import { pickRelevance } from "../data/relevance";
import type { CategorySlug } from "../data/categories";

const OUT_PATH = path.join(process.cwd(), "data", "news.json");
const MAX_ITEMS = 300;
const MAX_AGE_DAYS = 45;
const FEED_TIMEOUT_MS = 15000;

export type Severity = "critica" | "alta" | "media";

export interface NewsItem {
  id: string;
  title: string;
  link: string;
  summary: string;
  source: string;
  sourceId: string;
  category: CategorySlug;
  tags: string[];
  severity?: Severity;
  relevance: string;
  publishedAt: string;
  fetchedAt: string;
}

const parser = new Parser({
  timeout: FEED_TIMEOUT_MS,
  headers: { "User-Agent": "CoreNewsBot/1.0 (+https://coresolutions.com.ec)" },
});

function stripHtml(input: string | undefined): string {
  if (!input) return "";
  return input
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function truncate(input: string, max = 220): string {
  if (input.length <= max) return input;
  return input.slice(0, max).replace(/\s+\S*$/, "") + "…";
}

function slugId(link: string): string {
  return Buffer.from(link).toString("base64url").slice(0, 24);
}

function detectSeverity(text: string): NewsItem["severity"] {
  const cvssMatch = text.match(/cvss[^0-9]{0,15}([0-9]{1,2}(?:\.[0-9])?)/i);
  if (cvssMatch) {
    const score = parseFloat(cvssMatch[1]);
    if (score >= 9) return "critica";
    if (score >= 7) return "alta";
    if (score >= 4) return "media";
  }
  const lower = text.toLowerCase();
  if (/(vulnerabilidad cr[ií]tica|critical vulnerability|zero-day|zero day|explotad[ao] activamente|actively exploited)/.test(lower)) {
    return "critica";
  }
  if (/(alta severidad|high severity|ransomware|rce\b|remote code execution)/.test(lower)) {
    return "alta";
  }
  if (/(vulnerabilidad|vulnerability|\bcve-)/.test(lower)) {
    return "media";
  }
  return undefined;
}

async function fetchFeed(source: (typeof SOURCES)[number]): Promise<NewsItem[]> {
  try {
    const feed = await parser.parseURL(source.url);
    const items: NewsItem[] = [];

    for (const entry of feed.items ?? []) {
      const title = entry.title?.trim();
      const link = entry.link?.trim();
      if (!title || !link) continue;

      const rawSummary = stripHtml(entry.contentSnippet || entry.content || entry.summary);
      const haystack = `${title} ${rawSummary}`;
      const matches = matchKeywords(haystack);

      if (source.strict && matches.length === 0) continue;

      const publishedAt = entry.isoDate || entry.pubDate || new Date().toISOString();
      const ageDays = (Date.now() - new Date(publishedAt).getTime()) / 86_400_000;
      if (Number.isFinite(ageDays) && ageDays > MAX_AGE_DAYS) continue;

      // Categoría: la más frecuente entre los matches, o la default del feed
      let category: CategorySlug = source.defaultCategory;
      if (matches.length > 0) {
        const counts = new Map<CategorySlug, number>();
        for (const m of matches) {
          for (const cat of m.categories) {
            counts.set(cat, (counts.get(cat) ?? 0) + m.weight);
          }
        }
        category = [...counts.entries()].sort((a, b) => b[1] - a[1])[0][0];
      }

      const tags = [...new Set(matches.map((m) => m.label))].slice(0, 5);
      const severity = category === "ciberseguridad" ? detectSeverity(haystack) : undefined;
      const relevance = pickRelevance(tags, category);

      items.push({
        id: slugId(link),
        title,
        link,
        summary: truncate(rawSummary || title),
        source: source.name,
        sourceId: source.id,
        category,
        tags,
        severity,
        relevance,
        publishedAt: new Date(publishedAt).toISOString(),
        fetchedAt: new Date().toISOString(),
      });
    }

    console.log(`✔ ${source.name}: ${items.length} artículos relevantes`);
    return items;
  } catch (err) {
    console.warn(`✘ ${source.name} (${source.url}) falló: ${(err as Error).message}`);
    return [];
  }
}

async function loadExisting(): Promise<NewsItem[]> {
  try {
    const raw = await readFile(OUT_PATH, "utf-8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed.items) ? parsed.items : [];
  } catch {
    return [];
  }
}

async function main() {
  console.log(`Recolectando noticias de ${SOURCES.length} fuentes…`);
  const results = await Promise.all(SOURCES.map(fetchFeed));
  const fresh = results.flat();
  const existing = await loadExisting();

  const byId = new Map<string, NewsItem>();
  for (const item of existing) byId.set(item.id, item);
  for (const item of fresh) byId.set(item.id, item); // fresh overrides existing

  const cutoff = Date.now() - MAX_AGE_DAYS * 86_400_000;
  const merged = [...byId.values()]
    .filter((i) => new Date(i.publishedAt).getTime() >= cutoff)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, MAX_ITEMS);

  await mkdir(path.dirname(OUT_PATH), { recursive: true });
  await writeFile(
    OUT_PATH,
    JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        count: merged.length,
        items: merged,
      },
      null,
      2
    )
  );

  console.log(`\nListo. ${merged.length} artículos guardados en data/news.json`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
