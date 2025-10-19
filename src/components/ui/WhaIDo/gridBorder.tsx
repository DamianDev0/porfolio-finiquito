export default function GridBorder() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg
        className="absolute inset-0 w-full h-full opacity-50"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line
          x1="0"
          y1="0"
          x2="100%"
          y2="0"
          stroke="white"
          strokeWidth="1.5"
          strokeDasharray="5 5"
        />
        <line
          x1="0"
          y1="100%"
          x2="100%"
          y2="100%"
          stroke="white"
          strokeWidth="1.5"
          strokeDasharray="5 5"
        />
        <line
          x1="0"
          y1="0"
          x2="0"
          y2="100%"
          stroke="white"
          strokeWidth="1.5"
          strokeDasharray="5 5"
        />
        <line
          x1="100%"
          y1="0"
          x2="100%"
          y2="100%"
          stroke="white"
          strokeWidth="1.5"
          strokeDasharray="5 5"
        />
        <line
          x1="0"
          y1="50%"
          x2="100%"
          y2="50%"
          stroke="white"
          strokeWidth="1.5"
          strokeDasharray="5 5"
        />
      </svg>
    </div>
  );
}
