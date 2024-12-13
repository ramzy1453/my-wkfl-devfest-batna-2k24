"use client";

import {
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
  Dialog,
} from "@/components/ui/dialog";
import { Product } from "@/types/product";
import Image from "next/image";

type Props = {
  output?: Product;
  setOutput: (output?: Product) => void;
};

export default function GenerativeDialog(props: Props) {
  return (
    <Dialog
      open={!!props.output}
      onOpenChange={(value) => {
        if (!value) {
          props.setOutput(undefined);
        } else {
          props.setOutput(props.output);
        }
      }}
    >
      <DialogContent className="sm:max-w-[425px] absolute z-50">
        <DialogHeader className="space-y-4">
          <DialogTitle>{props.output?.product}</DialogTitle>
          <DialogDescription>{props.output?.description}</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col py-4 h-96 overflow-y-scroll">
          <div className="flex space-x-4">
            <Image
              src={props.output?.base64EncodedImage as string}
              alt={props.output?.product as string}
              width={120}
              height={120}
              className="w-32 h-32 rounded-md"
            />
            <div
              className="w-16 h-16 rounded-md"
              style={{
                backgroundColor: props.output?.color,
              }}
            ></div>

            <div className="flex flex-col">
              <h1 className="font-bold text-lg">Color</h1>
              <p className="text-muted-foreground"> {props.output?.color}</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
