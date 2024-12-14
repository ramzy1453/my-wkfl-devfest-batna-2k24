"use client";
import { useCallback, useMemo, useState } from "react";
import {
  ReactFlow,
  Controls,
  Background,
  OnConnect,
  addEdge,
  SelectionMode,
  OnNodesChange,
  OnEdgesChange,
  applyNodeChanges,
  applyEdgeChanges,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useFlow } from "@/store/flow";
import TextInputNode from "./nodes/TextInputNode";
import FileUploader from "./nodes/FileUploader";
import ClassicNode from "./nodes/ClassicNode";
import { Button } from "../ui/button";
import OutputDialog from "@/components/workflows/dialogs/OutputDialog";
import { Product } from "@/types/product";
import { InstagramNode } from "./nodes/InstagramNode";
import { ShopifyNode } from "./nodes/ShopifyNode";
import { ChatGPTNode } from "./nodes/ChatGPTNode";
import { SchedulerNode } from "./nodes/SchedulerNode";
import { toast } from "sonner";
import { EmailNode } from "./nodes/EmailNode";
import { useMail } from "@/store/mail";

function Flow() {
  // const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  // const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const nodes = useFlow((state) => state.nodes);
  const edges = useFlow((state) => state.edges);
  const to = useMail((state) => state.to);
  const subject = useMail((state) => state.subject);

  const nodeValues = useFlow((state) => state.nodeValues);
  const setNodeValues = useFlow((state) => state.setNodeValues);
  const [output, setOutput] = useState<Product>();

  function runScheduler() {
    const scheduler = nodeValues["Scheduler"];
    if (scheduler) {
      toast.success(
        `Scheduled pipeline successfully is about to run in ${scheduler} seconds`,
        { duration: 1500 }
      );
      setTimeout(() => {
        toast.success("Pipeline ran successfully");
        runPipeline();
      }, parseInt(scheduler as string) * 1000);
    } else {
      runPipeline();
    }
  }
  async function runPipeline() {
    console.log({ nodeValues });
    const base64EncodedImage = nodeValues["Image Uploader"];

    // const prompt = nodeValues["Generate Text"];

    if (!base64EncodedImage) return;
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/caption-image`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            base64EncodedImage,
            prompt: "analyse-product",
          }),
        }
      );

      const data = await response.json();
      const json = JSON.parse(
        data.output.replace("json", "").replaceAll("\n", "").replaceAll("`", "")
      ) as Product;
      setOutput({ ...json, base64EncodedImage: base64EncodedImage as string });
      setNodeValues("Generated Description", json);
      onSendEmail(json);
    } catch (error) {
      console.log({ error });
    }
  }

  async function onSendEmail(messageData: Product) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/email`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "MyWkfl",
          to,
          message: `
          <div>
              <div>
                <h3>Generated product with success : ${messageData.product}</h3>
                  <div
                    style="background-color: ${messageData.color}; width:48px; height:48px"
                  ></div>
                  <div>
                    <p>Color : <span style="color: ${messageData.color}">${messageData.color}</span></p>
                    <p>Description : ${messageData.description}</p>
                  </div>
              </div>
          </div>
        `,
          subject,
        }),
      }
    );

    const data = await response.json();
    if (data?.mail?.accepted?.length > 0) {
      toast.success("Email sent successfully to " + to);
    } else {
      toast.error("Failed to send email to " + to);
    }
  }

  const setNodes = useFlow((state) => state.setNodes);
  const setEdges = useFlow((state) => state.setEdges);

  const onNodesChange: OnNodesChange = useCallback(
    (changes) => {
      setNodes(applyNodeChanges(changes, nodes));
    },
    [setNodes, nodes]
  );

  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => {
      setEdges(applyEdgeChanges(changes, edges));
    },
    [setEdges, edges]
  );
  const onConnect: OnConnect = useCallback(
    (params) => setEdges(addEdge(params, edges)),
    [setEdges, edges]
  );

  const nodeTypes = useMemo(
    () => ({
      textInput: TextInputNode,
      fileUploader: FileUploader,
      classic: ClassicNode,
      instagram: InstagramNode,
      facebook: InstagramNode,
      youtube: InstagramNode,
      shopify: ShopifyNode,
      Chatgpt: ChatGPTNode,
      scheduler: SchedulerNode,
      textDescription: TextInputNode,
      googleSheets: ClassicNode,
      email: EmailNode,
    }),
    []
  );

  return (
    <>
      <OutputDialog
        output={output}
        setOutput={(value) => {
          setOutput(value);
        }}
      />
      <div
        style={{
          height: "100vh",
          width: "100vw",
        }}
      >
        <Button onClick={runScheduler} className="text-black">
          Run pipeline
        </Button>
        <ReactFlow
          nodes={nodes}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          edges={edges}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          panOnScroll
          selectionMode={SelectionMode.Partial}
          fitView
          defaultEdgeOptions={{
            animated: true,
          }}
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>
    </>
  );
}

export default Flow;
