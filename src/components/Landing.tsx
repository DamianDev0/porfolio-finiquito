import { PropsWithChildren } from "react";

const Landing = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div
        className="relative mx-auto h-[var(--vh)] w-full max-w-[var(--cMaxWidth)]"
        id="landingDiv"
      >
        <div className="relative mx-auto h-full w-[var(--cWidth)] max-w-[var(--cMaxWidth)]">
          <div className="absolute left-0 top-[12%] z-[9] text-left min-[1025px]:left-auto min-[1025px]:right-[66%] min-[1025px]:top-1/2 min-[1025px]:-translate-y-1/2 min-[1200px]:right-[70%]">
            <h2 className="m-0 text-[22px] font-light tracking-[2px] text-[var(--accentColor)] min-[500px]:text-[18px] min-[768px]:text-[25px] min-[1600px]:text-[35px]">
              Hello! I&apos;m
            </h2>
            <h1 className="m-0 font-medium tracking-[2px] text-[28px] leading-[28px] min-[500px]:text-[30px] min-[500px]:leading-[30px] min-[768px]:text-[40px] min-[768px]:leading-[35px] min-[1600px]:text-[60px] min-[1600px]:leading-[55px]">
              MONCY
              <br />
              <span>YOHANNAN</span>
            </h1>
          </div>
          <div className="absolute bottom-10 right-1/2 z-[9] translate-x-1/2 text-center min-[1025px]:left-[66%] min-[1025px]:right-auto min-[1025px]:top-[51%] min-[1025px]:bottom-auto min-[1025px]:-translate-y-1/2 min-[1025px]:translate-x-0 min-[1025px]:text-left min-[1200px]:left-[70%]">
            <h3 className="m-0 text-[22px] font-light tracking-[2px] text-[var(--accentColor)] min-[500px]:text-[18px] min-[768px]:text-[25px] min-[1600px]:text-[35px]">
              A Creative
            </h3>
            <h2 className="relative m-0 ml-[-5px] mt-0 flex w-[120%] flex-nowrap text-[42px] font-semibold uppercase tracking-[2px] text-[#c481ff] min-[500px]:text-[38px] min-[768px]:text-[55px] min-[1600px]:text-[75px]">
              <div className="relative">Designer</div>
              <div className="absolute left-0 top-0">Developer</div>
              <span className="pointer-events-none absolute inset-0 h-full w-full bg-[linear-gradient(0deg,var(--backgroundColor)_40%,rgba(0,0,0,0)_110%)]"></span>
            </h2>
            <h2 className="relative mt-[-20px] ml-5 flex flex-nowrap text-[32px] font-semibold uppercase tracking-[2px] min-[500px]:text-[35px] min-[500px]:leading-[40px] min-[768px]:text-[45px] min-[768px]:leading-[42px] min-[1600px]:text-[65px] min-[1600px]:leading-[62px]">
              <div>Developer</div>
              <div className="absolute left-0 top-0">Designer</div>
            </h2>
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Landing;
