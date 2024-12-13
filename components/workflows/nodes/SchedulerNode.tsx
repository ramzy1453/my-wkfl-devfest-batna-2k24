import { Clock } from "lucide-react";
import { NodeWrapper } from "./NodeWrapper";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useFlow } from "@/store/flow";

export function SchedulerNode({ data }: { data: { label: string } }) {
  const [currentOption, setCurrentOption] = useState("Secondly");
  const [seconds, setSeconds] = useState(0);
  const setNodeValues = useFlow((state) => state.setNodeValues);

  useEffect(() => {
    setNodeValues(data.label, seconds + "");
  }, [currentOption, data.label, setNodeValues, seconds]);

  return (
    <NodeWrapper label={data.label} icon={Clock} outputs={2}>
      <div className="space-y-2">
        {currentOption !== "Secondly" && (
          <Input type="datetime-local" placeholder="Schedule time" />
        )}
        {currentOption === "Secondly" && (
          <Input
            value={seconds}
            onChange={(e) => setSeconds(parseInt(e.target.value))}
            type="number"
            placeholder="Choose seconds"
          />
        )}
        <select
          value={currentOption}
          onChange={(e) => setCurrentOption(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option>Secondly</option>
          <option>Daily</option>
          <option>Weekly</option>
          <option>Monthly</option>
        </select>
      </div>
    </NodeWrapper>
  );
}
