"use client ";

import React from "react";
import { Card, CardContent } from "./ui/card";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import { ShuffleIcon } from "lucide-react";

export default function Workflowcard({ workflow }: { workflow: Workflows }) {
  return (
    <Card className="border border-separate  shadow-sm rounded-lg overflow-hidden  hover:shadow-md  dark:shadow-primary">
      <Link href={`/workflows/${workflow.id}`}>
        <CardContent className="p-4 flex items-center justify-between h-[100px]">
          <div>
            <h3 className="text-base font-bold text-muted-foreground flex items-center">
              {workflow.name}
            </h3>
          </div>
          <div
            className={cn(
              buttonVariants({ variant: "outline", size: "sm" }),
              "flex items-center gap-2"
            )}
          >
            <ShuffleIcon size={16} />
            Edit
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}
