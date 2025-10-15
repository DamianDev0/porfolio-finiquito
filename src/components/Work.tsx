"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import WorkImage from "./WorkImage";

gsap.registerPlugin(ScrollTrigger);

type WorkItem = {
  title: string;
  category: string;
  tools: string;
  image: string;
  link?: string;
};

const WORK_ITEMS: WorkItem[] = [
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

const Work = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    let horizontalScroll: gsap.core.Tween | null = null;

    const setupScrollTrigger = () => {
      if (horizontalScroll) horizontalScroll.kill();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === section) trigger.kill();
      });

      gsap.set(track, { x: 0 });
      const isDesktop = window.innerWidth > 1024;

      if (isDesktop) {
        const getDistance = () => {
          const trackWidth = track.scrollWidth;
          const sectionWidth = section.clientWidth;
          return Math.max(0, trackWidth - sectionWidth);
        };

        const distance = getDistance();

        if (distance > 0) {
          horizontalScroll = gsap.to(track, {
            x: -distance,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: `+=${distance}`,
              scrub: 1,
              pin: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });
        }
      }
    };

    setupScrollTrigger();

    const ro = new ResizeObserver(() => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setupScrollTrigger(), 100);
    });

    ro.observe(section);
    ro.observe(track);

    const handleResize = () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setupScrollTrigger(), 150);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      if (horizontalScroll) horizontalScroll.kill();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === section) trigger.kill();
      });
      ro.disconnect();
      window.removeEventListener("resize", handleResize);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative w-full min-h-[100vh] overflow-hidden bg-[#0b080c] text-white"
    >
      <div className="absolute left-[8%] top-[50%] h-[350px] w-[320px] -translate-y-1/2 rounded-full bg-[#c873ff]/25 blur-[140px] pointer-events-none" />
      <div className="absolute right-[15%] top-[160px] h-[220px] w-[220px] rounded-full bg-[#b87fff]/25 blur-[120px] pointer-events-none" />

      <div className="mx-auto w-[var(--cWidth)] pt-16 pb-20 relative z-10 flex items-center justify-start">
        <h2 className="text-[55px] ml-5 font-semibold uppercase tracking-tight max-[1400px]:text-[45px] max-[900px]:text-[36px] max-[640px]:text-[30px] text-white">
          My{" "}
          <span className="bg-gradient-to-t from-[#b87fff] to-[#ffffff] bg-clip-text text-transparent">
            Work
          </span>
        </h2>
      </div>

      <div
        ref={trackRef}
        className="flex w-fit gap-0 pr-[120px] relative z-10 max-[1024px]:flex-col max-[1024px]:gap-12 max-[1024px]:w-full max-[1024px]:pr-0"
      >
        {WORK_ITEMS.map((item, index) => {
          const itemNumber = String(index + 1).padStart(2, "0");
          return (
            <article
              key={item.title}
              className="flex w-[600px] shrink-0 flex-col gap-8 border-r border-[#363636] p-12 even:flex-col-reverse 
              max-[1400px]:w-[420px] max-[1400px]:p-8 
              max-[1024px]:w-full max-[1024px]:border-r-0 max-[1024px]:border-b max-[1024px]:border-[#363636] max-[1024px]:last:border-b-0"
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-start justify-between max-[640px]:flex-col max-[640px]:gap-2">
                  <h3 className="text-[50px] font-bold leading-[50px] max-[1400px]:text-[36px] max-[900px]:text-[30px] max-[640px]:text-[26px]">
                    {itemNumber}
                  </h3>
                  <div className="text-right max-[640px]:text-left">
                    <h4 className="text-[24px] font-semibold uppercase tracking-wide max-[900px]:text-[18px] max-[640px]:text-[16px]">
                      {item.title}
                    </h4>
                    <p className="text-sm uppercase tracking-[2px] text-[#adacac] max-[640px]:text-[12px]">
                      {item.category}
                    </p>
                  </div>
                </div>
                <div className="mt-1">
                  <h4 className="text-[16px] font-medium uppercase tracking-[2px] text-white/70 max-[640px]:text-[13px]">
                    Herramientas y focos
                  </h4>
                  <p className="mt-1 text-sm font-light text-[#adacac] max-[640px]:text-[12px]">
                    {item.tools}
                  </p>
                </div>
              </div>
              <WorkImage alt={item.title} image={item.image} link={item.link} />
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default Work;
