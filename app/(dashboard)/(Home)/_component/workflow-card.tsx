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
        className="bg-background cursor-pointer h-[140px] transition-colors hover:bg-background/80"
        onClick={onClick}
      >
        <CardHeader>
          <CardTitle className="text-foreground">{title}</CardTitle>
          <CardDescription className="text-muted-foreground">
            {description}
          </CardDescription>
        </CardHeader>
      </Card>
    </motion.div>
  );
}
