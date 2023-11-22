import React from "react";

export default function Page({ className = "", children }) {
  return (
    <div className={`h-full dark:bg-slate-900 ${className}`}>{children}</div>
  );
}
