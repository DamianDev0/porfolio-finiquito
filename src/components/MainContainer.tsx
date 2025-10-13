import { Suspense, useEffect } from "react";
import About from "./About";
import Career from "./Career";
import Contact from "./Contact";
import Cursor from "./Cursor";
import Landing from "./Landing";
import Navbar from "./Navbar";
import SocialIcons from "./SocialIcons";
import WhatIDo from "./WhatIDo";
import Work from "./Work";
import setSplitText from "../utils/splitText";
import TechStack from "./TechStack";
import useGsapSectionReveal from "@/hooks/useGsapSectionReveal";


const MainContainer = () => {
  useGsapSectionReveal();

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    let scrollTriggerModule: typeof import("gsap/ScrollTrigger") | null = null;

    const loadScrollTrigger = async () => {
      scrollTriggerModule ??= await import("gsap/ScrollTrigger");

      return scrollTriggerModule.ScrollTrigger;
    };

    const refreshScrollTrigger = async () => {
      const ScrollTrigger = await loadScrollTrigger();
      ScrollTrigger.refresh();
    };

    const resizeHandler = () => {
      setSplitText();
      void refreshScrollTrigger();
    };

    resizeHandler();
    window.addEventListener("resize", resizeHandler);

    const refreshTimeout = window.setTimeout(() => {
      void refreshScrollTrigger();
    }, 500);

    return () => {
      window.removeEventListener("resize", resizeHandler);
      window.clearTimeout(refreshTimeout);
    };
  }, []);

  return (
    <div className="container-main min-h-[var(--vh)]">
      <Cursor />
      <Navbar />
      <SocialIcons />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <div className="container-main">
            <Landing />
            <About />
            <WhatIDo />
            <Career />
            <Work />
            <Suspense fallback={<div>Loading....</div>}>
            <TechStack />
            </Suspense>
            <Contact />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContainer;
