import type { CategorySlug } from "./categories";

/**
 * Colores asociativos de marca, usados solo como acento decorativo en los
 * mesh gradients de las miniaturas — no son los logos ni assets oficiales
 * de cada fabricante, son un color de referencia para dar variedad visual.
 */
export const VENDOR_COLORS: Record<string, string> = {
  VMware: "#5B2A86",
  Broadcom: "#CC092F",
  "Check Point": "#FF4438",
  Cisco: "#1BA0D7",
  "Cisco Nexus": "#1BA0D7",
  IBM: "#0F62FE",
  "IBM Power": "#0F62FE",
  Lenovo: "#E2231A",
  HPE: "#01A982",
  "Aruba (HPE)": "#FF8300",
  "Aruba ClearPass": "#FF8300",
  Microsoft: "#00A4EF",
  "Microsoft Azure": "#0078D4",
  "Active Directory": "#00A4EF",
  Oracle: "#F80000",
  F5: "#E4002B",
  Fortinet: "#EE3124",
  Synology: "#4A90D9",
  Nutanix: "#7C3AED",
  Veeam: "#00B336",
  Dell: "#007DB8",
  Radware: "#E30613",
  Quantum: "#0072CE",
  Arista: "#0068B4",
};

/**
 * Marcas que Core efectivamente vende/implementa (lista confirmada por el
 * cliente en ago 2026, no todo lo que tiene feed dedicado en data/sources.ts
 * es realmente una marca Core — ej. Cisco/Oracle/Nutanix tienen feed pero
 * NO son marcas Core). De HPE solo cuenta la línea Aruba, no HPE genérico.
 */
export const CORE_VENDOR_TAGS = new Set([
  "IBM",
  "IBM Power",
  "Lenovo",
  "VMware",
  "Broadcom",
  "Synology",
  "Radware",
  "Veeam",
  "Aruba (HPE)",
  "Aruba ClearPass",
  "Quantum",
  "Arista",
  "Check Point",
]);

export function isCoreVendorTag(tag: string): boolean {
  return CORE_VENDOR_TAGS.has(tag);
}

/** true si la noticia menciona explícitamente una marca que NO es de Core. */
export function hasOtherVendorTag(tags: string[]): boolean {
  return tags.some((t) => t in VENDOR_COLORS && !CORE_VENDOR_TAGS.has(t));
}

/** Cuando no hay tag de fabricante, se usa un par de colores por categoría. */
export const CATEGORY_FALLBACK_COLORS: Record<CategorySlug, [string, string]> = {
  ciberseguridad: ["#6B4AA0", "#E4453D"],
  "virtualizacion-cloud": ["#3C48AD", "#2B3EF0"],
  redes: ["#242E8C", "#5C68C9"],
  "storage-backup": ["#3C48AD", "#8590DE"],
  "servidores-hardware": ["#242E8C", "#AEB7EC"],
  fabricantes: ["#3C48AD", "#8590DE"],
};

/** Base más clara del azul Core, usada para no oscurecer de más las miniaturas. */
const MESH_BASE = "#3C48AD";

export function pickMeshColors(tags: string[], category: CategorySlug): [string, string, string] {
  const matches = tags.map((t) => VENDOR_COLORS[t]).filter(Boolean) as string[];
  if (matches.length >= 2) return [matches[0], matches[1], MESH_BASE];
  if (matches.length === 1) return [matches[0], MESH_BASE, "#5C68C9"];
  const [a, b] = CATEGORY_FALLBACK_COLORS[category];
  return [a, b, MESH_BASE];
}

/** Tags que corresponden a marcas/fabricantes que Core vende e implementa. */
export function getCoreVendorTags(tags: string[]): string[] {
  return tags.filter((t) => CORE_VENDOR_TAGS.has(t));
}
