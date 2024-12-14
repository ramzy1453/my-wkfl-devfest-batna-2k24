"use client";

import { useFlow } from "@/store/flow";
import { type LucideIcon } from "lucide-react";
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Position } from "@xyflow/react";

type Props = {
  icon: LucideIcon;
  name: string;
  description: string;
  type: string;
  closeDialog: () => void;
};

export default function FlowCard({
  icon: Icon,
  name,
  description,
  type,
  closeDialog,
}: Props) {
  const addNodes = useFlow((state) => state.addNode);

  const onAddNode = () => {
    addNodes({
      data: {
        label: name,
      },
      position: { x: 100, y: 100 },
      type,
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
    });
    closeDialog();
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <Card
        className="cursor-pointer overflow-hidden group"
        onClick={onAddNode}
      >
        <CardContent className="p-4 flex items-start space-x-4">
          <div className="relative w-12 h-12 flex-shrink-0">
            <div className="absolute inset-0 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors duration-300" />
            <Icon className="w-6 h-6 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-primary group-hover:scale-110 transition-transform duration-300" />
          </div>
          <div className="space-y-1 flex-grow">
            <h3 className="font-semibold text-lg group-hover:text-primary transition-colors duration-300">
              {name}
            </h3>
            <p className="text-muted-foreground text-sm">{description}</p>
          </div>
          <motion.div
            className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center"
            whileHover={{ rotate: 90 }}
            transition={{ duration: 0.2 }}
          >
            <Icon className="w-4 h-4 text-primary" />
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
