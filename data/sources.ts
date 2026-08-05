import type { CategorySlug } from "./categories";

export interface Source {
  id: string;
  name: string;
  url: string;
  /** Categoría por defecto si no se detectan palabras clave más específicas */
  defaultCategory: CategorySlug;
  /**
   * true = feed genérico multi-tema (medios de seguridad, agregadores):
   * solo se aceptan artículos que matcheen alguna keyword relevante para Core.
   * false = feed dedicado de un fabricante/tecnología que Core usa: se acepta todo.
   */
  strict: boolean;
}

export const SOURCES: Source[] = [
  // Fabricantes — feeds dedicados, todo es relevante
  { id: "vmware-blog", name: "VMware Blog", url: "https://blogs.vmware.com/feed", defaultCategory: "virtualizacion-cloud", strict: false },
  { id: "veeam-blog", name: "Veeam Blog", url: "https://www.veeam.com/blog/feed", defaultCategory: "storage-backup", strict: false },
  { id: "cisco-blog", name: "Cisco Blog", url: "https://blogs.cisco.com/feed", defaultCategory: "redes", strict: false },
  { id: "checkpoint-research", name: "Check Point Research", url: "https://research.checkpoint.com/feed/", defaultCategory: "ciberseguridad", strict: false },
  { id: "ibm-blog", name: "IBM Blog", url: "https://www.ibm.com/blog/feed/", defaultCategory: "fabricantes", strict: true },
  { id: "aruba-blog", name: "Aruba Blog", url: "https://www.arubanetworks.com/blogs/feed/", defaultCategory: "redes", strict: false },
  { id: "lenovo-news", name: "Lenovo StoryHub", url: "https://news.lenovo.com/feed/", defaultCategory: "servidores-hardware", strict: false },
  { id: "microsoft-security", name: "Microsoft Security Blog", url: "https://www.microsoft.com/en-us/security/blog/feed/", defaultCategory: "ciberseguridad", strict: false },
  { id: "f5-labs", name: "F5 Labs", url: "https://www.f5.com/labs/rss-feeds/all.xml", defaultCategory: "redes", strict: false },
  { id: "fortinet-blog", name: "Fortinet Threat Research", url: "https://www.fortinet.com/blog/threat-research/rss.xml", defaultCategory: "ciberseguridad", strict: false },
  { id: "oracle-security", name: "Oracle Security Blog", url: "https://blogs.oracle.com/security/rss", defaultCategory: "ciberseguridad", strict: true },
  { id: "nutanix-blog", name: "Nutanix Blog", url: "https://www.nutanix.com/blog/feed", defaultCategory: "virtualizacion-cloud", strict: false },

  // Seguridad y tecnología general — feeds amplios, filtrados por keywords
  { id: "hacker-news", name: "The Hacker News", url: "https://feeds.feedburner.com/TheHackersNews", defaultCategory: "ciberseguridad", strict: true },
  { id: "bleeping-computer", name: "BleepingComputer", url: "https://www.bleepingcomputer.com/feed/", defaultCategory: "ciberseguridad", strict: true },
  { id: "dark-reading", name: "Dark Reading", url: "https://www.darkreading.com/rss.xml", defaultCategory: "ciberseguridad", strict: true },
  { id: "welivesecurity", name: "WeLiveSecurity (ESET)", url: "https://www.welivesecurity.com/en/rss/feed/", defaultCategory: "ciberseguridad", strict: true },
  { id: "cisa-advisories", name: "CISA Cybersecurity Advisories", url: "https://www.cisa.gov/cybersecurity-advisories/all.xml", defaultCategory: "ciberseguridad", strict: true },
  { id: "dcd", name: "Data Center Dynamics", url: "https://www.datacenterdynamics.com/en/rss/", defaultCategory: "servidores-hardware", strict: true },
  { id: "theregister-security", name: "The Register — Security", url: "https://www.theregister.com/security/headlines.atom", defaultCategory: "ciberseguridad", strict: true },
  { id: "sdxcentral", name: "SDxCentral", url: "https://www.sdxcentral.com/feed/", defaultCategory: "redes", strict: true },
];
