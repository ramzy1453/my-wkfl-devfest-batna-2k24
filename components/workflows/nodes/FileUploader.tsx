import { ChangeEventHandler, useCallback } from "react";
import { Handle, Position } from "@xyflow/react";
import { useFlow } from "@/store/flow";

type Props = {
  data: {
    label: string;
    id: string;
  };
};

export default function FileUploader({ data }: Props) {
  const setNodeValues = useFlow((state) => state.setNodeValues);
  const onChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        setNodeValues(data.label, e.target?.result as string);
      };
      reader.readAsDataURL(file);
    },
    [data.label, setNodeValues]
  );

  return (
    <>
      <Handle type="target" position={Position.Top} />
      <div className="bg-foreground text-background py-2 px-4 rounded-md space-y-2 flex flex-col items-center justify-center">
        <label htmlFor="text">{data.label}</label>
        <input
          id="file"
          name="file"
          type="file"
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
