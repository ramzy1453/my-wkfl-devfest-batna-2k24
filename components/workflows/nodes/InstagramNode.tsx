import { Instagram, Image, FileText } from 'lucide-react';
import { NodeWrapper } from './NodeWrapper';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function InstagramNode({ data }: { data: { label: string } }) {
  return (
    <NodeWrapper label={data.label} icon={Instagram} inputs={2} outputs={1}>
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Image className="w-5 h-5" />
          <Input type="file" accept="image/*" className="text-sm" />
        </div>
        <div className="flex items-center space-x-2">
          <FileText className="w-5 h-5" />
          <Textarea placeholder="Post caption" className="text-sm" rows={3} />
        </div>
      </div>
    </NodeWrapper>
  );
}

