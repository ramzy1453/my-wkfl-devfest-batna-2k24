"use client";

import {
  CoinsIcon,
  HomeIcon,
  Layers2Icon,
  MenuIcon,
  ShieldCheckIcon,
} from "lucide-react";
import React, { useState } from "react";
import Logo from "@/components/workflows/dialogs/Logo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button, buttonVariants } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const routes = [
  {
    label: "Home",
    href: "/",
    icon: HomeIcon,
  },
  {
    label: "Workflow",
    href: "/workflows",
    icon: Layers2Icon,
  },
  {
    label: "Credentials",
    href: "/credentials",
    icon: ShieldCheckIcon,
  },
  {
    label: "Billing",
    href: "/billing",
    icon: CoinsIcon,
  },
];

export default function DesktopSidebar() {
  const pathname = usePathname();
  const activeRoute = routes.find(
    (route) => route.href.length > 0 && pathname.includes(route.href)
  );

  return (
    <div
      className="hidden relative md:block h-screen overflow-hidden bg-primary/5 
    dark:bg-secondary/30 dark:text-foreground border-r-2 border-red-400 flex-1"
    >
      <div className="flex items-center justify-center gap-2 border-b-[1px] border-separate p-4">
        <Logo />
      </div>

      <nav className="flex flex-col gap-2 p-4">
        {routes.map((route) => (
          <Link
            key={route.label}
            href={route.href}
            className={buttonVariants({
              variant:
                activeRoute?.href === route.href
                  ? "sidebarActiveItem"
                  : "sidebarItem",
            })}
          >
            <route.icon className="text-accent-foreground" size={20} />
            <span>{route.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
export function MobilesSidebar() {
  const pathname = usePathname();
  const activeroute =
    routes.find(
      (route) => route.href.length > 0 && pathname.includes(route.href)
    ) || routes[0];
  const [open, setopen] = useState(false);

  return (
    <div className="block border-separate bg-background md:hidden">
      <nav className="container flex">
        <Sheet onOpenChange={setopen} open={open}>
          <SheetTrigger asChild>
            <Button variant={"ghost"} className="mr-2" size={"icon"}>
              <MenuIcon></MenuIcon>
            </Button>
          </SheetTrigger>
          <SheetContent
            className="w-[300px] sm:w-[540px] space-y-4 "
            side={"left"}
          >
            <Logo />
            <div className="flex flex-col gap-1">
              <nav className="flex flex-col gap-2 p-4">
                {routes.map((route) => (
                  <Link
                    key={route.label}
                    href={route.href}
                    className={buttonVariants({
                      variant:
                        activeroute.href === route.href
                          ? "sidebarActiveItem"
                          : "sidebarItem",
                    })}
                    onClick={() => setopen((prev) => !prev)}
                  >
                    <route.icon className="text-accent-foreground" size={20} />
                    <span>{route.label}</span>
                  </Link>
                ))}
              </nav>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  );
}
