"use client";

import { useState } from "react";
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
  X,
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

  return (
    <div className="flex items-center justify-between p-4">
      <div className="flex items-center">
        <Logo />

        {/* Desktop Breadcrumb */}
        <Breadcrumb className="hidden md:flex ml-4">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink
                href="/"
                className="capitalize text-lg font-medium px-2"
              >
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            {routes.map((route, index) => (
              <BreadcrumbItem key={index}>
                <BreadcrumbLink
                  href={route.href}
                  className="capitalize text-lg font-medium px-2"
                >
                  {route.label}
                </BreadcrumbLink>
              </BreadcrumbItem>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Mobile Menu */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            <MenuIcon className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[300px] sm:w-[400px]">
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between mb-6">
              <Logo />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-6 w-6" />
              </Button>
            </div>
            <nav className="flex flex-col space-y-4">
              <BreadcrumbLink
                href="/"
                className="flex items-center space-x-2 text-lg font-medium"
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
