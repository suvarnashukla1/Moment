import React, { useState, useEffect } from "react";

const EmojiCursor = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      setCursorPosition({
        x: event.clientX,
        y: event.clientY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      style={{
        position: "fixed", 
        top: `${cursorPosition.y}px`,
        left: `${cursorPosition.x}px`,
        transform: "translate(-50%, -50%)",
        pointerEvents: "none", 
      }}
    >
      <span role="img" aria-label="flower emoji" className="text-4xl">
      🌸
      </span>
    </div>
  );
};

export default EmojiCursor;
