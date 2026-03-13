"use client";
import { TDSThemeProvider } from "@toss/tds-mobile";
import { ReactNode } from "react";

export default function TDSProvider({ children }: { children: ReactNode }) {
  return <TDSThemeProvider>{children}</TDSThemeProvider>;
}
