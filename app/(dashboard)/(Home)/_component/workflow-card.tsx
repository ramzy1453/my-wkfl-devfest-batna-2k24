"use client";

import { motion } from "framer-motion";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

interface WorkflowCardProps {
  title: string;
  description: string;
  onClick?: () => void;
}

export function WorkflowCard({
  title,
  description,
  onClick,
}: WorkflowCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card
        className="bg-zinc-900 cursor-pointer h-[140px] transition-colors hover:bg-zinc-800"
        onClick={onClick}
      >
        <CardHeader>
          <CardTitle className="text-zinc-100">{title}</CardTitle>
          <CardDescription className="text-zinc-400">
            {description}
          </CardDescription>
        </CardHeader>
      </Card>
    </motion.div>
  );
}
