"use client";

// import { ThemeProvider } from "next-themes";
// import { ContextProvider } from "@/context/ContextProvider";
import { DroneCompareProvider } from "./DroneCompareContext";
import { DroneSearchProvider } from "./DroneSearchProvider";

export function Providers({ children }: { children: React.ReactElement }) {
  return (
    // <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
    <DroneSearchProvider>
      <DroneCompareProvider>{children}</DroneCompareProvider>
    </DroneSearchProvider>
  );
}
