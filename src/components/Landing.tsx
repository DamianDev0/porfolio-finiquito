"use client";

import { useEffect } from "react";
import gsap from "gsap";
import PixelBlast from "./PixelBlast";

const Landing = () => {
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduceMotion.matches) {
      const elements = document.querySelectorAll<HTMLElement>("[data-hero-animate]");
      elements.forEach((element) => {
        element.style.opacity = "1";
        element.style.transform = "none";
      });
      return;
    }

    const ctx = gsap.context(() => {
      const elements = gsap.utils.toArray<HTMLElement>("[data-hero-animate]");
      if (!elements.length) {
        return;
      }

      gsap.set(elements, { autoAlpha: 0, y: 40 });
      gsap.to(elements, {
        autoAlpha: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.12,
        delay: 0.35,
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="landingDiv"
      className="relative mx-auto flex h-[var(--vh)] w-full max-w-[var(--cMaxWidth)] items-center overflow-hidden"
    >
      <div className="absolute inset-0 w-full h-full">
        <PixelBlast
          variant="circle"
          pixelSize={6}
          color="#B19EEF"
          patternScale={3}
          patternDensity={1.2}
          pixelSizeJitter={0.5}
          enableRipples
          rippleSpeed={0.4}
          rippleThickness={0.12}
          rippleIntensityScale={1.5}
          liquid
          liquidStrength={0.12}
          liquidRadius={1.2}
          liquidWobbleSpeed={5}
          speed={0.6}
          edgeFade={0.25}
          transparent
          className="w-full h-full"
        />
      </div>

      <div className="relative z-10 mx-auto flex h-full w-[var(--cWidth)] max-w-[var(--cMaxWidth)] flex-col justify-between px-6 py-16 text-white md:flex-row md:items-center md:py-24">
        <div className="max-w-xl text-left">
          <p
            data-hero-animate
            className="text-sm font-light uppercase tracking-[0.5rem] text-[var(--accentColor)] min-[768px]:text-base"
          >
            Hello, I’m
          </p>
          <h1
            data-hero-animate
            className="mt-3 text-4xl font-semibold tracking-tight leading-[1.05] min-[500px]:text-5xl min-[768px]:text-6xl"
          >
            Damian
            <span className="mt-1 block text-lg font-normal uppercase tracking-[0.6rem] text-white/60 min-[500px]:text-xl min-[768px]:text-2xl">
              Creative Developer
            </span>
          </h1>
        </div>

        <div className="mt-16 flex flex-col items-center text-center md:mt-0 md:items-end md:text-right">
          <p
            data-hero-animate
            className="text-sm font-light uppercase tracking-[0.5rem] text-[var(--accentColor)] min-[768px]:text-base"
          >
            A creative
          </p>
          <div
            data-hero-animate
            className="mt-4 space-y-3 text-4xl font-semibold uppercase leading-none min-[500px]:text-5xl min-[768px]:text-6xl"
          >
            <span className="block text-[#c481ff]">Developer</span>
            <span className="block text-white/30">Designer</span>
          </div>
          <p
            data-hero-animate
            className="mt-6 max-w-sm text-sm leading-relaxed text-white/70 min-[768px]:text-base"
          >
            I transform ideas into elegant and functional digital experiences,
            with a focus on detail and accessibility.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Landing;
