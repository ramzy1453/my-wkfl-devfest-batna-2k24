import BreadcrumbHeader from "@/components/breadcrumbheader";
import DesktopSidebar from "@/components/Sidebar";
import { ModeToggle } from "@/components/themetoggle";
import { Separator } from "@radix-ui/react-context-menu";
import Link from "next/link";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      <DesktopSidebar />

      <div className="flex flex-col flex-1">
        <header className="flex items-center justify-between px-6 py-4 h-[50px]">
          <BreadcrumbHeader />
          <div className="flex items-center gap-1">
            <ModeToggle />
          </div>
        </header>

        <Separator className="border-t" />

        <main className="flex-1 overflow-auto py-4 container">
          <div className="text-accent-foreground">{children}</div>
        </main>
      </div>
    </div>
  );
}
