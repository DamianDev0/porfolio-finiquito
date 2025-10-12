import { useState } from "react";

interface Props {
  image: string;
  alt?: string;
  video?: string;
  link?: string;
}

const WorkImage = (props: Props) => {
  const [isVideo, setIsVideo] = useState(false);
  const [video, setVideo] = useState("");
  const handleMouseEnter = async () => {
    if (props.video) {
      setIsVideo(true);
      const response = await fetch(`src/assets/${props.video}`);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      setVideo(blobUrl);
    }
  };

  return (
    <div className="flex w-full justify-center">
      <a
        className="group relative inline-flex"
        href={props.link}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setIsVideo(false)}
        rel={props.link ? "noreferrer" : undefined}
        target={props.link ? "_blank" : undefined}
        data-cursor={"disable"}
      >
        {props.link && (
          <div className="absolute bottom-2 right-2 flex h-[50px] w-[50px] items-center justify-center rounded-full bg-[var(--backgroundColor)] text-[25px] opacity-0 shadow-[0_0_10px_rgba(255,255,255,0.5),inset_0_0_10px_#393939] transition-opacity duration-300 group-hover:opacity-100">
            ↗
          </div>
        )}
        <img
          alt={props.alt}
          className="max-h-[350px] max-w-full max-[900px]:max-h-[250px] max-[650px]:max-h-[200px]"
          src={props.image}
        />
        {isVideo && (
          <video
            autoPlay
            className="absolute inset-0 h-full w-full bg-black object-cover"
            loop
            muted
            playsInline
            src={video}
          ></video>
        )}
      </a>
    </div>
  );
};

export default WorkImage;
