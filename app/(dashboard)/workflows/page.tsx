import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { fromUnixTime } from "date-fns";
import { AlertCircle, InboxIcon } from "lucide-react";
import React, { Suspense } from "react";
import CreateWorkFlowDialog from "./_component/CreateWorkFlow";
import Link from "next/link";

function WorkflowsPage() {
  return (
    <div className=" flex-1 flex ml-3 flex-col h-full">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold">Workflows</h1>
          <p className="text-muted-foreground"> Manage your workflows</p>
        </div>
        <div>
          <CreateWorkFlowDialog />
        </div>
      </div>
      <div className="h-full py-6">
        <Suspense fallback={<UserworkflowSkeleton />}>
          <UserWorkflows />
        </Suspense>
      </div>
    </div>
  );
}
function UserworkflowSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 4, 4].map((i) => (
        <Skeleton key={i} className="h-32 w-full" />
      ))}
    </div>
  );
}
function UserWorkflows() {
  const workflows = [
    {
      id: "1",
      name: "workflow 1",
      description: "this is a description",
      createdAt: fromUnixTime(1630368000),
    },
    {
      id: "2",
      name: "workflow 2",
      description: "this is a description",
      createdAt: fromUnixTime(1630368000),
    },
    {
      id: "3",
      name: "workflow 3",
      description: "this is a description",
      createdAt: fromUnixTime(1630368000),
    },
    {
      id: "4",
      name: "workflow 4",
      description: "this is a description",
      createdAt: fromUnixTime(1630368000),
    },
  ];
  if (!workflows) {
    return (
      <Alert variant={"destructive"}>
        <AlertCircle className="w-4 h-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>somthing went wrong </AlertDescription>
      </Alert>
    );
  }
  if (workflows.length == 0) {
    return (
      <div className="flex flex-col gap-4 h-full items-center justify-center">
        <div className="rounded-full bg-accent w-20 h-20 flex items-center justify-center">
          <InboxIcon size={40} className="stroke-primary"></InboxIcon>
        </div>
        <div className="flex flex-col gap-1 text-center">
          <p className="font-bold"> no workflows found</p>

          <p className=" text-sm text-muted-foreground">
            click the button below
          </p>
        </div>
        <CreateWorkFlowDialog triggerText="create your first  workflow" />
      </div>
    );
  }
  return (
    <div className="gap-4 grid grid-cols-2">
      {workflows.map((workflow) => (
        <Link
          href={`workflows/${workflow.id}`}
          key={workflow.id}
          className="bg-accent-foreground rounded-lg p-4"
        >
          <h1 className="font-bold text-background text-lg">{workflow.name}</h1>
          <p className="text-muted-foreground">{workflow.description}</p>
          <p className="text-xs text-muted-foreground">
            {workflow.createdAt.toDateString()}
          </p>
        </Link>
      ))}
    </div>
  );
}
export default WorkflowsPage;
