"use client";
import {
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
  Dialog,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  TooltipProvider,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Product } from "@/types/product";
import { useEffect, useState } from "react";
import Image from "next/image";

type Props = {
  open?: boolean;
  setOpen: (value: boolean) => void;
  title: string;
  description: string;
};

export default function GenerativeDialog(props: Props) {
  const [data, setData] = useState<(Product & { image_link: string })[]>([]);
  useEffect(() => {
    if (!props.open) return;
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`)
      .then((response) => response.json())
      .then((data) => setData(data));
  }, [props.open]);
  console.log({ data });

  console.log(`${process.env.NEXT_PUBLIC_API_URL}/${data[0]?.image_link}`);
  return (
    <Dialog open={props.open} onOpenChange={props.setOpen}>
      <DialogContent className="sm:max-w-[725px] max-h-[80vh] overflow-hidden">
        <DialogHeader className="space-y-4">
          <DialogTitle>{props.title}</DialogTitle>
          <DialogDescription>{props.description}</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col py-4 h-[calc(80vh-130px)] overflow-y-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Product</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Color</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Image</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((product, i) => (
                <TableRow key={"product-" + i}>
                  <TableCell className="font-medium">
                    {product.product}
                  </TableCell>
                  <TableCell>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="cursor-help truncate inline-block max-w-[200px]">
                            {product.description}
                          </span>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{product.description}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableCell>
                  <TableCell>{product.color}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="cursor-pointer text-blue-500 underline">
                            Preview
                          </span>
                        </TooltipTrigger>
                        <TooltipContent side="right" sideOffset={5}>
                          <Image
                            src={`https://raw.githubusercontent.com/eli64s/readme-ai/main/docs/docs/assets/svg/readme-ai-gradient.svg`}
                            alt={product.product}
                            width={200}
                            height={200}
                            className="rounded-md"
                          />
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  );
}
