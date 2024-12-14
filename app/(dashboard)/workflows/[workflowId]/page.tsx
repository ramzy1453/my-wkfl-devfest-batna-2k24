import Flow from "@/components/workflows/Flow";
import FlowDialog from "@/components/workflows/dialogs/FlowDialog";

export default async function WorflowDetails() {
  return (
    <div className="flex space-x-4">
      <FlowDialog />
      <Flow />
    </div>
  );
}
