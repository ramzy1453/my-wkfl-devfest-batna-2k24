import { Text } from "lucide-react";
import { NodeWrapper } from "./NodeWrapper";

type Props = {
  data: {
    label: string;
  };
};

export default function ClassicNode({ data }: Props) {
  return (
    <NodeWrapper label={data.label} icon={Text} inputs={1} outputs={1}>
    <div className="text-center text-sm text-muted-foreground">
      Classic Node
    </div>
  </NodeWrapper>
  );
}
