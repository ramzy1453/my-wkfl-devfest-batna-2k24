import Flow from "@/components/workflows/Flow";
import FlowDialog from "@/components/workflows/FlowDialog";

export default function WorflowDetails() {
  return (
    <div className="flex space-x-4">
      <FlowDialog />
      <Flow />
    </div>
  );
}
