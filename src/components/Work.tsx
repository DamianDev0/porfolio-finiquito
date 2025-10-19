"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import WorkImage from "./WorkImage";
import TextPressure from "./TextPressure";
import { WORK_ITEMS } from "@/data/Work";

gsap.registerPlugin(ScrollTrigger);

const Work = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
      gsap.set(track, { x: 0 });

      const horizontalTween = gsap.to(track, {
        x: () => {
          const totalWidth = track.scrollWidth - section.clientWidth;
          return totalWidth > 0 ? -totalWidth : 0;
        },
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => {
            const totalWidth = track.scrollWidth - section.clientWidth;
            return `+=${totalWidth > 0 ? totalWidth : section.clientHeight}`;
          },
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      const title = section.querySelector<HTMLElement>("[data-work-title]");
      if (title) {
        gsap.fromTo(
          title,
          { autoAlpha: 0, y: 40 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      gsap.utils
        .toArray<HTMLElement>(section.querySelectorAll("[data-work-item]"))
        .forEach((panel, index) => {
          gsap.fromTo(
            panel,
            { autoAlpha: 0, y: 80 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.8,
              delay: index === 0 ? 0.1 : 0,
              ease: "power3.out",
              scrollTrigger: {
                trigger: panel,
                containerAnimation: horizontalTween,
                start: "left center",
                toggleActions: "play none none reverse",
              },
            }
          );
        });

      ScrollTrigger.refresh();
    }, section);

    const resizeHandler = () => ScrollTrigger.refresh();
    window.addEventListener("resize", resizeHandler);

    return () => {
      window.removeEventListener("resize", resizeHandler);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative w-full min-h-screen overflow-hidden bg-[#0b080c] text-white"
    >
      <div className="absolute left-[10%] top-1/2 h-[300px] w-[280px] -translate-y-1/2 rounded-full bg-[#c873ff]/25 blur-[140px]" />
      <div className="absolute right-[10%] top-[200px] h-[200px] w-[200px] rounded-full bg-[#b87fff]/25 blur-[120px]" />

      <div className="px-8 pt-24 pb-16" data-work-title>
        <TextPressure
          text="MY WORK"
          flex
          alpha
          stroke={false}
          width
          weight
          italic
          textColor="#c481ff"
          minFontSize={28}
        />
      </div>

      <div ref={trackRef} className="flex w-fit gap-0 relative z-10">
        {WORK_ITEMS.map((item, i) => (
          <article
            key={item.title}
            data-work-item
            className="flex w-[90vw] md:w-[600px] shrink-0 flex-col gap-8 border-r border-[#2a2a2a] p-10 even:flex-col-reverse"
          >
            <div>
              <div className="flex items-start justify-between mb-3 max-[640px]:flex-col max-[640px]:gap-1">
                <h3 className="text-4xl font-bold">
                  {String(i + 1).padStart(2, "0")}
                </h3>
                <div className="text-right max-[640px]:text-left">
                  <h4 className="text-lg font-semibold uppercase">
                    {item.title}
                  </h4>
                  <p className="text-xs uppercase text-[#adacac]">
                    {item.category}
                  </p>
                </div>
              </div>
              <div>
                <h5 className="text-sm uppercase text-white/70">
                  Herramientas y focos
                </h5>
                <p className="text-xs text-[#adacac]">{item.tools}</p>
              </div>
            </div>
            <WorkImage alt={item.title} image={item.image} link={item.link} />
          </article>
        ))}
      </div>
    </section>
  );
};

export default Work;
