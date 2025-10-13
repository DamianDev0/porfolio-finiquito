"use client";

import { careerData } from "@/data/Career";

const Career = () => {
  return (
    <div
      className="section-container relative mx-auto flex flex-col items-center justify-center py-[120px] mb-[250px] opacity-100 max-[1025px]:mb-0 max-[1025px]:mt-[-200px] max-[1025px]:py-[70px] max-[1025px]:pt-[220px]"
      data-section
    >
      <div className="w-full relative" data-section-item>
        <div className="absolute left-1/2 top-[180px] bottom-0 w-[1.5px] -translate-x-1/2 bg-gradient-to-t from-[#c873ff]/20 via-[#c873ff]/70 to-transparent rounded-full shadow-[0_0_40px_6px_#c873ff40] max-[900px]:left-[5%]">
          <div className="absolute bottom-0 left-1/2 h-[14px] w-[14px] -translate-x-1/2 translate-y-1/2 rounded-full bg-[#c873ff] shadow-[0_0_15px_4px_#e1a8ff,0_0_40px_10px_#d89aff,0_0_120px_30px_#f4d0ff] animate-pulse"></div>
        </div>

        <div className="relative z-10 flex justify-center items-center" data-section-item>
          <h1 className="text-[45px] font-semibold leading-[50px] tracking-[0.15em] uppercase bg-gradient-to-t from-[#a96dff] to-[#ffffff] bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(200,115,255,0.6)]" data-section-item>
            Experience
          </h1>
        </div>

        <div className="relative mt-[100px] flex flex-col gap-[70px]" data-section-item>
          {careerData.map((item) => (
            <div
              key={`${item.title}-${item.company}-${item.year}`}
              className="flex justify-between gap-6 max-[900px]:flex-col max-[900px]:gap-[10px]"
              data-section-item
            >
              <div className="flex w-[40%] items-start justify-between gap-[50px] max-[1400px]:w-[45%] max-[900px]:w-full max-[900px]:pl-[10%]">
                <div>
                  <h4 className="m-0 text-[33px] font-medium leading-[30px] tracking-[0.8px] text-white max-[1400px]:text-[22px]">
                    {item.title}
                  </h4>
                  <h5 className="mt-[10px] text-[15px] font-normal capitalize tracking-[0.7px] text-[#cd9feb] max-[1400px]:text-[15px]">
                    {item.company}
                  </h5>
                </div>
                <h3 className="m-0 text-[48px] font-medium leading-[45px] text-[#dba8ff] max-[1400px]:text-[40px]">
                  {item.year}
                </h3>
              </div>

              <p className="m-0 w-[40%] text-[18px] font-light text-gray-300 leading-[30px] max-[1400px]:w-[45%] max-[1400px]:text-[14px] max-[900px]:w-full max-[900px]:pl-[10%]">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Career;
