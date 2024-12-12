import { Edge, Node } from "@xyflow/react";
import { create } from "zustand";

type Flow = {
  edges: Edge[];
  nodes: Node[];
  addNode: (node: Partial<Node>) => void;
  addEdge: (edge: Edge) => void;
  setNodes: (nodes: Node[]) => void;
  setEdges: (edges: Edge[]) => void;
};

export const useFlow = create<Flow>((set) => ({
  edges: [
    { id: "1-2", source: "1", target: "2", label: "to the", type: "step" },
  ],
  nodes: [
    {
      id: "1",
      data: { label: "Hello" },
      position: { x: 0, y: 0 },
      type: "input",
      style: {
        background: "green",
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
    },
  ],
  addNode: (node: Partial<Node>) => {
    return set((state) => ({
      nodes: [
        ...state.nodes,
        {
          id: state.nodes.length.toString(),
          ...node,
        } as Node,
      ],
    }));
  },
  addEdge: (edge: Edge) => {
    return set((state) => ({ edges: [...state.edges, edge] }));
  },
  setNodes: (nodes: Node[]) => {
    return set({ nodes });
  },
  setEdges: (edges: Edge[]) => {
    return set({ edges });
  },
}));
