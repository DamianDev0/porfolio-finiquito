const socials = [
  { label: "Github", url: "https://github.com" },
  { label: "Linkedin", url: "https://www.linkedin.com" },
  { label: "Twitter", url: "https://x.com" },
  { label: "Instagram", url: "https://www.instagram.com" },
];

const Contact = () => {
  return (
    <div
      className="section-container mx-auto mt-[200px] pb-[100px] max-[900px]:mt-[100px] max-[900px]:pb-[50px]"
      id="contact"
    >
      <div className="w-full max-[900px]:w-[calc(100%-25px)]">
        <h3 className="title m-0 text-[60px] font-normal uppercase max-[1600px]:text-[50px] max-[1300px]:text-[40px]">
          Contact
        </h3>
        <div className="mt-10 flex justify-between gap-16 max-[900px]:mt-6 max-[900px]:flex-col">
          <div className="flex flex-col">
            <h4 className="m-0 font-medium opacity-60 max-[900px]:mt-5">Email</h4>
            <p className="mt-[10px] mb-5 max-[1300px]:mt-0 max-[900px]:mb-0">
              <a
                className="transition-colors hover:text-[var(--accentColor)]"
                data-cursor="disable"
                href="mailto:example@mail.com"
              >
                example@mail.com
              </a>
            </p>
            <h4 className="m-0 font-medium opacity-60 max-[900px]:mt-5">
              Phone
            </h4>
            <p className="mt-[10px] mb-5 max-[1300px]:mt-0 max-[900px]:mb-0">
              <a
                className="transition-colors hover:text-[var(--accentColor)]"
                data-cursor="disable"
                href="tel:+9199999999"
              >
                +91 99999 99999
              </a>
            </p>
          </div>
          <div className="flex flex-col">
            <h4 className="m-0 font-medium opacity-60 max-[900px]:mt-5">Social</h4>
            {socials.map((network) => (
              <a
                className="flex items-center gap-2 border-b border-[#ccc] py-3 text-[25px] transition-colors hover:text-[var(--accentColor)] max-[1600px]:text-[22px] max-[1300px]:text-[20px]"
                data-cursor="disable"
                href={network.url}
                key={network.label}
                rel="noreferrer"
                target="_blank"
              >
                {network.label} <span aria-hidden="true">↗</span>
              </a>
            ))}
          </div>
          <div className="flex flex-col">
            <h2 className="m-0 text-[23px] font-normal max-[1600px]:text-[20px] max-[1300px]:text-[18px]">
              Designed and Developed <br /> by
              <span className="text-[var(--accentColor)]"> Damian</span>
            </h2>
            <h5 className="mt-4 flex items-center gap-2 text-[20px] font-medium leading-[20px] opacity-50">
              <span aria-hidden="true">©</span> 2024
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
