import type { CategorySlug } from "./categories";

export interface KeywordDef {
  term: string;
  label: string;
  weight: number;
  categories: CategorySlug[];
  vendor?: boolean;
}

/**
 * Derivado del histórico de proyectos de Coresolutions (Proyectos_Planificacion.csv):
 * fabricantes y tecnologías que Core implementa activamente en campo.
 * Cualquier término aquí es señal de que una noticia le importa a Core.
 */
export const KEYWORDS: KeywordDef[] = [
  // Fabricantes — señal fuerte
  { term: "ibm", label: "IBM", weight: 3, categories: ["fabricantes", "servidores-hardware"], vendor: true },
  { term: "power9", label: "IBM Power", weight: 3, categories: ["servidores-hardware"], vendor: true },
  { term: "power10", label: "IBM Power", weight: 3, categories: ["servidores-hardware"], vendor: true },
  { term: "lenovo", label: "Lenovo", weight: 3, categories: ["fabricantes", "servidores-hardware"], vendor: true },
  { term: "vmware", label: "VMware", weight: 3, categories: ["fabricantes", "virtualizacion-cloud"], vendor: true },
  { term: "broadcom", label: "Broadcom", weight: 3, categories: ["fabricantes", "virtualizacion-cloud"], vendor: true },
  { term: "check point", label: "Check Point", weight: 3, categories: ["fabricantes", "ciberseguridad", "redes"], vendor: true },
  { term: "checkpoint", label: "Check Point", weight: 3, categories: ["fabricantes", "ciberseguridad", "redes"], vendor: true },
  { term: "sandblast", label: "Check Point", weight: 3, categories: ["ciberseguridad"], vendor: true },
  { term: "synology", label: "Synology", weight: 3, categories: ["fabricantes", "storage-backup"], vendor: true },
  { term: "hpe", label: "HPE", weight: 3, categories: ["fabricantes", "servidores-hardware"], vendor: true },
  { term: "hewlett packard enterprise", label: "HPE", weight: 3, categories: ["fabricantes", "servidores-hardware"], vendor: true },
  { term: "aruba", label: "Aruba (HPE)", weight: 3, categories: ["fabricantes", "redes"], vendor: true },
  { term: "clearpass", label: "Aruba ClearPass", weight: 3, categories: ["redes", "ciberseguridad"], vendor: true },
  { term: "veeam", label: "Veeam", weight: 3, categories: ["fabricantes", "storage-backup"], vendor: true },
  { term: "microsoft", label: "Microsoft", weight: 2, categories: ["fabricantes"], vendor: true },
  { term: "azure", label: "Microsoft Azure", weight: 2, categories: ["virtualizacion-cloud"], vendor: true },
  { term: "active directory", label: "Active Directory", weight: 3, categories: ["ciberseguridad", "redes"], vendor: true },
  { term: "windows server", label: "Windows Server", weight: 2, categories: ["servidores-hardware"], vendor: true },
  { term: "cisco", label: "Cisco", weight: 3, categories: ["fabricantes", "redes"], vendor: true },
  { term: "nexus", label: "Cisco Nexus", weight: 2, categories: ["redes"], vendor: true },
  { term: "oracle", label: "Oracle", weight: 3, categories: ["fabricantes", "servidores-hardware"], vendor: true },
  { term: "f5", label: "F5", weight: 3, categories: ["fabricantes", "redes"], vendor: true },
  { term: "fortinet", label: "Fortinet", weight: 3, categories: ["fabricantes", "redes", "ciberseguridad"], vendor: true },
  { term: "dell", label: "Dell", weight: 2, categories: ["fabricantes", "servidores-hardware"], vendor: true },
  { term: "nutanix", label: "Nutanix", weight: 3, categories: ["fabricantes", "virtualizacion-cloud"], vendor: true },

  // Tecnologías / disciplinas — señal media
  { term: "firewall", label: "Firewall", weight: 2, categories: ["redes", "ciberseguridad"] },
  { term: "sd-wan", label: "SD-WAN", weight: 2, categories: ["redes"] },
  { term: "sdwan", label: "SD-WAN", weight: 2, categories: ["redes"] },
  { term: "nsx", label: "NSX", weight: 2, categories: ["virtualizacion-cloud"] },
  { term: "vsan", label: "vSAN", weight: 2, categories: ["virtualizacion-cloud", "storage-backup"] },
  { term: "vsphere", label: "vSphere", weight: 2, categories: ["virtualizacion-cloud"] },
  { term: "hiperconverg", label: "HCI", weight: 2, categories: ["virtualizacion-cloud", "servidores-hardware"] },
  { term: "hyperconverg", label: "HCI", weight: 2, categories: ["virtualizacion-cloud", "servidores-hardware"] },
  { term: " hci", label: "HCI", weight: 1, categories: ["virtualizacion-cloud"] },
  { term: "storage", label: "Storage", weight: 2, categories: ["storage-backup"] },
  { term: "almacenamiento", label: "Storage", weight: 2, categories: ["storage-backup"] },
  { term: "backup", label: "Backup", weight: 2, categories: ["storage-backup"] },
  { term: "respaldo", label: "Backup", weight: 2, categories: ["storage-backup"] },
  { term: "disaster recovery", label: "Disaster Recovery", weight: 2, categories: ["storage-backup"] },
  { term: "continuidad operativa", label: "Continuidad Operativa", weight: 2, categories: ["storage-backup"] },
  { term: "nas", label: "NAS", weight: 1, categories: ["storage-backup"] },
  { term: "datacenter", label: "Datacenter", weight: 1, categories: ["servidores-hardware"] },
  { term: "centro de datos", label: "Datacenter", weight: 1, categories: ["servidores-hardware"] },
  { term: "servidor", label: "Servidores", weight: 1, categories: ["servidores-hardware"] },
  { term: "server", label: "Servidores", weight: 1, categories: ["servidores-hardware"] },
  { term: "virtualiz", label: "Virtualización", weight: 1, categories: ["virtualizacion-cloud"] },
  { term: "hypervisor", label: "Virtualización", weight: 2, categories: ["virtualizacion-cloud"] },
  { term: "vdi", label: "VDI", weight: 2, categories: ["virtualizacion-cloud"] },
  { term: "iaas", label: "IaaS", weight: 2, categories: ["virtualizacion-cloud"] },
  { term: "nube híbrida", label: "Nube Híbrida", weight: 1, categories: ["virtualizacion-cloud"] },
  { term: "hybrid cloud", label: "Nube Híbrida", weight: 1, categories: ["virtualizacion-cloud"] },
  { term: "switch", label: "Switching", weight: 1, categories: ["redes"] },
  { term: "wifi", label: "Redes Wi-Fi", weight: 1, categories: ["redes"] },
  { term: "wi-fi", label: "Redes Wi-Fi", weight: 1, categories: ["redes"] },

  // Seguridad — señal media/alta
  { term: "ransomware", label: "Ransomware", weight: 2, categories: ["ciberseguridad"] },
  { term: "vulnerabilidad", label: "Vulnerabilidad", weight: 2, categories: ["ciberseguridad"] },
  { term: "vulnerability", label: "Vulnerabilidad", weight: 2, categories: ["ciberseguridad"] },
  { term: "cve-", label: "CVE", weight: 2, categories: ["ciberseguridad"] },
  { term: "zero-day", label: "Zero-Day", weight: 2, categories: ["ciberseguridad"] },
  { term: "zero day", label: "Zero-Day", weight: 2, categories: ["ciberseguridad"] },
  { term: "exploit", label: "Exploit", weight: 2, categories: ["ciberseguridad"] },
  { term: "parche de seguridad", label: "Parche", weight: 2, categories: ["ciberseguridad"] },
  { term: "security patch", label: "Parche", weight: 2, categories: ["ciberseguridad"] },
  { term: "ciberataque", label: "Ciberataque", weight: 2, categories: ["ciberseguridad"] },
  { term: "cyberattack", label: "Ciberataque", weight: 2, categories: ["ciberseguridad"] },
  { term: "brecha de seguridad", label: "Brecha de Seguridad", weight: 2, categories: ["ciberseguridad"] },
  { term: "data breach", label: "Brecha de Seguridad", weight: 2, categories: ["ciberseguridad"] },
  { term: "phishing", label: "Phishing", weight: 1, categories: ["ciberseguridad"] },
  { term: "malware", label: "Malware", weight: 1, categories: ["ciberseguridad"] },
  { term: "sla", label: "SLA", weight: 1, categories: ["storage-backup"] },
  { term: "disponibilidad", label: "Disponibilidad", weight: 1, categories: ["storage-backup"] },
];

export function matchKeywords(text: string): KeywordDef[] {
  const lower = text.toLowerCase();
  return KEYWORDS.filter((k) => lower.includes(k.term));
}
