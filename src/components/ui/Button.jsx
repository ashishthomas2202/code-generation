import React from "react";

export default function Button({
  className = "",
  type = "button",
  onClick = () => {},
  padding = "px-5 py-3",
  variant = "primary",
  children,
  ...props
}) {
  const variants = {
    primary: "bg-indigo-500 hover:bg-indigo-600 text-white",
    secondary: "bg-gray-500 hover:bg-gray-600 text-white",
    success: "bg-green-500 hover:bg-green-600 text-white",
    danger: "bg-red-500 hover:bg-red-600 text-white",
    warning: "bg-yellow-500 hover:bg-yellow-600 text-white",
    info: "bg-blue-500 hover:bg-blue-600 text-white",
    light: "bg-gray-200 hover:bg-gray-300 text-gray-700",
    dark: "bg-gray-800 hover:bg-gray-900 text-white",
  };
  return (
    <button
      type={type}
      className={`${padding} ${variants[variant]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}
