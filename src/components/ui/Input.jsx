import React from "react";

export function Input({
  className = "",
  type = "text",
  id = "",
  value = "",
  onChange = () => {},
  border = "border-2",
  borderColor = { default: "border-indigo-500", dark: "border-indigo-500" },
  ...props
}) {
  return (
    <input
      className={`px-3 py-2 ${border} ${borderColor.default} dark:${borderColor.dark} ${className}`}
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      {...props}
    />
  );
}
