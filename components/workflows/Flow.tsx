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
import OutputDialog from "./OutputDialog";
import { Product } from "@/types/product";
import { InstagramNode } from "./nodes/InstagramNode";
import { ShopifyNode } from "./nodes/ShopifyNode";
import { ChatGPTNode } from "./nodes/ChatGPTNode";
import { SchedulerNode } from "./nodes/SchedulerNode";

function Flow() {
  // const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  // const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const nodes = useFlow((state) => state.nodes);
  const edges = useFlow((state) => state.edges);

  const nodeValues = useFlow((state) => state.nodeValues);
  const [output, setOutput] = useState<Product>();

  async function runPipeline() {
    const base64EncodedImage = nodeValues["Image Uploader"];
    // const prompt = nodeValues["Generate Text"];

    try {
      const response = await fetch("http://localhost:3000/api/generate-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          base64EncodedImage,
          prompt: "analyse-product",
        }),
      });
      const data = await response.json();
      const json = JSON.parse(
        data.output.replace("json", "").replaceAll("\n", "").replaceAll("`", "")
      ) as Product;
      setOutput({ ...json, base64EncodedImage });
    } catch (error) {
      console.log({ error });
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
      Scheduler: SchedulerNode,
      textDescription: TextInputNode,
      googleSheets: ClassicNode,
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
        <Button onClick={runPipeline} className="text-foreground">
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
