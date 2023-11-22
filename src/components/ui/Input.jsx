import React from "react";

export function Input({
  className = "",
  type = "text",
  id = "",
  value = "",
  onChange = () => {},
  ...props
}) {
  return (
    <input
      className={`text-black dark:text-black ${className}`}
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      {...props}
    />
  );
}
