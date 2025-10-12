import { useEffect } from "react";
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
    title: "Digital Banking Platform",
    category: "Fintech Experience",
    tools: "Next.js · TypeScript · Zustand · Tailwind CSS",
    image: "/images/placeholder.webp",
  },
  {
    title: "Creative Studio Site",
    category: "Web Design",
    tools: "React · GSAP · Headless CMS",
    image: "/images/placeholder.webp",
  },
  {
    title: "Immersive Product Tour",
    category: "Interactive Experience",
    tools: "Three.js · React · Motion",
    image: "/images/placeholder.webp",
  },
  {
    title: "SaaS Analytics Dashboard",
    category: "Product Design",
    tools: "Next.js · Radix UI · Recharts",
    image: "/images/placeholder.webp",
  },
  {
    title: "Portfolio Generator",
    category: "Side Project",
    tools: "TypeScript · Tailwind CSS · Vite",
    image: "/images/placeholder.webp",
  },
];

const Work = () => {
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const section = document.querySelector<HTMLElement>("[data-work-section]");
    const track = section?.querySelector<HTMLElement>("[data-work-track]");

    if (!section || !track) {
      return;
    }

    gsap.set(track, { x: 0 });

    const mm = gsap.matchMedia();

    const context = mm.add("(min-width: 1024px)", () => {
      const animation = gsap.to(track, {
        x: () => {
          const available = track.scrollWidth - window.innerWidth;
          return available > 0 ? -available : 0;
        },
        ease: "none",
        scrollTrigger: {
          id: "work-horizontal",
          trigger: section,
          start: "top top",
          end: () => `+=${Math.max(track.scrollWidth - window.innerWidth, 0)}`,
          scrub: true,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      return () => {
        animation.kill();
      };
    });

    const refreshTimeout = window.setTimeout(() => ScrollTrigger.refresh(), 150);

    return () => {
      window.clearTimeout(refreshTimeout);
      context.revert();
      ScrollTrigger.getById("work-horizontal")?.kill();
    };
  }, []);

  return (
    <section
      className="work-section relative min-h-[var(--vh)] w-full overflow-hidden"
      data-work-section
      id="work"
    >
      <div
        className="section-container relative mx-auto flex min-h-full flex-col py-20"
        data-work-container
      >
        <h2 className="title mt-[100px] text-[70px] font-medium uppercase tracking-tight text-white max-[1400px]:text-[50px] max-[900px]:text-[40px]">
          My <span className="text-[var(--accentColor)]">Work</span>
        </h2>
        <div
          className="work-flex relative mt-12 flex min-h-[60vh] w-full gap-0 pr-[120px] before:absolute before:left-1/2 before:top-0 before:h-px before:w-[50000vw] before:-translate-x-1/2 before:bg-[#363636] after:absolute after:left-1/2 after:top-full after:h-px after:w-[50000vw] after:-translate-x-1/2 after:bg-[#363636] max-[1400px]:pr-[45px] max-[1024px]:flex-col max-[1024px]:gap-12"
          data-work-track
        >
          {WORK_ITEMS.map((item, index) => {
            const itemNumber = String(index + 1).padStart(2, "0");

            return (
              <article
                className="work-box flex w-[600px] shrink-0 flex-col gap-[50px] border-r border-[#363636] p-20 text-left transition-colors even:flex-col-reverse max-[1400px]:w-[350px] max-[1400px]:p-[30px] max-[1024px]:w-full max-[1024px]:border-r-0 max-[1024px]:border-b max-[1024px]:p-0 max-[1024px]:pb-12"
                data-work-box
                key={item.title}
              >
                <div className="work-info flex flex-col gap-6">
                  <div className="work-title flex w-full items-start justify-between">
                    <h3 className="m-0 text-[50px] font-semibold leading-[50px] max-[1400px]:text-[35px]">
                      {itemNumber}
                    </h3>
                    <div className="text-right">
                      <h4 className="m-0 text-[24px] font-semibold uppercase tracking-wide">
                        {item.title}
                      </h4>
                      <p className="m-0 mt-1 text-sm font-light uppercase tracking-[2px] text-[#adacac]">
                        {item.category}
                      </p>
                    </div>
                  </div>
                  <div>
                    <h4 className="m-0 text-[18px] font-medium uppercase tracking-[2px] text-white/70 max-[1400px]:text-[15px]">
                      Herramientas y focos
                    </h4>
                    <p className="m-0 mt-1 w-[90%] text-sm font-light text-[#adacac] max-[1400px]:text-[13px]">
                      {item.tools}
                    </p>
                  </div>
                </div>
                <WorkImage alt={item.title} image={item.image} link={item.link} />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Work;
