"use client";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "~/components/ui/sonner";

function SessionLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      {children}
      <Toaster />
    </SessionProvider>
  );
}

export default SessionLayout;
