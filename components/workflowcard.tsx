"use client ";

import React from "react";
import { Card, CardContent } from "./ui/card";
import { Link } from "@radix-ui/react-navigation-menu";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import { ShuffleIcon } from "lucide-react";


export default function Workflowcard ({workflow}:{workflow:Workflows}){
    return(
        <Card className="border border-separate  shadow-sm rounded-lg overflow-hidden  hover:shadow-md  dark:shadow-primary">
            <CardContent className="p-4 flex items-center justify-between h-[100px]">
               <div>
                <h3 className="text-base font-bold text-muted-foreground flex items-center">
                   {/* <Link href={``} className="flex items-center hover:underline"> */}
                   {workflow.name}
                   {/* </Link>  */}//test and fix 
                   

                    


                </h3>
               </div>
               <div className={cn(buttonVariants({variant:"outline",size:"sm"}),"flex items-center gap-2")}>
                <ShuffleIcon size={16} />
                Edit

               </div>
            </CardContent>

        </Card>
    )
}