"use client"

import type React from "react"
import { useEffect, useState } from "react"
import Marquee from "react-fast-marquee"
import { useLoading } from "@/contexts/LoadingProvider"


export const setProgress = { fn: (value: number) => {} }

const Loading = ({ percent }: { percent: number }) => {
  const { setIsLoading } = useLoading()
  const [loaded, setLoaded] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [clicked, setClicked] = useState(false)
  const [progress, setProgressState] = useState<number>(percent)


  useEffect(() => {
    setProgress.fn = (value: number) => {
      setProgressState(value)
    }
  }, [])

  useEffect(() => {
    if (progress >= 100) {
      const timeout = setTimeout(() => {
        setLoaded(true)
        setTimeout(() => setIsLoaded(true), 1000)
      }, 600)
      return () => clearTimeout(timeout)
    }
  }, [progress])

  useEffect(() => {
    if (isLoaded) {
      setClicked(true)
      const runFX = async () => {
        const module = await import("../utils/initialFX")
        setTimeout(() => {
          module.initialFX?.()
          setIsLoading(false)
        }, 900)
      }
      runFX()
    }
  }, [isLoaded, setIsLoading])

  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`)
    e.currentTarget.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`)
  }

  return (
    <>
      <header className="fixed top-0 left-1/2 -translate-x-1/2 z-[99999] flex justify-between w-full max-w-[var(--cMaxWidth)] px-5 md:px-10 text-black">
        <a href="/#" data-cursor="disable" className="font-bold text-sm md:text-lg tracking-tight">
          DamianDev
        </a>
        <div className={`transition-opacity duration-500 ${clicked ? "opacity-0" : "opacity-100"}`}>
          <div className="relative w-[200px] h-[100px] overflow-hidden scale-[0.4] origin-top-right">
            <div className="absolute w-[1200px] animate-loaderGame">
              {Array.from({ length: 27 }).map((_, i) => {
                const uniqueId = `loader-bar-${i}-${Math.random().toString(36).substring(2, 11)}`
                return (
                  <div
                    key={uniqueId}
                    className={`float-left mx-5 w-[10px] h-[60px] bg-black ${
                      i % 2 === 0 ? "mt-[40px]" : "mb-[40px]"
                    }`}
                  />
                )
              })}
            </div>
            <div className="absolute left-[20%] top-0 w-[15px] h-[15px] rounded-full bg-[#a87cff] animate-ball25"></div>
          </div>
        </div>
      </header>

      <div className="fixed inset-0 bg-[#eae5ec] flex flex-col items-center justify-center z-[9999] overflow-hidden">
        <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 text-black font-semibold text-[8vw] md:text-[5vw] uppercase leading-none whitespace-nowrap opacity-90">
          <Marquee gradient={false} speed={80}>
            <span className="px-12 relative before:content-[''] before:absolute before:w-4 before:h-4 before:bg-black before:rounded-full before:top-1/2 before:left-0 before:-translate-x-1/2 before:-translate-y-1/2">
              Creative Developer
            </span>
            <span className="px-12">Creative Mobile Developer</span>
          </Marquee>
        </div>

        <div
          className={`relative flex items-center justify-center transition-all duration-[800ms] ease-in-out ${
            clicked ? "opacity-0 scale-0" : "opacity-100 scale-100"
          }`}
        >
          <div className="relative flex items-center justify-center bg-gradient-to-r from-[#8b5cf6] via-[#7c3aed] to-[#6366f1] p-[1px] rounded-full shadow-[0_8px_32px_rgba(139,92,246,0.3)]">
            <div className="flex items-center justify-between bg-black text-white rounded-full px-8 py-4 w-[300px]">
              <span className="font-semibold text-sm tracking-wide text-white/90">LOADING</span>
              <div className="flex items-center gap-2 text-sm">
                <span className="font-medium text-white">{progress}%</span>
                <div className="w-[8px] h-[20px] bg-gradient-to-b from-white via-white/90 to-white/70 rounded-[2px]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Loading
