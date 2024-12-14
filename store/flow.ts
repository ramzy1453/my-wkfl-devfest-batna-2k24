import { Edge, Node } from "@xyflow/react";
import { create } from "zustand";

type Flow = {
  edges: Edge[];
  nodes: Node[];
  addNode: (node: Partial<Node>) => void;
  addEdge: (edge: Edge) => void;
  setNodes: (nodes: Node[]) => void;
  setEdges: (edges: Edge[]) => void;
  nodeValues: Record<string, string | number | object>;
  setNodeValues: (key: string, value: string | object | number) => void;
};

export const useFlow = create<Flow>((set) => ({
  edges: [],
  nodes: [],
  nodeValues: {},
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
  setNodeValues(key, value) {
    return set((state) => {
      return {
        nodeValues: {
          ...state.nodeValues,
          [key]: value,
        },
      };
    });
  },
}));
