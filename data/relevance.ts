import type { CategorySlug } from "./categories";

/**
 * Plantillas de relevancia editorial: explican en una frase por qué una
 * noticia le importa a Coresolutions, basado en las marcas y tecnologías
 * que Core implementa activamente (derivado del histórico de proyectos).
 * Se usa como respaldo automático en scripts/fetch-news.ts; los artículos
 * curados a mano pueden traer su propio texto, más específico.
 */
export const VENDOR_RELEVANCE: Record<string, string> = {
  VMware:
    "Core implementa y administra entornos VMware en varios datacenters de clientes: conviene revisar si esta noticia afecta versiones o licenciamiento en uso.",
  Broadcom:
    "Broadcom es hoy el dueño de VMware; sus decisiones de producto y licenciamiento impactan directo los contratos que Core gestiona.",
  "Check Point":
    "Check Point es uno de los firewalls que Core despliega y mantiene en clientes; un incidente aquí puede requerir acción inmediata.",
  "Aruba (HPE)":
    "Core instala switching y Wi-Fi Aruba en varios clientes; esta novedad aplica directo a esas redes.",
  Veeam:
    "Veeam es la plataforma de backup que Core opera para la continuidad operativa de sus clientes.",
  "Cisco Nexus":
    "Core mantiene switching Cisco Nexus en varios centros de datos; puede requerir revisar configuración o parches.",
  IBM: "IBM es uno de los fabricantes de servidores Power que Core implementa; esto puede abrir una conversación comercial con clientes.",
  "IBM Power":
    "Core tiene proyectos activos sobre IBM Power; útil para evaluar propuestas de renovación con clientes en equipos antiguos.",
  Lenovo:
    "Lenovo es uno de los fabricantes de servidores que más aparece en los proyectos de Core; movimientos de producto o suministro afectan tiempos de entrega.",
  HPE: "HPE es fabricante de servidores y storage que Core instala en datacenters de clientes.",
  Microsoft:
    "Core administra infraestructura Microsoft (Active Directory, Windows Server) en la mayoría de sus clientes.",
  "Active Directory":
    "Active Directory es la columna de identidad en casi todos los clientes de Core; una vulnerabilidad aquí es prioridad alta.",
  "Microsoft Azure":
    "Core asesora y opera cargas en Azure para clientes en procesos de migración a nube híbrida.",
  Oracle:
    "Core da soporte a bases de datos y plataformas Oracle en varios clientes corporativos.",
  F5: "F5 es parte del stack de balanceo y seguridad perimetral que Core implementa en algunos clientes.",
  Fortinet:
    "Fortinet es una de las marcas de firewall que Core evalúa e instala en clientes.",
  Synology:
    "Synology es la línea de NAS que Core recomienda para respaldo y almacenamiento de clientes medianos.",
  Nutanix:
    "Core sigue de cerca a Nutanix como alternativa de HCI ante los cambios de licenciamiento de VMware/Broadcom.",
  "Aruba ClearPass":
    "ClearPass es parte de las soluciones de control de acceso a red que Core implementa junto con Aruba.",
};

export const CATEGORY_FALLBACK: Record<CategorySlug, string> = {
  ciberseguridad:
    "Vulnerabilidad o incidente relevante para la postura de seguridad que Core sostiene en sus clientes.",
  "virtualizacion-cloud":
    "Cambio en el ecosistema de virtualización y nube que Core diseña e implementa.",
  redes:
    "Novedad de networking que puede afectar diseños o mantenimientos de red que Core entrega.",
  "storage-backup":
    "Actualización de storage o backup, pilares de la continuidad operativa que Core garantiza a sus clientes.",
  "servidores-hardware":
    "Movimiento de hardware de servidores que puede abrir oportunidades de renovación con clientes.",
  fabricantes: "Anuncio de un fabricante con el que Core trabaja directamente.",
};

export function pickRelevance(tags: string[], category: CategorySlug): string {
  for (const tag of tags) {
    if (VENDOR_RELEVANCE[tag]) return VENDOR_RELEVANCE[tag];
  }
  return CATEGORY_FALLBACK[category];
}
