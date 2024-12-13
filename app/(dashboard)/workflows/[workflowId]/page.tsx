import Flow from "@/components/workflows/Flow";
import FlowDialog from "@/components/workflows/FlowDialog";

export default async function WorflowDetails() {
  // const res = await fetch("http://localhost:3000/api/generate-image", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({
  //     prompt: "generate me image about dog vs cat in USA",
  //   }),
  // });

  // const { output } = await res.json();

  return (
    <div className="flex space-x-4">
      <FlowDialog />
      <Flow />
    </div>
  );
}
