import { useEffect, useMemo } from "react";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type WorkItem = {
  title: string;
  category: string;
  tools: string;
};

const workItems: WorkItem[] = Array.from({ length: 6 }, (_, index) => ({
  title: `Project Name ${index + 1}`,
  category: "Category",
  tools: "Javascript, TypeScript, React, Threejs",
}));

const Work = () => {
  const items = useMemo(() => workItems, []);

  useEffect(() => {
      if (typeof window === "undefined") {
        return undefined;
      }

      const container = document.querySelector<HTMLElement>("[data-work-container]");
      const boxes = Array.from(
        document.querySelectorAll<HTMLElement>("[data-work-box]")
      );
      if (!container || boxes.length === 0) {
        return;
      }

      const computeTranslateX = () => {
        const firstBox = boxes[0];
        const parentWidth = firstBox.parentElement?.getBoundingClientRect().width ?? 0;
        const rectLeft = container.getBoundingClientRect().left;
        const boxRect = firstBox.getBoundingClientRect();
        const padding = parseFloat(window.getComputedStyle(firstBox).paddingTop) || 0;
        return boxRect.width * boxes.length - (rectLeft + parentWidth) + padding / 2;
      };

      const createTimeline = () => {
        const translateX = computeTranslateX();
        
        // Temporarily disable complex animations to prevent scroll issues
        // Use a simpler approach that doesn't interfere with native scroll
        const timeline = gsap.timeline({
          scrollTrigger: {
            id: "work",
            trigger: container,
            start: "top 80%",
            end: "bottom 20%",
            scrub: false, // Disable scrub to avoid scroll conflicts
            pin: false,
            invalidateOnRefresh: true,
            onEnter: () => {
              gsap.to("[data-work-flex]", { 
                x: -translateX * 0.3, 
                duration: 2,
                ease: "power2.out" 
              });
            },
            onLeave: () => {
              gsap.to("[data-work-flex]", { 
                x: -translateX * 0.5, 
                duration: 1,
                ease: "power2.out" 
              });
            },
            onEnterBack: () => {
              gsap.to("[data-work-flex]", { 
                x: -translateX * 0.3, 
                duration: 1,
                ease: "power2.out" 
              });
            },
            onLeaveBack: () => {
              gsap.to("[data-work-flex]", { 
                x: 0, 
                duration: 1,
                ease: "power2.out" 
              });
            }
          },
        });

        return timeline;
      };

      let timeline = createTimeline();

      const handleResize = () => {
        timeline?.kill();
        ScrollTrigger.getById("work")?.kill();
        // Add a small delay to ensure proper cleanup
        setTimeout(() => {
          timeline = createTimeline();
        }, 100);
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
        timeline?.kill();
        ScrollTrigger.getById("work")?.kill();
        // Refresh ScrollTrigger to clean up any remaining triggers
        ScrollTrigger.refresh();
      };
    }, []);

  return (
    <section
      className="work-section relative min-h-[var(--vh)] w-full overflow-hidden"
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
          className="work-flex relative mt-12 flex min-h-[60vh] w-full -translate-x-20 gap-0 pr-[120px] before:absolute before:left-1/2 before:top-0 before:h-px before:w-[50000vw] before:-translate-x-1/2 before:bg-[#363636] after:absolute after:left-1/2 after:top-full after:h-px after:w-[50000vw] after:-translate-x-1/2 after:bg-[#363636] max-[1400px]:-translate-x-[30px] max-[1400px]:pr-[45px]"
          data-work-flex
        >
          {items.map((item, index) => (
            <article
              className="work-box flex w-[600px] shrink-0 flex-col gap-[50px] border-r border-[#363636] p-20 text-left transition-colors even:flex-col-reverse max-[1400px]:w-[350px] max-[1400px]:p-[30px] max-[900px]:w-[300px]"
              data-work-box
              key={item.title}
            >
              <div className="work-info flex flex-col gap-6">
                <div className="work-title flex w-full items-start justify-between">
                  <h3 className="m-0 text-[50px] font-semibold leading-[50px] max-[1400px]:text-[35px]">
                    0{index + 1}
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
                    Tools and features
                  </h4>
                  <p className="m-0 mt-1 w-[90%] text-sm font-light text-[#adacac] max-[1400px]:text-[13px]">
                    {item.tools}
                  </p>
                </div>
              </div>
              <WorkImage alt={item.title} image="/images/placeholder.webp" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Work;
