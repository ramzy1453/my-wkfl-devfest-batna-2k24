import { ChangeEventHandler, useCallback } from "react";
import { Handle, Position, NodeProps } from "@xyflow/react";

type Props = {
  data: NodeProps["data"];
};

export default function TextUpdaterNode({ data }: Props) {
  const onChange: ChangeEventHandler<HTMLInputElement> = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  return (
    <>
      <Handle type="target" position={Position.Top} />
      <div className="bg-foreground text-background py-2 px-4 rounded-md space-y-2 flex flex-col items-center justify-center">
        <label htmlFor="text">Text Input</label>
        <input
          id="text"
          name="text"
          onChange={onChange}
          className="nodrag bg-transparent outline-none border border-background px-2"
        />
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
