import React from "react";

interface DecoCornerProps {
  className?: string; // e.g., "top-4 left-4"
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}

export default function DecoCorner({ position, className = "" }: DecoCornerProps) {
  // Rotate the L-shape depending on its position
  const rotationMap = {
    "top-left": "rotate-0",
    "top-right": "rotate-90",
    "bottom-right": "rotate-180",
    "bottom-left": "rotate-270",
  };

  return (
    <div className={`absolute pointer-events-none w-10 h-10 ${rotationMap[position]} ${className}`} id={`deco-corner-${position}`}>
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-gold opacity-80"
      >
        {/* Outer thicker line */}
        <path d="M 0 0 L 40 0 M 0 0 L 0 40" stroke="currentColor" strokeWidth="2.5" />
        {/* Middle thin line */}
        <path d="M 6 6 L 30 6 M 6 6 L 6 30" stroke="currentColor" strokeWidth="1" />
        {/* Inner thin line */}
        <path d="M 12 12 L 20 12 M 12 12 L 12 20" stroke="currentColor" strokeWidth="1" />
        {/* Little diamond accent near the inner corner */}
        <rect x="15" y="15" width="4" height="4" transform="rotate(45 17 17)" fill="currentColor" />
      </svg>
    </div>
  );
}

/**
 * Renders four corners inside a relative parent to create the classic menu frame
 */
export function DecoFrame() {
  return (
    <>
      <DecoCorner position="top-left" className="top-3 left-3" />
      <DecoCorner position="top-right" className="top-3 right-3" />
      <DecoCorner position="bottom-left" className="bottom-3 left-3" />
      <DecoCorner position="bottom-right" className="bottom-3 right-3" />
    </>
  );
}
