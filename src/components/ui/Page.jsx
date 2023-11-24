import React from "react";

export function Page({ className = "", children }) {
  return (
    <main className={`h-full dark:bg-slate-900 ${className}`}>{children}</main>
  );
}
