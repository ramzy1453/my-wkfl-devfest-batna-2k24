import { Clock } from 'lucide-react';
import { NodeWrapper } from './NodeWrapper';
import { Input } from "@/components/ui/input";

export function SchedulerNode({ data }: { data: { label: string } }) {
  return (
    <NodeWrapper label={data.label} icon={Clock} outputs={2}>
      <div className="space-y-2">
        <Input type="datetime-local" placeholder="Schedule time" />
        <select className="w-full p-2 border rounded">
          <option>Daily</option>
          <option>Weekly</option>
          <option>Monthly</option>
        </select>
      </div>
    </NodeWrapper>
  );
}

