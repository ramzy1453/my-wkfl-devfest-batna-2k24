"use client";

import { useFlow } from "@/store/flow";
import Image from "next/image";
import React from "react";

type Props = {
  logo: string;
  name: string;
  description: string;
  closeDialog: () => void;
};

export default function FlowCard({
  logo,
  name,
  description,
  closeDialog,
}: Props) {
  const addNodes = useFlow((state) => state.addNode);
  const addEdges = useFlow((state) => state.addEdge);

  const onAddNode = () => {
    addNodes({
      data: { label: "Uppercase" },
      position: { x: 100, y: 100 },
      type: "textUpdater",
      style: {
        background: "green",
        color: "white",
        border: "1px solid black",
        borderRadius: "5px",
        padding: "10px",
        width: "100px",
        textAlign: "center",
        fontSize: "14px",
        fontWeight: "bold",
      },
    });
    closeDialog();
  };
  return (
    <div
      className="flex border-b border-foreground space-x-2 pb-2 mb-4 cursor-pointer hover:bg-foreground/5"
      onClick={onAddNode}
    >
      <Image src={logo} alt={name} width={24} height={24} className="w-6 h-6" />
      <div className="space-y-2">
        <h1 className="font-bold">{name}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
