"use client";

import { useEffect, useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "../components/ui/breadcrumb";
import {
  CoinsIcon,
  Layers2Icon,
  MenuIcon,
  ShieldCheckIcon,
} from "lucide-react";
import Logo from "@/components/workflows/dialogs/Logo";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const routes = [
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

export default function ResponsiveBreadcrumbHeader() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth > 768) setIsOpen(false);
      else setIsOpen(true);
    });
  }, []);
  return (
    <div className="flex items-center justify-center flex-1 p-4">
      <div className="flex justify-between items-center w-full">
        <Logo />
        <Breadcrumb className="hidden md:flex ml-8 justify-center items-center">
          <BreadcrumbList className="space-x-2 ml-3">
            {routes.map((route, index) => (
              <BreadcrumbItem key={index}>
                <BreadcrumbLink
                  href={route.href}
                  className="capitalize text-lg font-bold"
                >
                  {route.label}
                </BreadcrumbLink>
              </BreadcrumbItem>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
        <div className="w-12 h-12"></div>
      </div>

      {/* mobile version */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        {isOpen && (
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <MenuIcon className="h-6 w-6" />
            </Button>
          </SheetTrigger>
        )}
        <SheetContent side="left" className="w-[400px] sm:w-[600px]">
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between">
              <Logo />
            </div>
            <nav className="flex flex-col space-y-4">
              <BreadcrumbLink
                href="/"
                className="flex items-center my-2 space-x-2 text-lg font-medium"
              >
                <Layers2Icon className="h-5 w-5" />
                <span>Home</span>
              </BreadcrumbLink>
              {routes.map((route, index) => (
                <BreadcrumbLink
                  key={index}
                  href={route.href}
                  className="flex items-center space-x-2 text-lg font-medium"
                >
                  <route.icon className="h-5 w-5" />
                  <span>{route.label}</span>
                </BreadcrumbLink>
              ))}
            </nav>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
