import { ChangeEventHandler, useCallback } from "react";
import { useFlow } from "@/store/flow";
import { NodeWrapper } from "./NodeWrapper";
import { Label } from "@/components/ui/label";
import { File, Upload } from "lucide-react";
import { toast } from "sonner";

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
        toast.success(`File uploaded successfully: ${file.name}`, {
          duration: 5000,
          position: "top-center",
        });

        setNodeValues(data.label, e.target?.result as string);
      };
      reader.readAsDataURL(file);
    },
    [data.label, setNodeValues]
  );

  return (
    <NodeWrapper label={data.label} icon={File}>
      <div className="space-y-2">
        <Label htmlFor={`file-${data.id}`} className="sr-only">
          Upload File
        </Label>
        <div className="flex items-center justify-center w-full">
          <label
            htmlFor={`file-${data.id}`}
            className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted hover:bg-muted/80 transition-colors"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="w-8 h-8 mb-3 text-muted-foreground" />
              <p className="mb-2 text-sm text-muted-foreground">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
            </div>
            <input
              id={`file-${data.id}`}
              type="file"
              className="hidden"
              onChange={onChange}
            />
          </label>
        </div>
      </div>
    </NodeWrapper>
  );
}
