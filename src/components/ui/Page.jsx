import React from "react";

export default function Page({ className = "", children }) {
  return <div className={`h-full ${className}`}>{children}</div>;
}
