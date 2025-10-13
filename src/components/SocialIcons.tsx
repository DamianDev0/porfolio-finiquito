import { useEffect } from "react";
import HoverLinks from "./HoverLinks";

const socialLinks = [
  { label: "Github", url: "https://github.com", abbr: "GH" },
  { label: "LinkedIn", url: "https://www.linkedin.com", abbr: "IN" },
  { label: "X", url: "https://x.com", abbr: "X" },
  { label: "Instagram", url: "https://www.instagram.com", abbr: "IG" },
];

const SocialIcons = () => {
  useEffect(() => {
    const social = document.getElementById("social");
    if (!social) return;

    const cleanups: Array<() => void> = [];

    social.querySelectorAll("span").forEach((item) => {
      const elem = item as HTMLElement;
      const link = elem.querySelector("a");
      if (!link) return;

      const rect = elem.getBoundingClientRect();
      let mouseX = rect.width / 2;
      let mouseY = rect.height / 2;
      let currentX = 0;
      let currentY = 0;
      let animationId = 0;

      const updatePosition = () => {
        currentX += (mouseX - currentX) * 0.1;
        currentY += (mouseY - currentY) * 0.1;

        link.style.setProperty("--siLeft", `${currentX}px`);
        link.style.setProperty("--siTop", `${currentY}px`);

        animationId = requestAnimationFrame(updatePosition);
      };

      const onMouseMove = (e: MouseEvent) => {
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (x < 40 && x > 10 && y < 40 && y > 5) {
          mouseX = x;
          mouseY = y;
        } else {
          mouseX = rect.width / 2;
          mouseY = rect.height / 2;
        }
      };

      document.addEventListener("mousemove", onMouseMove);
      updatePosition();

      cleanups.push(() => {
        document.removeEventListener("mousemove", onMouseMove);
        cancelAnimationFrame(animationId);
      });
    });

    return () => {
      cleanups.forEach((cleanup) => cleanup());
    };
  }, []);

  return (
    <div className="container-main fixed bottom-0 left-1/2 z-[99] w-[var(--cWidth)] max-w-[var(--cMaxWidth)] -translate-x-1/2">
      <div
        className="absolute bottom-5 left-[-20px] hidden flex-col gap-2 p-2 text-[#eae5ec] transition-colors duration-300 hover:text-[var(--backgroundColor)] min-[900px]:flex min-[900px]:gap-5"
        data-cursor="icons"
        id="social"
      >
        {socialLinks.map((item) => (
          <span className="relative flex h-[50px] w-[50px]" key={item.label}>
            <a
              className="absolute left-[var(--siLeft,50%)] top-[var(--siTop,50%)] flex h-[40px] w-[40px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 text-xs font-semibold uppercase tracking-widest transition-transform duration-300 will-change-[left,top] min-[900px]:text-sm"
              href={item.url}
              rel="noreferrer"
              target="_blank"
            >
              {item.abbr}
            </a>
          </span>
        ))}
      </div>
    
    </div>
  );
};

export default SocialIcons;
