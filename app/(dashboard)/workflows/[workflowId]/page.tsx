import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Instagram, Plus } from "lucide-react";

import { ReactFlow } from "@xyflow/react";

import "@xyflow/react/dist/style.css";

const initialNodes = [
  { id: "1", position: { x: 0, y: 0 }, data: { label: "1" } },
  { id: "2", position: { x: 0, y: 100 }, data: { label: "2" } },
];
const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];

export default function WorflowDetails() {
  return (
    <div className="border border-red-500 flex">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" size="icon" className="">
            <Plus />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] absolute left-[35%] top-[52%]">
          <DialogHeader className="space-y-4">
            <DialogTitle>Toolkit</DialogTitle>
            <DialogDescription>
              <Input placeholder="Search toolkit" />
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col py-4 h-96 overflow-y-scroll">
            {Array(16)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className="flex border-b border-foreground space-x-2 pb-2 mb-4 cursor-pointer hover:bg-foreground/5"
                >
                  <Instagram size={24} />
                  <div className="space-y-2">
                    <h1 className="font-bold">Workflow Name</h1>
                    <p className="text-muted-foreground">
                      Workflow description to colonize the jews and the
                      christian okay thank you bro.
                    </p>
                  </div>
                </div>
              ))}
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div style={{ width: "100vw", height: "100vh" }}>
        <ReactFlow
          className="border border-green-900"
          nodes={initialNodes}
          edges={initialEdges}
        />
      </div>
    </div>
  );
}
