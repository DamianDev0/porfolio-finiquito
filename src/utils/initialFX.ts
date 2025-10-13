"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function initialFX() {
  ScrollTrigger.killAll();
  document.body.style.overflowY = "auto";
  document.querySelector("main")?.classList.add("main-active");

  setTimeout(() => {
    ScrollTrigger.refresh();
  }, 100);

  gsap.to("body", {
    backgroundColor: "#0b080c",
    duration: 0.5,
    delay: 0.4,
  });

  const heroElements = document.querySelectorAll<HTMLElement>("[data-hero-animate]");

  heroElements.forEach((element, index) => {
    gsap.fromTo(
      element,
      { y: 40, opacity: 0, filter: "blur(6px)" },
      {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 0.9,
        ease: "power3.out",
        delay: 0.2 + index * 0.1,
      }
    );
  });

  gsap.to([".header", ".icons-section", ".nav-fade"], {
    opacity: 1,
    duration: 1,
    ease: "power1.out",
    delay: 0.8,
  });
}
