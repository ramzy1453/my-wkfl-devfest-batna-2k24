"use client";
import { useCallback, useEffect, useMemo } from "react";
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

function Flow() {
  // const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  // const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const nodes = useFlow((state) => state.nodes);
  const edges = useFlow((state) => state.edges);

  const nodeValues = useFlow((state) => state.nodeValues);
  console.log({ nodeValues });

  const setNodes = useFlow((state) => state.setNodes);
  const setEdges = useFlow((state) => state.setEdges);

  useEffect(() => {}, [nodes]);

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
    }),
    []
  );
  return (
    <div
      style={{
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
