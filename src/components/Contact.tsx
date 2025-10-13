"use client";

import { ExternalLink } from "lucide-react";

const socials = [
  { label: "Github", url: "https://github.com" },
  { label: "Linkedin", url: "https://www.linkedin.com" },
  { label: "Twitter", url: "https://x.com" },
  { label: "Instagram", url: "https://www.instagram.com" },
];

export default function Contact() {
  const currentYear = new Date().getFullYear();

  return (
    <section
      id="contact"
      className="relative mx-auto mt-[200px] w-[var(--cWidth)] max-w-[1920px] pb-[120px] text-white max-[1025px]:mt-[120px] max-[1025px]:pb-[60px]"
    >
      <div className="w-full px-6">
        <h3 className="text-[65px] font-normal uppercase tracking-[2px] max-[1600px]:text-[55px] max-[1300px]:text-[42px] max-[600px]:text-[34px]">
          Contact
        </h3>

        <div className="mt-16 flex justify-between gap-20 max-[1025px]:mt-10 max-[1025px]:flex-col max-[1025px]:gap-10">
          <div className="flex flex-col">
            <h4 className="text-lg font-semibold opacity-60">Email</h4>
            <a href="mailto:example@mail.com" className="mt-2 mb-8 text-md">
              dg997678@gmail.com
            </a>

            <h4 className="text-lg font-semibold opacity-60">Location</h4>
            <p className="mt-2 text-md">Medellin, Colombia</p>
          </div>

          <div className="flex flex-col">
            <h4 className="text-lg font-semibold opacity-60">Social</h4>
            <div className="mt-3 flex flex-col">
              {socials.map((item) => (
                <a
                  key={item.label}
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 border-b border-white/20 py-3 text-md transition-colors hover:text-[var(--accentColor)]"
                >
                  {item.label} <ExternalLink className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-center max-[1025px]:justify-start">
            <h2 className="text-[24px] font-normal leading-snug max-[1600px]:text-[21px] max-[1300px]:text-[19px]">
              Developed <br />
              by{" "}
              <span className="text-[var(--accentColor)]">Damian Garcia</span>
            </h2>
            <h5 className="mt-4 flex items-center gap-2 text-[20px] font-medium opacity-50">
              © {currentYear}
            </h5>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute top-0 right-0 -z-10">
        <div className="h-[400px] w-[400px] rounded-full bg-[#a16eff]/20 blur-[160px]" />
      </div>
    </section>
  );
}
