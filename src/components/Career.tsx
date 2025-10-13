"use client";

import { careerData } from "@/data/Career";

const Career = () => {
  return (
    <div className="section-container relative mx-auto flex flex-col items-center justify-center py-[120px] mb-[250px] opacity-100 max-[1025px]:mb-0 max-[1025px]:mt-[-200px] max-[1025px]:py-[70px] max-[1025px]:pt-[220px]">
      <div className="w-full relative">
        <div className="absolute left-1/2 top-[180px] bottom-0 w-[1.5px] -translate-x-1/2 bg-gradient-to-t from-[#c873ff]/25 via-[#c873ff]/80 to-transparent rounded-full shadow-[0_0_40px_8px_#c873ff50] max-[900px]:left-[5%] max-[900px]:w-[1px]">
          <div className="absolute bottom-0 left-1/2 h-[14px] w-[14px] -translate-x-1/2 translate-y-1/2 rounded-full bg-[#c873ff] shadow-[0_0_25px_8px_#d9a9ff,0_0_60px_20px_#f1d6ff] animate-pulse"></div>
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center text-center mb-[100px]">
          <h2 className="text-[60px] font-semibold leading-[1.1] uppercase tracking-[0.05em] text-white to-[#ffffff] bg-clip-text drop-shadow-[0_0_12px_rgba(200,115,255,0.4)] max-[1200px]:text-[58px] max-[900px]:text-[46px] max-[600px]:text-[36px]">
            My Career &
          </h2>
          <h2 className="text-[50px] font-semibold leading-[1.1] uppercase tracking-[0.05em] bg-gradient-to-t from-[#b87fff] to-[#ffffff] bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(200,115,255,0.4)] max-[1200px]:text-[58px] max-[900px]:text-[46px] max-[600px]:text-[36px]">
            Experience
          </h2>
        </div>

        <div className="relative flex flex-col gap-[70px]">
          {careerData.map((item) => (
            <div
              key={`${item.title}-${item.company}-${item.year}`}
              className="flex justify-between gap-6 max-[900px]:flex-col max-[900px]:gap-[10px]"
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
