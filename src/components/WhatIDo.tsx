"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const skillsDevelop = [
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Three.js",
  "Express.js",
  "PHP",
  "MySQL",
];

const skillsDesign = [
  "Blender",
  "Zbrush",
  "UI Design",
  "Motion",
  "Rigging",
  "3D Animation",
  "Character Design",
  "Modeling",
];

export default function WhatIDo() {
  const containerRef = useRef<(HTMLDivElement | null)[]>([]);
  const setRef = (el: HTMLDivElement | null, i: number) => {
    containerRef.current[i] = el;
  };

  useEffect(() => {
    if (ScrollTrigger.isTouch) {
      containerRef.current.forEach((el) => {
        if (!el) return;
        const handler = () => handleClick(el);
        el.addEventListener("click", handler);
      });
    }
    return () => {
      containerRef.current.forEach((el) => {
        if (!el) return;
        const handler = () => handleClick(el);
        el.removeEventListener("click", handler);
      });
    };
  }, []);

  return (
    <section className="flex flex-col lg:flex-row items-center justify-center min-h-screen py-24 text-white">
      <div className="flex justify-start lg:justify-end w-full lg:w-1/2 px-8 lg:pr-[6%] mb-16 lg:mb-0">
        <h2 className="text-left text-[clamp(2.9rem,6vw+10px,7rem)] leading-[1.1] font-semibold uppercase tracking-[2px]">
          <span className="text-white/80 block">WHAT</span>
          <span className="text-[var(--accentColor)] block">I DO</span>
        </h2>
      </div>

      <div className="relative w-full lg:w-1/2 flex flex-col items-center">
        <div className="relative w-[90%] sm:w-[400px] md:w-[480px] flex flex-col">
          <div className="absolute inset-0 pointer-events-none">
            <svg
              className="absolute inset-0 w-full h-full opacity-50"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line
                x1="0"
                y1="0"
                x2="100%"
                y2="0"
                stroke="white"
                strokeWidth="1.5"
                strokeDasharray="5 5"
              />
              <line
                x1="0"
                y1="100%"
                x2="100%"
                y2="100%"
                stroke="white"
                strokeWidth="1.5"
                strokeDasharray="5 5"
              />
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="100%"
                stroke="white"
                strokeWidth="1.5"
                strokeDasharray="5 5"
              />
              <line
                x1="100%"
                y1="0"
                x2="100%"
                y2="100%"
                stroke="white"
                strokeWidth="1.5"
                strokeDasharray="5 5"
              />
              <line
                x1="0"
                y1="50%"
                x2="100%"
                y2="50%"
                stroke="white"
                strokeWidth="1.5"
                strokeDasharray="5 5"
              />
            </svg>
          </div>

          <Card
            refSetter={(el) => setRef(el, 0)}
            title="DEVELOP"
            description="Started building websites with JavaScript and PHP, now I craft them with TypeScript, React, Express, Node… and a little bit of magic!"
            skills={skillsDevelop}
            borderTop
          />
          <Card
            refSetter={(el) => setRef(el, 1)}
            title="DESIGN"
            description="I started designing as my hobby, but like all good hobbies, it slowly crept into my career—now it won't leave me alone!"
            skills={skillsDesign}
            borderBottom
          />
        </div>
      </div>
    </section>
  );
}

type CardProps = {
  refSetter: (el: HTMLDivElement | null) => void;
  title: string;
  description: string;
  skills: string[];
  borderTop?: boolean;
  borderBottom?: boolean;
};

function Card({
  refSetter,
  title,
  description,
  skills,
  borderTop,
  borderBottom,
}: CardProps) {
  return (
    <div
      ref={refSetter}
      className={`relative bg-black/40 backdrop-blur-sm p-8 sm:p-10 transition-all duration-500 group cursor-pointer ${
        borderTop ? "border-t border-white/30" : ""
      } ${borderBottom ? "border-b border-white/30" : ""}`}
    >
      <div className="absolute top-0 left-0 w-3 h-3 border-t-4 border-l-4 border-white" />
      <div className="absolute top-0 right-0 w-3 h-3 border-t-4 border-r-4 border-white" />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b-4 border-l-4 border-white" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-4 border-r-4 border-white" />

      <h3 className="text-2xl sm:text-3xl font-extrabold mb-1 tracking-wide">
        {title}
      </h3>
      <h4 className="text-xs sm:text-sm font-light opacity-40 mb-2">
        Description
      </h4>
      <p className="text-sm leading-6 font-extralight text-white/80 mb-6">
        {description}
      </p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileHover={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-[180px] transition-all duration-700 ease-out"
      >
        <h5 className="text-xs uppercase tracking-widest font-light text-white/70 mb-2">
          Skillset & tools
        </h5>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              viewport={{ once: true }}
              className="text-xs px-3 py-1 rounded-full border border-white/30 bg-white/10"
            >
              {skill}
            </motion.div>
          ))}
        </div>
      </motion.div>

      <div className="absolute bottom-5 right-5 w-[26px] h-[26px] border border-white flex items-center justify-center">
        <div className="w-[10px] h-[10px] border-l border-b border-white rotate-[-45deg] group-hover:rotate-[-225deg] transition-transform duration-500" />
      </div>
    </div>
  );
}

function handleClick(container: HTMLDivElement) {
  container.classList.toggle("what-content-active");
  if (container.parentElement) {
    const siblings = Array.from(container.parentElement.children);
    siblings.forEach((sibling) => {
      if (sibling !== container)
        sibling.classList.remove("what-content-active");
    });
  }
}
