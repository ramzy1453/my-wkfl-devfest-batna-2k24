"use client";
import { useState, useCallback, useMemo } from "react";
import {
  ReactFlow,
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  useNodesState,
  useEdgesState,
  OnConnect,
  addEdge,
  SelectionMode,
  Node,
  Edge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import TextUpdaterNode from "./nodes/TextUpdaterNode";

const initialNodes: Node[] = [
  {
    id: "1",
    data: { label: "Hello" },
    position: { x: 0, y: 0 },
    type: "input",
    style: {
      background: "red",
      color: "white",
      border: "1px solid black",
      borderRadius: "5px",
      padding: "10px",
      width: "100px",
      textAlign: "center",
      fontSize: "14px",
      fontWeight: "bold",
    },
  },
  {
    id: "2",
    data: { label: "World" },
    type: "textUpdater",
    position: { x: 100, y: 100 },
    style: {
      background: "red",
      color: "white",
      border: "1px solid black",
      borderRadius: "5px",
      padding: "10px",
      width: "100px",
      textAlign: "center",
      fontSize: "14px",
      fontWeight: "bold",
    },
  },
];

const initialEdges: Edge[] = [
  { id: "1-2", source: "1", target: "2", label: "to the", type: "step" },
];

function Flow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect: OnConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const nodeTypes = useMemo(
    () => ({
      textUpdater: TextUpdaterNode,
    }),
    []
  );
  return (
    <div
      style={{
        border: "1px red solid",
        height: "100vh",
        width: "100vw",
      }}
    >
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
  );
}

export default Flow;
