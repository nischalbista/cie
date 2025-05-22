import React, { useState } from "react";

interface SessionTooltipProps {
  children: React.ReactNode;
  text: string;
}

const SessionTooltip: React.FC<SessionTooltipProps> = ({ children, text }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <span
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      tabIndex={0}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
    >
      {children}
      {hovered && (
        <span
          style={{
            position: "absolute",
            bottom: "120%",
            left: "50%",
            transform: "translateX(-50%)",
            background: "#2d3748",
            color: "#fff",
            padding: "6px 12px",
            borderRadius: 6,
            fontSize: 13,
            fontWeight: 500,
            whiteSpace: "nowrap",
            zIndex: 100,
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            pointerEvents: "none",
          }}
        >
          {text}
        </span>
      )}
    </span>
  );
};

export default SessionTooltip;
