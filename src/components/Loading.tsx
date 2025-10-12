"use client"

import Link from "next/link";
import { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import { useLoading } from "@/contexts/LoadingProvider";

export const setProgress = { fn: (value: number) => {} };

const Loading = ({ percent }: { percent: number }) => {
  const { setIsLoading } = useLoading();
  const [isLoaded, setIsLoaded] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [progress, setProgressState] = useState<number>(0);

  // Update progress when percent prop changes
  useEffect(() => {
    setProgressState(percent);
  }, [percent]);

  useEffect(() => {
    setProgress.fn = (value: number) => {
      setProgressState(value);
    };
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      const timeout = setTimeout(() => {
        setIsLoaded(true);
      }, 1600);
      return () => clearTimeout(timeout);
    }
  }, [progress]);

  useEffect(() => {
    if (isLoaded) {
      setClicked(true);
      const runFX = async () => {
        const fxModule = await import("../utils/initialFX");
        setTimeout(() => {
          fxModule.initialFX?.();
          setIsLoading(false);
        }, 900);
      };
      runFX();
    }
  }, [isLoaded, setIsLoading]);

  return (
    <>
      <header className="fixed top-0 left-1/2 z-[99999] flex w-full max-w-[var(--cMaxWidth)] -translate-x-1/2 justify-between px-5 text-black md:px-10">
        <Link
          className="font-bold text-sm tracking-tight md:text-lg"
          data-cursor="disable"
          href="/"
        >
          DamianDev
        </Link>
        <div className={`transition-opacity duration-500 ${clicked ? "opacity-0" : "opacity-100"}`}>
          <div className="relative h-[100px] w-[200px] origin-top-right scale-[0.4] overflow-hidden">
            <div className="absolute w-[1200px] animate-loaderGame">
              {Array.from({ length: 27 }).map((_, i) => {
                const uniqueId = `loader-bar-${i}-${Math.random().toString(36).substring(2, 11)}`;
                return (
                  <div
                    key={uniqueId}
                    className={`float-left mx-5 h-[60px] w-[10px] bg-black ${
                      i % 2 === 0 ? "mt-[40px]" : "mb-[40px]"
                    }`}
                  />
                );
              })}
            </div>
            <div className="absolute left-[20%] top-0 h-[15px] w-[15px] rounded-full bg-[#a87cff] animate-ball25"></div>
          </div>
        </div>
      </header>

      <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden bg-[#eae5ec]">
        <div className="absolute left-0 top-1/2 w-full -translate-y-1/2 whitespace-nowrap text-[8vw] font-semibold uppercase leading-none text-black opacity-90 md:text-[5vw]">
          <Marquee gradient={false} speed={80}>
            <span className="relative px-12 before:absolute before:left-0 before:top-1/2 before:h-4 before:w-4 before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-full before:bg-black before:content-['']">
              Creative Developer
            </span>
            <span className="px-12">Creative Mobile Developer</span>
          </Marquee>
        </div>

        <div
          className={`relative flex items-center justify-center transition-all duration-[800ms] ease-in-out ${
            clicked ? "scale-0 opacity-0" : "scale-100 opacity-100"
          }`}
        >
          <div className="relative flex items-center justify-center rounded-full bg-gradient-to-r from-[#8b5cf6] via-[#7c3aed] to-[#6366f1] p-[1px] shadow-[0_8px_32px_rgba(139,92,246,0.3)]">
            <div className="flex w-[300px] items-center justify-between rounded-full bg-black px-8 py-4 text-white">
              <span className="text-sm font-semibold tracking-wide text-white/90">LOADING</span>
              <div className="flex items-center gap-2 text-sm">
                <span className="font-medium text-white">{progress}%</span>
                <div className="h-[20px] w-[8px] rounded-[2px] bg-gradient-to-b from-white via-white/90 to-white/70"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Loading;
