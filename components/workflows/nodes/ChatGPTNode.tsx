import { Bot } from 'lucide-react';
import { NodeWrapper } from './NodeWrapper';
import { Textarea } from "@/components/ui/textarea";

export function ChatGPTNode({ data }: { data: { label: string } }) {
  return (
    <NodeWrapper label={data.label} icon={Bot} inputs={1} outputs={1}>
      <div className="space-y-2">
        <Textarea placeholder="Enter your prompt" className="text-sm" rows={3} />
        <select className="w-full p-2 border rounded text-sm">
          <option>GPT-3.5</option>
          <option>GPT-4</option>
        </select>
      </div>
    </NodeWrapper>
  );
}

