"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const Cursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let hover = false;
    const cursor = cursorRef.current!;
    if (!cursor) {
      return;
    }
    const mousePos = { x: 0, y: 0 };
    const cursorPos = { x: 0, y: 0 };

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.x = e.clientX;
      mousePos.y = e.clientY;
    };

    document.addEventListener("mousemove", handleMouseMove);

    let animationFrame = 0;

    const loop = () => {
      if (!hover) {
        const delay = 6;
        cursorPos.x += (mousePos.x - cursorPos.x) / delay;
        cursorPos.y += (mousePos.y - cursorPos.y) / delay;

        gsap.to(cursor, { x: cursorPos.x, y: cursorPos.y, duration: 0.1 });
      }
      animationFrame = requestAnimationFrame(loop);
    };
    animationFrame = requestAnimationFrame(loop);

    const cleanups: Array<() => void> = [];

    document.querySelectorAll("[data-cursor]").forEach((item) => {
      const element = item as HTMLElement;

      const onMouseOver = (e: MouseEvent) => {
        const target = e.currentTarget as HTMLElement;
        const rect = target.getBoundingClientRect();

        if (element.dataset.cursor === "icons") {
          cursor.classList.add("cursor-icons");
          gsap.to(cursor, { x: rect.left, y: rect.top, duration: 0.1 });
          cursor.style.setProperty("--cursorH", `${rect.height}px`);
          hover = true;
        }

        if (element.dataset.cursor === "disable") {
          cursor.classList.add("cursor-disable");
        }
      };

      const onMouseOut = () => {
        cursor.classList.remove("cursor-disable", "cursor-icons");
        hover = false;
      };

      element.addEventListener("mouseover", onMouseOver);
      element.addEventListener("mouseout", onMouseOut);

      cleanups.push(() => {
        element.removeEventListener("mouseover", onMouseOver);
        element.removeEventListener("mouseout", onMouseOut);
      });
    });

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrame);
      cleanups.forEach((cleanup) => cleanup());
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="cursor-main fixed left-[-25px] top-[-25px] z-[99] h-[var(--size)] w-[var(--size)] pointer-events-none rounded-full bg-[#e6c3ff] mix-blend-difference shadow-[0_0_30px_0_rgb(175,131,255)] transition-all duration-300 ease-out [--size:0px] sm:[--size:50px]"
    ></div>
  );
};

export default Cursor;
