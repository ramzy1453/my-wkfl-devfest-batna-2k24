import { ChangeEventHandler, useCallback } from "react";
import { Handle, Position } from "@xyflow/react";

type Props = {
  data: {
    label: string;
  };
};

export default function ClassicNode({ data }: Props) {
  const onChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      console.log(e.target.value, data);
    },
    [data]
  );

  return (
    <>
      <Handle type="target" position={Position.Top} />
      <div className="bg-foreground text-background py-2 px-4 rounded-md space-y-2 flex flex-col items-center justify-center">
        {data.label}
      </div>
      <Handle type="source" position={Position.Bottom} id="a" />
      <Handle
        type="source"
        position={Position.Bottom}
        id="b"
        style={{ left: 10 }}
      />
    </>
  );
}
