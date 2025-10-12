const HoverLinks = ({ text, cursor }: { text: string; cursor?: boolean }) => {
  return (
    <div
      className="group relative flex overflow-hidden whitespace-nowrap"
      data-cursor={!cursor && `disable`}
    >
      <div className="relative transition duration-300 group-hover:-translate-y-full group-hover:text-[var(--accentColor)]">
        {text}
        <div className="absolute left-0 top-full flex">{text}</div>
      </div>
    </div>
  );
};

export default HoverLinks;
