"use client";
import { SessionProvider } from "next-auth/react";

function SessionLayout({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}

export default SessionLayout;
