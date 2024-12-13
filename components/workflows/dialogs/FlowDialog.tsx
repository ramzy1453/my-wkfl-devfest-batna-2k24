"use client";

import {
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
  Dialog,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "../../ui/input";
import { nodeTypesData } from "@/data/workflows";
import FlowCard from "../FlowCard";
import { motion } from "framer-motion";
import { Button } from "../../ui/button";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";

const MotionDialogContent = motion.create(DialogContent);
export default function FlowDialog() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (open) {
      setQuery("");
    }
  }, [open]);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="">
          <Plus />
        </Button>
      </DialogTrigger>
      <MotionDialogContent
        drag
        dragTransition={{ bounceStiffness: 600, bounceDamping: 10 }}
        dragConstraints={{
          top: -150,
          left: -150,
          right: 150,
          bottom: 150,
        }}
        className="sm:max-w-[425px] absolute z-50"
      >
        <DialogHeader className="space-y-4">
          <DialogTitle>Toolkit</DialogTitle>
          <DialogDescription>
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search toolkit"
            />
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col py-4 h-96 overflow-y-scroll">
          {nodeTypesData
            .filter(
              (node) =>
                node.name.toLowerCase().includes(query.toLowerCase()) ||
                node.description.toLowerCase().includes(query.toLowerCase())
            )
            .map((node, i) => (
              <FlowCard
                key={i}
                {...node}
                closeDialog={() => {
                  setOpen(false);
                }}
              />
            ))}
        </div>
      </MotionDialogContent>
    </Dialog>
  );
}
