"use client";

import { SquareDashedMousePointer } from "lucide-react";
import React from "react";
import { cn } from "../lib/utils";
import Link from "next/link";
interface LogoProps {
  fontsize?: string;
  iconsize?: number;
}

export default function Logo({ fontsize = "2xl", iconsize = 20 }: LogoProps) {
  const iconClass = "stroke-white";
  const containerClass = cn(
    "text-2xl font-extrabold flex items-center gap-2",
    fontsize
  );

  return (
    <Link href="/" className={containerClass}>
      <div className="rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 p-2">
        <SquareDashedMousePointer size={iconsize} className={iconClass} />
      </div>
      <div>
        <span className="bg-gradient-to-r from-emerald-500 to-emerald-600 bg-clip-text text-transparent">
          wkl
        </span>

        <span className="text-stone-700 dark:text-stone-300">Scrape</span>
      </div>
    </Link>
  );
}
