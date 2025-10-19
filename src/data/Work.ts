type WorkItem = {
  title: string;
  category: string;
  tools: string;
  image: string;
  link?: string;
};


export const WORK_ITEMS: WorkItem[] = [
  {
    title: "Crm Platform",
    category: "Fintech Experience",
    tools: "Next.js · TypeScript · NestJS · Redux · Tailwind CSS",
    image: "/images/projects/charge.png",
  },
  {
    title: "Creative Studio Site",
    category: "Web Design",
    tools: "React · GSAP · Headless CMS",
    image: "/images/projects/locksmith.png",
  },
  {
    title: "Immersive Product Tour",
    category: "Interactive Experience",
    tools: "Three.js · React · Motion",
    image: "/images/projects/rythym.png",
  },
  {
    title: "SaaS Analytics Dashboard",
    category: "Product Design",
    tools: "Next.js · Radix UI · Recharts",
    image: "/images/projects/smart.png",
  },
  {
    title: "Portfolio Generator",
    category: "Side Project",
    tools: "TypeScript · Tailwind CSS · Vite",
    image: "/images/projects/wallet.png",
  },
];
