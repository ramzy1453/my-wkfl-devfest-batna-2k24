import { ChangeEventHandler, useCallback, useState } from "react";
import { Handle, Position } from "@xyflow/react";
import { useFlow } from "@/store/flow";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type Props = {
  data: {
    label: string;
    id: string;
  };
};

export default function TextInputNode({ data }: Props) {
  const setNodeValues = useFlow((state) => state.setNodeValues);
  const [isFocused, setIsFocused] = useState(false);

  const onChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      setNodeValues(data.label, e.target.value);
    },
    [data.label, setNodeValues]
  );

  return (
    <div
      className={cn(
        "w-48 bg-background border rounded-md shadow-sm transition-all duration-200",
        isFocused ? "border-primary ring-2 ring-primary/20" : "border-border"
      )}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 bg-primary border-2 border-background top-0 -translate-y-1/2"
      />
      <div className="p-2 space-y-1">
        <Label
          htmlFor={`text-${data.id}`}
          className="text-xs font-medium text-muted-foreground"
        >
          {data.label}
        </Label>
        <Input
          id={`text-${data.id}`}
          name="text"
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="nodrag h-7 text-sm bg-transparent border-muted"
          placeholder="Enter text..."
        />
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        id="a"
        className="w-3 h-3 bg-primary border-2 border-background bottom-0 translate-y-1/2"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="b"
        className="w-3 h-3 bg-primary border-2 border-background bottom-0 translate-y-1/2 left-auto right-6"
      />
    </div>
  );
}
