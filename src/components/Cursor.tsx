"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const Cursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) {
      return;
    }

    gsap.set(cursor, { xPercent: -50, yPercent: -50 });

    let hover = false;
    let defaultSize = 0;

    const setCursorSize = (size: number) => {
      cursor.style.width = `${size}px`;
      cursor.style.height = `${size}px`;
    };

    const updateDefaultSize = () => {
      defaultSize = window.innerWidth >= 600 ? 50 : 0;
      if (!hover) {
        setCursorSize(defaultSize);
      }
    };

    updateDefaultSize();

    const mousePos = { x: 0, y: 0 };
    const cursorPos = { x: 0, y: 0 };

    const handleMouseMove = (event: MouseEvent) => {
      mousePos.x = event.clientX;
      mousePos.y = event.clientY;
    };

    document.addEventListener("mousemove", handleMouseMove);

    let animationFrame = 0;
    const loop = () => {
      if (!hover) {
        const delay = 6;
        cursorPos.x += (mousePos.x - cursorPos.x) / delay;
        cursorPos.y += (mousePos.y - cursorPos.y) / delay;
        gsap.to(cursor, { x: cursorPos.x, y: cursorPos.y, duration: 0.16 });
      }
      animationFrame = requestAnimationFrame(loop);
    };

    animationFrame = requestAnimationFrame(loop);

    const cleanupCallbacks: Array<() => void> = [];

    document.querySelectorAll<HTMLElement>("[data-cursor]").forEach((element) => {
      const onMouseOver = (event: MouseEvent) => {
        const target = event.currentTarget as HTMLElement;
        const cursorType = target.dataset.cursor;

        if (cursorType === "icons") {
          const rect = target.getBoundingClientRect();
          hover = true;
          const size = Math.max(rect.width, rect.height) - 12;
          setCursorSize(Math.max(size, 32));
          gsap.to(cursor, {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2,
            duration: 0.2,
            ease: "power2.out",
          });
          cursor.style.backgroundColor = "rgba(230,195,255,0.8)";
          cursor.style.border = "1px solid rgba(255,255,255,0.35)";
        } else if (cursorType === "disable") {
          hover = true;
          setCursorSize(0);
          cursor.style.border = "none";
        }
      };

      const onMouseOut = () => {
        hover = false;
        cursor.style.border = "none";
        cursor.style.backgroundColor = "#e6c3ff";
        setCursorSize(defaultSize);
      };

      element.addEventListener("mouseover", onMouseOver);
      element.addEventListener("mouseout", onMouseOut);

      cleanupCallbacks.push(() => {
        element.removeEventListener("mouseover", onMouseOver);
        element.removeEventListener("mouseout", onMouseOut);
      });
    });

    const handleResize = () => {
      updateDefaultSize();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrame);
      cleanupCallbacks.forEach((cleanup) => cleanup());
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed left-0 top-0 z-[99] hidden h-0 w-0 pointer-events-none rounded-full bg-[#e6c3ff] mix-blend-difference shadow-[0_0_30px_0_rgb(175,131,255)] transition-[background-color,border,width,height] duration-300 ease-out sm:block"
    ></div>
  );
};

export default Cursor;
