const Career = () => {
  return (
    <div className="section-container relative mx-auto flex flex-col items-center justify-center py-[120px] pb-[120px] opacity-100 mb-[250px] max-[1025px]:mb-0 max-[1025px]:mt-[-200px] max-[1025px]:py-[70px] max-[1025px]:pt-[220px]">
      <div className="w-full">
        <h2 className="title mt-12 mb-[90px] text-center text-[70px] font-normal leading-[70px] uppercase tracking-[2px] text-transparent [background:linear-gradient(0deg,#7f40ff,#ffffff)] [background-clip:text] min-[1200px]:text-[70px] max-[1400px]:text-[50px] max-[1400px]:leading-[50px] max-[600px]:w-full max-[600px]:text-[45px] max-[600px]:leading-[45px]">
          My career <span className="font-light">&</span>
          <br /> experience
        </h2>
        <div className="relative mx-auto flex w-full flex-col gap-[50px]">
          <div className="absolute left-1/2 top-[-50px] h-full w-[3px] -translate-x-1/2 bg-[linear-gradient(to_top,#aa42ff_20%,var(--accentColor)_50%,transparent_95%)] max-[900px]:left-0">
            <div className="absolute bottom-0 left-1/2 h-[10px] w-[10px] -translate-x-1/2 translate-y-1/2 rounded-full bg-[#aa42ff] shadow-[0px_0px_5px_2px_#d29bff,0px_0px_15px_8px_#d097ff,0px_0px_110px_20px_#f2c0ff] animate-timeline"></div>
          </div>
          <div className="flex flex-col gap-[50px]">
            <div className="flex justify-between gap-6 max-[900px]:flex-col max-[900px]:gap-[10px]">
              <div className="flex w-[40%] items-start justify-between gap-[50px] max-[1400px]:w-[45%] max-[1400px]:gap-[20px] max-[900px]:w-full max-[900px]:pl-[10%]">
                <div>
                  <h4 className="m-0 text-[33px] font-medium leading-[30px] tracking-[0.8px] max-[1400px]:text-[22px] max-[1400px]:leading-[24px] max-[1400px]:w-[180px] max-[900px]:w-full">
                    Position In Company
                  </h4>
                  <h5 className="mt-[10px] text-[20px] font-normal lowercase tracking-[0.7px] text-[var(--accentColor)] max-[1400px]:text-[17px]">
                    Company Name
                  </h5>
                </div>
                <h3 className="m-0 text-[48px] font-medium leading-[45px] max-[1400px]:text-[40px]">20XX</h3>
              </div>
              <p className="m-0 w-[40%] text-[18px] font-light max-[1400px]:w-[45%] max-[1400px]:text-[14px] max-[900px]:w-full max-[900px]:pl-[10%]">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim
                labore sit non ipsum temporibus quidem, deserunt eaque officiis
                mollitia ratione suscipit repellat.
              </p>
            </div>
            <div className="flex justify-between gap-6 max-[900px]:flex-col max-[900px]:gap-[10px]">
              <div className="flex w-[40%] items-start justify-between gap-[50px] max-[1400px]:w-[45%] max-[1400px]:gap-[20px] max-[900px]:w-full max-[900px]:pl-[10%]">
                <div>
                  <h4 className="m-0 text-[33px] font-medium leading-[30px] tracking-[0.8px] max-[1400px]:text-[22px] max-[1400px]:leading-[24px] max-[1400px]:w-[180px] max-[900px]:w-full">
                    Position In Company
                  </h4>
                  <h5 className="mt-[10px] text-[20px] font-normal lowercase tracking-[0.7px] text-[var(--accentColor)] max-[1400px]:text-[17px]">
                    Company Name
                  </h5>
                </div>
                <h3 className="m-0 text-[48px] font-medium leading-[45px] max-[1400px]:text-[40px]">20XX</h3>
              </div>
              <p className="m-0 w-[40%] text-[18px] font-light max-[1400px]:w-[45%] max-[1400px]:text-[14px] max-[900px]:w-full max-[900px]:pl-[10%]">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim
                labore sit non ipsum temporibus quidem, deserunt eaque officiis
                mollitia ratione suscipit repellat.
              </p>
            </div>
            <div className="flex justify-between gap-6 max-[900px]:flex-col max-[900px]:gap-[10px]">
              <div className="flex w-[40%] items-start justify-between gap-[50px] max-[1400px]:w-[45%] max-[1400px]:gap-[20px] max-[900px]:w-full max-[900px]:pl-[10%]">
                <div>
                  <h4 className="m-0 text-[33px] font-medium leading-[30px] tracking-[0.8px] max-[1400px]:text-[22px] max-[1400px]:leading-[24px] max-[1400px]:w-[180px] max-[900px]:w-full">
                    Position In Company
                  </h4>
                  <h5 className="mt-[10px] text-[20px] font-normal lowercase tracking-[0.7px] text-[var(--accentColor)] max-[1400px]:text-[17px]">
                    Company Name
                  </h5>
                </div>
                <h3 className="m-0 text-[48px] font-medium leading-[45px] max-[1400px]:text-[40px]">NOW</h3>
              </div>
              <p className="m-0 w-[40%] text-[18px] font-light max-[1400px]:w-[45%] max-[1400px]:text-[14px] max-[900px]:w-full max-[900px]:pl-[10%]">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim
                labore sit non ipsum temporibus quidem, deserunt eaque officiis
                mollitia ratione suscipit repellat.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
