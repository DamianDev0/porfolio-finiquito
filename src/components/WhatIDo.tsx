"use client";

import { useEffect, useMemo, useState } from "react";

const SERVICES = [
  {
    title: "Develop",
    description:
      "I craft performant front-end experiences with modern tooling and a meticulous eye for detail.",
    summary: "Full-stack craftsmanship",
    tags: [
      "JavaScript",
      "TypeScript",
      "Three.js",
      "React",
      "CSS",
      "Node.js",
      "Next.js",
      "Express.js",
      "PHP",
      "MySQL",
    ],
  },
  {
    title: "Design",
    description:
      "From initial concept to polished visuals, I design interfaces and motion systems that feel alive.",
    summary: "Visual storytelling",
    tags: [
      "Blender",
      "ZBrush",
      "UI Design",
      "Motion",
      "Rigging",
      "3D Animation",
      "Character Design",
      "Modelling",
    ],
  },
];

const WhatIDo = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const touchQuery = window.matchMedia("(hover: none), (pointer: coarse)");
    const updateTouchState = () => {
      setIsTouchDevice(touchQuery.matches);
      if (touchQuery.matches) {
        setActiveIndex(null);
      }
    };

    updateTouchState();
    touchQuery.addEventListener("change", updateTouchState);

    return () => {
      touchQuery.removeEventListener("change", updateTouchState);
    };
  }, []);

  const cardStates = useMemo(
    () =>
      SERVICES.map((_, index) => ({
        isActive: activeIndex === index,
        isDimmed: activeIndex !== null && activeIndex !== index,
      })),
    [activeIndex]
  );

  const handlePointerEnter = (index: number) => {
    if (!isTouchDevice) {
      setActiveIndex(index);
    }
  };

  const handlePointerLeave = () => {
    if (!isTouchDevice) {
      setActiveIndex((current) => (current === null ? null : current));
    }
  };

  const handleCardClick = (index: number) => {
    if (isTouchDevice) {
      setActiveIndex((current) => (current === index ? null : index));
    }
  };

  return (
    <section className="relative mx-auto flex w-[var(--cWidth)] max-w-[1920px] flex-col items-center justify-center gap-12 py-24 md:flex-row md:py-32">
      <div className="w-full md:w-1/2">
        <h2 className="title text-left text-[clamp(3rem,4vw+1rem,5.5rem)] font-semibold uppercase leading-[0.9] tracking-tight text-white">
          W<span className="italic">hat</span>
          <span className="ml-3 block text-[var(--accentColor)]">I do</span>
        </h2>
      </div>

      <div className="flex w-full flex-col gap-8 md:w-1/2">
        {SERVICES.map((service, index) => {
          const { isActive, isDimmed } = cardStates[index];
          const baseClasses =
            "group relative w-full overflow-hidden rounded-[28px] border border-white/10 bg-white/5 px-10 py-12 text-left transition-all duration-500";
          const activeClasses =
            "border-white/40 bg-white/[0.08] shadow-[0_25px_90px_rgba(124,58,237,0.35)] backdrop-blur-sm";
          const dimmedClasses = "opacity-60 hover:opacity-90";
          const cardClasses = [
            baseClasses,
            isActive ? activeClasses : "",
            isDimmed ? dimmedClasses : "",
            !isDimmed && !isActive ? "hover:border-white/30 hover:bg-white/[0.07]" : "",
          ]
            .filter(Boolean)
            .join(" ");

          return (
            <button
              key={service.title}
              type="button"
              data-cursor="disable"
              className={`${cardClasses} before:absolute before:left-12 before:top-0 before:h-px before:w-[calc(100%-6rem)] before:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.6),transparent)] before:opacity-0 before:transition-opacity before:duration-500 after:absolute after:bottom-0 after:left-12 after:h-px after:w-[calc(100%-6rem)] after:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.4),transparent)] after:opacity-0 after:transition-opacity after:duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accentColor)] focus-visible:ring-offset-2 focus-visible:ring-offset-black group-hover:before:opacity-100 group-hover:after:opacity-100 ${
                isActive ? "before:opacity-100 after:opacity-100" : ""
              }`}
              onMouseEnter={() => handlePointerEnter(index)}
              onMouseLeave={handlePointerLeave}
              onFocus={() => handlePointerEnter(index)}
              onBlur={handlePointerLeave}
              onClick={() => handleCardClick(index)}
            >
              <div className={`transition-all duration-500 ${isActive ? "opacity-100" : isDimmed ? "opacity-60" : "opacity-90"}`}>
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-[clamp(2rem,2.5vw+1rem,3rem)] font-semibold uppercase tracking-wide text-white">
                    {service.title}
                  </h3>
                  <span className="text-sm uppercase tracking-[0.3rem] text-[var(--accentColor)]">
                    {service.summary}
                  </span>
                </div>
                <p className="mt-4 max-w-xl text-sm font-light leading-relaxed text-white/70 min-[768px]:text-base">
                  {service.description}
                </p>
                <div className="mt-6">
                  <h4 className="text-xs font-semibold uppercase tracking-[0.4rem] text-white/50">
                    Skillset & tools
                  </h4>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`rounded-full border border-white/20 px-4 py-1 text-xs font-medium uppercase tracking-[0.25rem] text-white/80 transition-colors duration-300 ${
                          isActive ? "bg-white/10 text-white" : "bg-transparent"
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <span
                aria-hidden="true"
                className={`absolute bottom-6 right-6 flex h-11 w-11 items-center justify-center rounded-full border border-white/30 text-lg text-white transition-all duration-500 ${
                  isActive
                    ? "translate-y-0 opacity-100"
                    : "translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
                }`}
              >
                ↗
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default WhatIDo;
