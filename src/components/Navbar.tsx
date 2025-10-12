import Link from "next/link";
import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);
export let smoother: ScrollSmoother;

const Navbar = () => {
  useEffect(() => {
    // Temporarily disable ScrollSmoother to test basic scrolling
    // smoother = ScrollSmoother.create({
    //   wrapper: "#smooth-wrapper",
    //   content: "#smooth-content",
    //   smooth: 1.7,
    //   speed: 1.7,
    //   effects: true,
    //   autoResize: true,
    //   ignoreMobileResize: true,
    // });

    // smoother.scrollTop(0);
    // Don't pause the smoother - allow scrolling
    // smoother.paused(true);

    const links = document.querySelectorAll('[data-nav-link="true"]');
    links.forEach((elem) => {
      const element = elem as HTMLAnchorElement;
      element.addEventListener("click", (e) => {
        if (window.innerWidth > 1024) {
          e.preventDefault();
          const elem = e.currentTarget as HTMLAnchorElement;
          const section = elem.getAttribute("data-href");
          // Temporarily use regular scrolling instead of smoother
          const targetElement = document.querySelector(section || "");
          if (targetElement) {
            targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
          }
          // smoother.scrollTo(section, true, "top top");
        }
      });
    });
    // Temporarily removed resize listener for ScrollSmoother
    // window.addEventListener("resize", () => {
    //   ScrollSmoother.refresh(true);
    // });
  }, []);
  return (
    <>
      <div className="container-main fixed left-1/2 top-0 z-[9999] flex w-[var(--cWidth)] max-w-[var(--cMaxWidth)] -translate-x-1/2 items-center justify-between py-5 min-[1200px]:py-[35px]">
        <Link
          href="/"
          className="font-semibold tracking-[0.2px] text-sm min-[500px]:text-base min-[1200px]:text-lg"
          data-cursor="disable"
        >
          Damian
        </Link>
        <a
          href="mailto:example@mail.com"
          className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 font-medium tracking-[1px] text-[15px] min-[900px]:block min-[1200px]:text-base"
          data-cursor="disable"
        >
          example@mail.com
        </a>
        <ul className="nav-links flex list-none flex-col items-end gap-y-2 text-[12px] tracking-[1px] text-[#ccc] min-[500px]:flex-row min-[500px]:items-center min-[500px]:gap-x-10 min-[500px]:text-[14px] min-[500px]:text-[#eae5ec] min-[1200px]:gap-x-20 min-[1200px]:text-base">
          <li className="font-semibold">
            <Link data-href="#about" data-nav-link="true" href="#about">
              <HoverLinks text="ABOUT" />
            </Link>
          </li>
          <li className="font-semibold">
            <Link data-href="#work" data-nav-link="true" href="#work">
              <HoverLinks text="WORK" />
            </Link>
          </li>
          <li className="font-semibold">
            <Link data-href="#contact" data-nav-link="true" href="#contact">
              <HoverLinks text="CONTACT" />
            </Link>
          </li>
        </ul>
      </div>

      <div className="fixed left-0 top-0 z-[15] h-[300px] w-[300px] animate-loadingCircle rounded-full bg-[#fb8dff] shadow-[inset_-50px_40px_50px_rgba(84,0,255,0.6)] blur-[60px]"></div>
      <div className="fixed right-0 top-1/2 hidden h-[300px] w-[300px] translate-x-[calc(100%-2px)] -translate-y-1/2 rounded-full bg-[#fb8dff] shadow-[inset_-50px_40px_50px_rgba(84,0,255,0.6)] blur-[50px] animate-loadingCircle2 min-[1024px]:block"></div>
      <div className="pointer-events-none fixed left-0 top-0 z-[12] h-[130px] w-full bg-[linear-gradient(0deg,transparent,var(--backgroundColor)_70%)] opacity-0"></div>
    </>
  );
};

export default Navbar;
