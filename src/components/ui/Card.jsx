import React from "react";

export function Card({
  className = "",
  row = false,
  children,
  bg = { default: "bg-white", dark: "bg-black" },
}) {
  return (
    <div
      className={`flex ${!row && "flex-col"} ${bg.default} dark:${
        bg.dark
      }  ${className}`}
    >
      {children}
    </div>
  );
}
