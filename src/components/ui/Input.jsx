import React from "react";

export function Input({
  className = "",
  type = "text",
  id = "",
  value = "",
  onChange = () => {},
  outline = "outline outline-2",
  outlineColor = {
    default: "outline-gray-200 focus:outline-indigo-600",
    dark: "outline-gray-200 dark:focus:outline-indigo-600",
  },
  textColor = {
    default: "text-gray-800",
    dark: "text-gray-800",
  },
  placeholderColor = {
    default: "placeholder-gray-300",
    dark: "placeholder-gray-300",
  },
  ...props
}) {
  return (
    <input
      className={`px-3 py-2 ${outline} ${outlineColor.default} dark:${outlineColor.dark} ${className} ${textColor.default} dark:${textColor.dark} ${placeholderColor.default} dark:${placeholderColor.dark}}`}
      id={id}
      type={type}
      value={value}
      onChange={() => {
        console.log(props);
        onChange();
      }}
      {...props}
    />
  );
}
