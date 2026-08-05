import type { IconName } from "@/data/categories";

const common = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function Shield(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" {...common} {...props}>
      <path d="M12 3l7 3v5c0 5-3 8.5-7 10-4-1.5-7-5-7-10V6l7-3z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

function Cloud(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" {...common} {...props}>
      <path d="M7 18h10a4 4 0 0 0 .5-7.97A5.5 5.5 0 0 0 7.1 9.1 4 4 0 0 0 7 18z" />
    </svg>
  );
}

function Network(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" {...common} {...props}>
      <circle cx="12" cy="4.5" r="2" />
      <circle cx="5" cy="18" r="2" />
      <circle cx="19" cy="18" r="2" />
      <path d="M12 6.5v5M12 11.5l-6 4.7M12 11.5l6 4.7" />
    </svg>
  );
}

function Database(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" {...common} {...props}>
      <ellipse cx="12" cy="5.5" rx="7" ry="2.5" />
      <path d="M5 5.5v13c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5v-13" />
      <path d="M5 12c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5" />
    </svg>
  );
}

function Server(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" {...common} {...props}>
      <rect x="4" y="4" width="16" height="6.5" rx="1" />
      <rect x="4" y="13.5" width="16" height="6.5" rx="1" />
      <path d="M7.5 7.25h.01M7.5 16.75h.01" />
    </svg>
  );
}

function Building(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" {...common} {...props}>
      <rect x="5" y="3" width="14" height="18" rx="1" />
      <path d="M9 7.5h.01M15 7.5h.01M9 11.5h.01M15 11.5h.01M9 15.5h.01M15 15.5h.01" />
      <path d="M10 21v-3.5h4V21" />
    </svg>
  );
}

const ICONS: Record<IconName, (props: React.SVGProps<SVGSVGElement>) => React.JSX.Element> = {
  shield: Shield,
  cloud: Cloud,
  network: Network,
  database: Database,
  server: Server,
  building: Building,
};

export function CategoryIcon({ name, ...props }: { name: IconName } & React.SVGProps<SVGSVGElement>) {
  const Icon = ICONS[name];
  return <Icon {...props} />;
}
