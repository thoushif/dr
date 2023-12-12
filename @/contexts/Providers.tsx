"use client";

// import { ThemeProvider } from "next-themes";
// import { ContextProvider } from "@/context/ContextProvider";
import { DroneCompareProvider } from "./DroneCompareContext";

export function Providers({ children }: { children: React.ReactElement }) {
  return (
    // <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
    <DroneCompareProvider>{children}</DroneCompareProvider>
    // </ThemeProvider>
  );
}
