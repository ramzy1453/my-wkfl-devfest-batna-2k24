"use client";
import { Icon, LucideIcon } from "lucide-react";
import { DialogHeader, DialogTitle } from "./dialog";
import { cn } from "@/lib/utils";
import { Separator } from "@radix-ui/react-dropdown-menu";

interface Props {
  title?: string;
  subtitle?: string;
  icon?: LucideIcon; 
  iconclassname?: string;
  titleclassname?: string;
  subtitleclassname?: string;
}

export function CustomDialogHeader(props: Props) {
    const { icon: IconComponent, iconclassname } = props;
  
    return (
      <DialogHeader className="py-6">
        <DialogTitle asChild>
          <div className="flex flex-col items-center gap-2 mb-2">
            {IconComponent && (
              <IconComponent
                size={30}
                className={cn("stroke-primary", iconclassname)}
              />
            )}
            {props.title && (
              <h3
                className={cn(
                  "text-lg font-semibold leading-none tracking-tight",
                  props.titleclassname
                )}
              >
                {props.title}
              </h3>
            )}
            {props.subtitle && (
              <p className={cn("text-sm text-muted-foreground", props.subtitleclassname)}>
                {props.subtitle}
              </p>
            )}
            <Separator />
          </div>
        </DialogTitle>
      </DialogHeader>
    );
  }
  