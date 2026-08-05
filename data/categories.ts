export type CategorySlug =
  | "ciberseguridad"
  | "virtualizacion-cloud"
  | "redes"
  | "storage-backup"
  | "servidores-hardware"
  | "fabricantes";

export type IconName = "shield" | "cloud" | "network" | "database" | "server" | "building";
export type ThumbVariant = "navy" | "accent" | "ink" | "light" | "navy-light" | "ink-light";

export interface Category {
  slug: CategorySlug;
  label: string;
  short: string;
  description: string;
  icon: IconName;
  thumb: ThumbVariant;
}

export const CATEGORIES: Category[] = [
  {
    slug: "ciberseguridad",
    label: "Ciberseguridad",
    short: "Seguridad",
    description:
      "Vulnerabilidades, CVEs, ransomware y protección de datos sobre las plataformas que Core asegura.",
    icon: "shield",
    thumb: "navy",
  },
  {
    slug: "virtualizacion-cloud",
    label: "Virtualización & Nube",
    short: "Cloud",
    description: "VMware, NSX, vSAN, HCI y servicios en la nube.",
    icon: "cloud",
    thumb: "accent",
  },
  {
    slug: "redes",
    label: "Redes",
    short: "Redes",
    description: "Firewalls, SD-WAN, switching y conectividad empresarial.",
    icon: "network",
    thumb: "ink",
  },
  {
    slug: "storage-backup",
    label: "Storage & Backup",
    short: "Storage",
    description: "Almacenamiento, respaldos y continuidad operativa.",
    icon: "database",
    thumb: "light",
  },
  {
    slug: "servidores-hardware",
    label: "Servidores & Hardware",
    short: "Hardware",
    description: "Servidores, procesadores y equipos de datacenter.",
    icon: "server",
    thumb: "navy-light",
  },
  {
    slug: "fabricantes",
    label: "Fabricantes",
    short: "Marcas",
    description: "Anuncios oficiales de los fabricantes con los que Core trabaja.",
    icon: "building",
    thumb: "ink-light",
  },
];

export function getCategory(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}
