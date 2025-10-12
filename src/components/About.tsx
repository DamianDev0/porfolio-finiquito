const About = () => {
  return (
    <div
      className="relative mx-auto flex h-auto w-[var(--cWidth)] flex-col items-center justify-start py-12 opacity-100 min-[600px]:justify-center min-[1025px]:h-[var(--vh)] min-[1025px]:max-w-[1920px] min-[1025px]:flex-row min-[1025px]:justify-end"
      id="about"
    >
      <div className="w-full max-w-[calc(100%-15px)] pt-12 pb-0 min-[768px]:w-[500px] min-[768px]:max-w-[calc(100%-70px)] min-[1025px]:w-1/2 min-[1025px]:py-0 min-[1025px]:pt-0 min-[1950px]:max-w-full">
        <h3 className="title text-[25px] font-normal uppercase tracking-[7px] text-[var(--accentColor)]">
          About Me
        </h3>
        <p
          className="para mt-6 text-[33px] font-semibold leading-[36px] tracking-[1px] min-[1025px]:text-[1.9vw] min-[1025px]:leading-[2.3vw] min-[1950px]:text-[2.5rem] min-[1950px]:leading-[2.7rem]"
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic quis
          dolores numquam iusto Ratione earum ducimus autem id iure pariatur
          dolorum quae maiores.
        </p>
      </div>
    </div>
  );
};

export default About;
