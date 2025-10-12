import {
  lazy,
  PropsWithChildren,
  Suspense,
  useEffect,
  useState,
} from "react";
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

const TechStack = lazy(() => import("./TechStack"));

const MainContainer = ({ children }: PropsWithChildren) => {
  const [isDesktopView, setIsDesktopView] = useState<boolean>(() => {
    if (typeof window === "undefined") {
      return true;
    }
    return window.innerWidth > 1024;
  });

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const resizeHandler = () => {
      setSplitText();
      setIsDesktopView(window.innerWidth > 1024);
      
      // Refresh ScrollTrigger after layout changes
      const { ScrollTrigger } = require("gsap/ScrollTrigger");
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
    };
    
    resizeHandler();
    window.addEventListener("resize", resizeHandler);
    
    // Initial ScrollTrigger refresh after component mount
    setTimeout(() => {
      const { ScrollTrigger } = require("gsap/ScrollTrigger");
      ScrollTrigger.refresh();
    }, 500);
    
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  // Remove the immediate setLoading(100) - let the Character component handle loading

  return (
    <div className="container-main min-h-[var(--vh)]">
      <Cursor />
      <Navbar />
      <SocialIcons />
      {isDesktopView && children}
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <div className="container-main">
            <Landing>{!isDesktopView && children}</Landing>
            <About />
            <WhatIDo />
            <Career />
            <Work />
            {isDesktopView && (
              <Suspense fallback={<div>Loading....</div>}>
                <TechStack />
              </Suspense>
            )}
            <Contact />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContainer;
