import { useMemo } from "react";

export default function Stars() {
  const stars = useMemo(() => {
    return Array.from({ length: 300 }).map((_, i) => (
      <div
        key={i}
        className="star"
        style={{
          width: `${Math.random() * 2}px`,
          height: `${Math.random() * 2}px`,
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          opacity: Math.random(),
          animation: `twinkle ${2 + Math.random() * 5}s infinite alternate`,
        }}
      ></div>
    ));
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none">
      {" "}
      {/* ← Add pointer-events-none here */}
      {stars}
      <style>{`
        @keyframes twinkle {
          0% { opacity: 0.5; }
          50% { opacity: 1; }
          100% { opacity: 0.5; }
        }
        .star {
          position: absolute;
          border-radius: 50%;
          background: white;
          animation-name: twinkle;
          animation-iteration-count: infinite;
          animation-timing-function: ease-in-out;
        }
      `}</style>
    </div>
  );
}
