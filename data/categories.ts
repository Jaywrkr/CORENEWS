export type CategorySlug =
  | "ciberseguridad"
  | "virtualizacion-cloud"
  | "redes"
  | "storage-backup"
  | "servidores-hardware"
  | "fabricantes";

export interface Category {
  slug: CategorySlug;
  label: string;
  short: string;
  description: string;
}

export const CATEGORIES: Category[] = [
  {
    slug: "ciberseguridad",
    label: "Ciberseguridad",
    short: "Seguridad",
    description:
      "Vulnerabilidades, CVEs, ransomware y protección de datos sobre las plataformas que Core asegura.",
  },
  {
    slug: "virtualizacion-cloud",
    label: "Virtualización & Nube",
    short: "Cloud",
    description: "VMware, NSX, vSAN, HCI y servicios en la nube.",
  },
  {
    slug: "redes",
    label: "Redes",
    short: "Redes",
    description: "Firewalls, SD-WAN, switching y conectividad empresarial.",
  },
  {
    slug: "storage-backup",
    label: "Storage & Backup",
    short: "Storage",
    description: "Almacenamiento, respaldos y continuidad operativa.",
  },
  {
    slug: "servidores-hardware",
    label: "Servidores & Hardware",
    short: "Hardware",
    description: "Servidores, procesadores y equipos de datacenter.",
  },
  {
    slug: "fabricantes",
    label: "Fabricantes",
    short: "Marcas",
    description: "Anuncios oficiales de los fabricantes con los que Core trabaja.",
  },
];

export function getCategory(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}
