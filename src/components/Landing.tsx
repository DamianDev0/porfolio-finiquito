const Landing = () => {
  return (
    <section
      className="relative mx-auto flex h-[var(--vh)] w-full max-w-[var(--cMaxWidth)] items-center"
      id="landingDiv"
    >
      <div className="relative mx-auto flex h-full w-[var(--cWidth)] max-w-[var(--cMaxWidth)] flex-col justify-between px-6 py-16 text-white md:flex-row md:items-center md:py-24">
        <div className="max-w-xl text-left">
          <p
            className="text-sm font-light uppercase tracking-[0.5rem] text-[var(--accentColor)] min-[768px]:text-base"
            data-hero-animate
          >
            Hola, soy
          </p>
          <h1
            className="mt-3 text-4xl font-semibold tracking-tight leading-[1.05] min-[500px]:text-5xl min-[768px]:text-6xl"
            data-hero-animate
          >
            Damian
            <span className="mt-1 block text-lg font-normal uppercase tracking-[0.6rem] text-white/60 min-[500px]:text-xl min-[768px]:text-2xl">
              Creative Developer
            </span>
          </h1>
        </div>
        <div className="mt-16 flex flex-col items-center text-center md:mt-0 md:items-end md:text-right">
          <p
            className="text-sm font-light uppercase tracking-[0.5rem] text-[var(--accentColor)] min-[768px]:text-base"
            data-hero-animate
          >
            A creative
          </p>
          <div
            className="mt-4 space-y-3 text-4xl font-semibold uppercase leading-none min-[500px]:text-5xl min-[768px]:text-6xl"
            data-hero-animate
          >
            <span className="block text-[#c481ff]">Developer</span>
            <span className="block text-white/30">Designer</span>
          </div>
          <p
            className="mt-6 max-w-sm text-sm leading-relaxed text-white/70 min-[768px]:text-base"
            data-hero-animate
          >
            Transformo ideas en experiencias digitales elegantes y funcionales con
            enfoque en el detalle y la accesibilidad.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Landing;
