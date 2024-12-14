import React from "react";
import { Handle, Position } from "@xyflow/react";
import { type LucideIcon } from "lucide-react";

type NodeWrapperProps = {
  children: React.ReactNode;
  label: string;
  icon: LucideIcon;
  inputs?: number;
  outputs?: number;
};

export function NodeWrapper({
  children,
  label,
  icon: Icon,
  inputs = 1,
  outputs = 1,
}: NodeWrapperProps) {
  return (
    <div className="bg-background border-2 border-primary rounded-lg shadow-md w-48">
      <div className="bg-primary text-primary-foreground p-2 rounded-t-md flex items-center space-x-2">
        <Icon className="w-5 h-5" />
        <span className="font-semibold truncate">{label}</span>
      </div>
      <div className="p-3">{children}</div>
      {[...Array(inputs)].map((_, i) => (
        <Handle
          key={`input-${i}`}
          type="target"
          position={Position.Top}
          id={`input-${i}`}
          style={{ left: `${((i + 1) / (inputs + 1)) * 100}%` }}
        />
      ))}
      {[...Array(outputs)].map((_, i) => (
        <Handle
          key={`output-${i}`}
          type="source"
          position={Position.Bottom}
          id={`output-${i}`}
          style={{ left: `${((i + 1) / (outputs + 1)) * 100}%` }}
        />
      ))}
    </div>
  );
}
