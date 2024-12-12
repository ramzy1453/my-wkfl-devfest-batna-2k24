"use client";

import React, { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { CustomDialogHeader } from "@/components/ui/CustomDialogHeader";
import { Layers2Icon, Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { CreateWorkflowSchema } from "@/schema/workflow";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

interface CreateWorkFlowDialogProps {
  triggerText?: string;
}

function CreateWorkFlowDialog({
  triggerText = "create workflow",
}: CreateWorkFlowDialogProps) {
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof CreateWorkflowSchema>>({
    resolver: zodResolver(CreateWorkflowSchema),
    defaultValues: {},
  });

  const isPending = false;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>{triggerText}</Button>
      </DialogTrigger>

      <DialogContent className="px-0">
        <CustomDialogHeader
          icon={Layers2Icon}
          title="Create Workflow"
          subtitle="Start building your workflow"
        />
        <div className="p-6 ">
          <Form {...form}>
            <form
              className="space-y-8 w-full"
              onSubmit={form.handleSubmit(() => {
                console.log("submit");
              })}
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex gap-1 items-center">
                      Name
                      <p className="text-xs text-primary ">(required)</p>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="name" {...field} />
                    </FormControl>
                    <FormDescription>
                      choose a description and unique name
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex gap-1 items-center mt-5">
                      Description
                      <p className="text-xs text-muted-foreground ">
                        (optionel)
                      </p>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        className="resize-none "
                        placeholder="description"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>provide brief description</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full mt-5"
                disabled={isPending}
              >
                {!isPending && "Create Workflow"}
                {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default CreateWorkFlowDialog;
