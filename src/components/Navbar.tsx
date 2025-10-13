"use client";

import Link from "next/link";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import HoverLinks from "./HoverLinks";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

let smoother: ScrollSmoother | null = null;

const Navbar = () => {
  useEffect(() => {
    if (window.innerWidth > 1024) {
      smoother = ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 1.5,
        effects: true,
        speed: 1,
      });
      smoother.scrollTo(0);
    }

    gsap.fromTo(
      ".nav-container",
      { y: -60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power3.out", delay: 0.3 }
    );

    const links = document.querySelectorAll('[data-nav-link="true"]');
    links.forEach((elem) => {
      const element = elem as HTMLAnchorElement;
      element.addEventListener("click", (e) => {
        e.preventDefault();
        const section = element.getAttribute("data-href");
        if (!section) return;
        const target = document.querySelector(section);
        if (target) {
          if (window.innerWidth > 1024 && smoother) {
            smoother.scrollTo(target, true, "top top");
          } else {
            target.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }
      });
    });

    return () => {
      smoother?.kill();
      smoother = null;
    };
  }, []);

  return (
    <nav className="fixed top-0 left-1/2 z-[9999] -translate-x-1/2 w-full flex justify-center py-4 sm:py-6 md:py-8">
      <ul className="nav-container flex items-center justify-center gap-x-8 sm:gap-x-12 md:gap-x-16 lg:gap-x-24 text-sm sm:text-base md:text-lg font-semibold text-[#ccc]">
        <li>
          <Link data-href="#about" data-nav-link="true" href="#about">
            <HoverLinks text="ABOUT" />
          </Link>
        </li>
        <li>
          <Link data-href="#work" data-nav-link="true" href="#work">
            <HoverLinks text="WORK" />
          </Link>
        </li>
        <li>
          <Link data-href="#contact" data-nav-link="true" href="#contact">
            <HoverLinks text="CONTACT" />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
