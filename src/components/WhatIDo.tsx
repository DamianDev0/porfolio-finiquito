"use client";

import { useRef, useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { skillsBackend, skillsFrontend } from "@/data/SkillsWhatIDo";
import { handleClick } from "@/utils/handleClick";
import CardWhatIDo from "./ui/WhaIDo/cardWhatIDo";
import GridBorder from "./ui/WhaIDo/gridBorder";
import Title from "./ui/title";

export default function WhatIDo() {
  const containerRef = useRef<(HTMLDivElement | null)[]>([]);
  const setRef = (el: HTMLDivElement | null, i: number) => {
    containerRef.current[i] = el;
  };

  useEffect(() => {
    const refs = [...containerRef.current];
    if (ScrollTrigger.isTouch) {
      refs.forEach((el) => {
        if (!el) return;
        const handler = () => handleClick(el);
        el.addEventListener("click", handler);
      });
    }

    return () => {
      refs.forEach((el) => {
        if (!el) return;
        const handler = () => handleClick(el);
        el.removeEventListener("click", handler);
      });
    };
  }, []);

  return (
    <section className="flex flex-col lg:flex-row items-start justify-between min-h-screen py-24 text-white">
      {/* Title Section */}
      <div className="w-full lg:w-1/2 flex justify-center lg:justify-start">
        <Title
          span1="WHAT"
          span2="I DO"
          className="text-left md:ml-[6%] lg:ml-[30%]"
        />
      </div>

      {/* Cards Section */}
      <div className="relative w-full lg:w-1/2 flex flex-col items-center lg:items-start px-6 md:px-8 lg:px-0">
        <div className="relative w-full max-w-[500px] flex flex-col lg:ml-[8%]">
          <GridBorder />

          <CardWhatIDo
            refSetter={(el) => setRef(el, 0)}
            title="FRONTEND & MOBILE"
            description="Started building websites with JavaScript, now I craft them with TypeScript, React, Express, Node… and a little bit of magic!"
            skills={skillsFrontend}
            borderTop
          />

          <CardWhatIDo
            refSetter={(el) => setRef(el, 1)}
            title="BACKEND"
            description="I started designing as my hobby, but like all good hobbies, it slowly crept into my career—now it won't leave me alone!"
            skills={skillsBackend}
            borderBottom
          />
        </div>
      </div>
    </section>
  );
}
