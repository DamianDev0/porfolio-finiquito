"use client";

import gsap from "gsap";
import SplitType from "split-type";

export function initialFX() {
  // Clean up any existing ScrollTriggers to prevent conflicts
  const { ScrollTrigger } = require("gsap/ScrollTrigger");
  ScrollTrigger.killAll();
  
  document.body.style.overflowY = "auto";
  const main = document.getElementsByTagName("main")[0];
  if (main) main.classList.add("main-active");
  
  // Refresh ScrollTrigger after enabling scroll and UI changes
  setTimeout(() => {
    ScrollTrigger.refresh();
  }, 100);

  // Smooth scroller temporarily disabled for testing
  // const { smoother } = require("../components/Navbar");
  // if (smoother) {
  //   smoother.paused(false);
  // }

  gsap.to("body", {
    backgroundColor: "#0b080c",
    duration: 0.5,
    delay: 1,
  });


  const selectors = [
    ".landing-info h3",
    ".landing-intro h2",
    ".landing-intro h1",
  ];

  selectors.forEach((selector) => {
    const target = document.querySelector(selector);
    if (!target) return;

    const split = new SplitType(target as HTMLElement, { types: "chars,lines" });

    gsap.fromTo(
      split.chars,
      { opacity: 0, y: 80, filter: "blur(5px)" },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        filter: "blur(0px)",
        ease: "power3.inOut",
        stagger: 0.025,
        delay: 0.3,
      }
    );
  });

  // Animación de subtítulos
  const infoTitles = [".landing-h2-info", ".landing-info-h2"];
  infoTitles.forEach((selector, i) => {
    const target = document.querySelector(selector);
    if (!target) return;

    const split = new SplitType(target as HTMLElement, { types: "chars,lines" });

    gsap.fromTo(
      split.chars,
      { opacity: 0, y: 80, filter: "blur(5px)" },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        filter: "blur(0px)",
        ease: "power3.inOut",
        stagger: 0.025,
        delay: 0.3 + i * 0.5,
      }
    );
  });

  gsap.fromTo(
    [".header", ".icons-section", ".nav-fade"],
    { opacity: 0 },
    {
      opacity: 1,
      duration: 1.2,
      ease: "power1.inOut",
      delay: 1.2,
    }
  );

  const loopSelectors = [
    [".landing-h2-info", ".landing-h2-info-1"],
    [".landing-h2-1", ".landing-h2-2"],
  ];

  loopSelectors.forEach(([sel1, sel2]) => {
    const el1 = document.querySelector(sel1);
    const el2 = document.querySelector(sel2);
    if (el1 && el2) {
      const text1 = new SplitType(el1 as HTMLElement, { types: "chars" });
      const text2 = new SplitType(el2 as HTMLElement, { types: "chars" });
      LoopText(text1, text2);
    }
  });
}

function LoopText(text1: SplitType, text2: SplitType) {
  const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
  const delay = 4;
  const delay2 = delay * 2 + 1;

  tl.fromTo(
    text2.chars,
    { opacity: 0, y: 80 },
    {
      opacity: 1,
      duration: 1.2,
      ease: "power3.inOut",
      y: 0,
      stagger: 0.1,
      delay,
    },
    0
  )
    .fromTo(
      text1.chars,
      { y: 80 },
      {
        duration: 1.2,
        ease: "power3.inOut",
        y: 0,
        stagger: 0.1,
        delay: delay2,
      },
      1
    )
    .fromTo(
      text1.chars,
      { y: 0 },
      {
        y: -80,
        duration: 1.2,
        ease: "power3.inOut",
        stagger: 0.1,
        delay,
      },
      0
    )
    .to(
      text2.chars,
      {
        y: -80,
        duration: 1.2,
        ease: "power3.inOut",
        stagger: 0.1,
        delay: delay2,
      },
      1
    );
}
