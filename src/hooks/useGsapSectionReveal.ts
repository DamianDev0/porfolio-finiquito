"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const SECTION_SELECTOR = "[data-section]";
const ITEM_SELECTOR = "[data-section-item]";

const prefersReducedMotion = () => {
  if (typeof window === "undefined") {
    return true;
  }

  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

const useGsapSectionReveal = () => {
  useEffect(() => {
    if (typeof window === "undefined" || prefersReducedMotion()) {
      const sections = document.querySelectorAll<HTMLElement>(SECTION_SELECTOR);
      sections.forEach((section) => {
        const items = section.querySelectorAll<HTMLElement>(ITEM_SELECTOR);
        const targets = items.length ? Array.from(items) : [section];
        targets.forEach((target) => {
          target.style.opacity = "1";
          target.style.transform = "none";
        });
      });
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray<HTMLElement>(SECTION_SELECTOR);

      sections.forEach((section) => {
        const items = section.querySelectorAll<HTMLElement>(ITEM_SELECTOR);
        const targets = items.length ? Array.from(items) : [section];

        gsap.set(targets, { autoAlpha: 0, y: 80 });

        gsap
          .timeline({
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              end: "bottom 45%",
              toggleActions: "play none none reverse",
              scrub: false,
            },
          })
          .to(targets, {
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.12,
          });
      });
    });

    const handleResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      ctx.revert();
    };
  }, []);
};

export default useGsapSectionReveal;
