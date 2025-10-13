"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const WhatIDo = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const setCardRef = (el: HTMLDivElement | null, index: number) => {
    cardRefs.current[index] = el;
  };

  useEffect(() => {
    if (!ScrollTrigger.isTouch) {
      return;
    }

    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
    const handlers: Array<{ card: HTMLDivElement; handler: () => void }> = [];

    cards.forEach((card) => {
      card.classList.remove("what-noTouch");
      const handler = () => handleClick(card);
      handlers.push({ card, handler });
      card.addEventListener("click", handler);
    });

    return () => {
      handlers.forEach(({ card, handler }) => {
        card.removeEventListener("click", handler);
      });
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduceMotion.matches) {
      cardRefs.current.forEach((card) => {
        if (card) {
          card.style.opacity = "1";
          card.style.transform = "none";
        }
      });
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const container = sectionRef.current;
      if (!container) {
        return;
      }

      const track = container.querySelector<HTMLElement>("[data-what-track]");
      if (!track) {
        return;
      }

      const cards = cardRefs.current.filter(Boolean) as HTMLElement[];
      if (!cards.length) {
        return;
      }

      gsap.set(cards, { autoAlpha: 0, y: 70 });

      const mm = gsap.matchMedia();

      const desktop = mm.add("(min-width: 1024px)", () => {
        gsap.set(track, { x: 0 });

        const animation = gsap.to(track, {
          x: () => {
            const available = track.scrollWidth - window.innerWidth;
            return available > 0 ? -available : 0;
          },
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top top",
            end: () => `+=${Math.max(track.scrollWidth - window.innerWidth, 0)}`,
            scrub: true,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        const fades = cards.map((card) =>
          gsap.fromTo(
            card,
            { autoAlpha: 0.35, y: 60 },
            {
              autoAlpha: 1,
              y: 0,
              ease: "power3.out",
              scrollTrigger: {
                containerAnimation: animation,
                trigger: card,
                start: "left 75%",
                end: "right 45%",
                scrub: true,
              },
            }
          )
        );

        return () => {
          animation.kill();
          fades.forEach((fade) => fade.kill());
        };
      });

      const mobile = mm.add("(max-width: 1023px)", () => {
        const timeline = gsap.fromTo(
          cards,
          { autoAlpha: 0, y: 70 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.85,
            ease: "power3.out",
            stagger: 0.18,
            scrollTrigger: {
              trigger: container,
              start: "top 80%",
              end: "bottom 40%",
              toggleActions: "play none none reverse",
            },
          }
        );

        return () => {
          timeline.kill();
        };
      });

      return () => {
        desktop.revert();
        mobile.revert();
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="whatIDO" ref={sectionRef} data-section>
      <div className="what-box" data-section-item>
        <h2 className="title" data-section-item>
          W<span className="hat-h2">HAT</span>
          <div>
            I<span className="do-h2"> DO</span>
          </div>
        </h2>
      </div>
      <div className="what-box">
        <div className="what-box-in" data-what-track>
          <div className="what-border2">
            <svg width="100%">
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="100%"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="7,7"
              />
              <line
                x1="100%"
                y1="0"
                x2="100%"
                y2="100%"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="7,7"
              />
            </svg>
          </div>
          <div
            className="what-content what-noTouch"
            ref={(el) => setCardRef(el, 0)}
            data-what-card
          >
            <div className="what-border1">
              <svg height="100%">
                <line
                  x1="0"
                  y1="0"
                  x2="100%"
                  y2="0"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
                <line
                  x1="0"
                  y1="100%"
                  x2="100%"
                  y2="100%"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
              </svg>
            </div>
            <div className="what-corner"></div>

            <div className="what-content-in">
              <h3>DEVELOP</h3>
              <h4>Description</h4>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas
                quia aliquid laboriosam ducimus sit molestiae.
              </p>
              <h5>Skillset & tools</h5>
              <div className="what-content-flex">
                <div className="what-tags">JavaScript</div>
                <div className="what-tags">TypeScript</div>
                <div className="what-tags">Three.js</div>
                <div className="what-tags">React</div>
                <div className="what-tags">Css</div>
                <div className="what-tags">Node.js</div>
                <div className="what-tags">Next.js</div>
                <div className="what-tags">Express.js</div>
                <div className="what-tags">PHP</div>
                <div className="what-tags">MySql</div>
              </div>
              <div className="what-arrow"></div>
            </div>
          </div>
          <div
            className="what-content what-noTouch"
            ref={(el) => setCardRef(el, 1)}
            data-what-card
          >
            <div className="what-border1">
              <svg height="100%">
                <line
                  x1="0"
                  y1="100%"
                  x2="100%"
                  y2="100%"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
              </svg>
            </div>
            <div className="what-corner"></div>
            <div className="what-content-in">
              <h3>DESIGN</h3>
              <h4>Description</h4>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas
                quia aliquid laboriosam ducimus sit molestiae
              </p>
              <h5>Skillset & tools</h5>
              <div className="what-content-flex">
                <div className="what-tags">Blender</div>
                <div className="what-tags">Zbrush</div>
                <div className="what-tags">UI Design</div>
                <div className="what-tags">Motion</div>
                <div className="what-tags">Rigging</div>
                <div className="what-tags">3D Animation</div>
                <div className="what-tags">Character Design</div>
                <div className="what-tags">Modelling</div>
              </div>
              <div className="what-arrow"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatIDo;

function handleClick(container: HTMLDivElement) {
  container.classList.toggle("what-content-active");
  container.classList.remove("what-sibling");
  if (container.parentElement) {
    const siblings = Array.from(container.parentElement.children);

    siblings.forEach((sibling) => {
      if (sibling !== container) {
        sibling.classList.remove("what-content-active");
        sibling.classList.toggle("what-sibling");
      }
    });
  }
}
