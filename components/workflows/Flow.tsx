"use client";
import { useCallback, useMemo } from "react";
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
import TextUpdaterNode from "./nodes/TextUpdaterNode";
import { useFlow } from "@/store/flow";

function Flow() {
  // const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  // const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const nodes = useFlow((state) => state.nodes);
  const edges = useFlow((state) => state.edges);

  console.log({ ab: nodes });
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
      textUpdater: TextUpdaterNode,
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
