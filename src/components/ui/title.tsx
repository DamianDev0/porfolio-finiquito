interface TitleProps {
  span1: string;
  span2: string;
  className?: string;
}

const Title = ({ span1, span2, className = "" }: TitleProps) => {
  return (
    <div
      className={`flex flex-col items-start text-left 
      w-full px-6 lg:pl-[8%] mb-16 ${className}`}
    >
      <h2
        className="text-[clamp(2.9rem,7vw+6px,7rem)] 
        sm:text-[clamp(3.8rem,8vw+8px,8.5rem)] 
        md:text-[clamp(4rem,7vw+8px,8rem)] 
        lg:text-[clamp(4rem,6vw+8px,7.5rem)] 
        leading-[1.05] font-semibold uppercase tracking-[3px] break-words"
      >
        <span className="text-white/80 block max-w-[95vw]">{span1}</span>
        <span className="text-[var(--accentColor)] block max-w-[95vw]">{span2}</span>
      </h2>
    </div>
  );
};

export default Title;
