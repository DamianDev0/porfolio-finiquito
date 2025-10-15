"use client";

import dynamic from "next/dynamic";

const Spline = dynamic(
  () => import("@splinetool/react-spline").then((m) => m.default),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[400px] min-[1025px]:h-[80vh] w-full items-center justify-center text-[#c873ff]/80">
        Loading 3D scene...
      </div>
    ),
  }
);

const About = () => {
  return (
    <section
      id="about"
      className="relative mx-auto flex h-auto w-[var(--cWidth)] flex-col items-center justify-center overflow-hidden bg-[#0b080c] px-6 py-[140px] min-[1025px]:h-[var(--vh)] min-[1025px]:max-w-[1920px] min-[1025px]:flex-row min-[1025px]:justify-between"
    >
      <div className="absolute left-[8%] top-[50%] h-[350px] w-[320px] -translate-y-1/2 rounded-full bg-[#c873ff]/20 blur-[140px] pointer-events-none"></div>
      <div className="absolute right-[5%] top-[60%] h-[250px] w-[250px] -translate-y-1/2 rounded-full bg-[#b87fff]/10 blur-[100px] pointer-events-none"></div>

      <div className="relative z-10 flex w-full items-center justify-center min-[1025px]:w-1/2 h-[400px] min-[1025px]:h-[92vh]">
        <Spline scene="https://prod.spline.design/k1EuzeJJHS9MPgmJ/scene.splinecode" />
      </div>

      <div className="relative z-10 mt-12 w-full text-left min-[768px]:max-w-[600px] min-[1025px]:max-w-[680px] min-[1025px]:w-1/2 min-[1025px]:pl-[6%]">
        <div className="mx-auto w-[var(--cWidth)] py-4">
          <h3 className="text-[55px] font-semibold uppercase tracking-tight text-white max-[1400px]:text-[50px] max-[900px]:text-[40px]">
            About{" "}
            <span className="bg-gradient-to-t from-[#b87fff] to-[#ffffff] bg-clip-text text-transparent">
              Me
            </span>
          </h3>
        </div>

     <p className="text-md leading-6 font-extralight text-white/80 ml-4">
  I&apos;m a multidisciplinary developer passionate about crafting immersive
  digital experiences through code and design. I focus on modern
  technologies, performance, and user-centered interfaces to turn
  complex ideas into simple, elegant, and meaningful products.
</p>

      </div>
    </section>
  );
};

export default About;
