import { create } from "zustand";

type Email = {
  to: string;
  subject: string;
  setTo: (to: string) => void;
  setSubject: (subject: string) => void;
};

export const useFlow = create<Email>((set) => ({
  edges: [],
  nodes: [],
  to: "",
  subject: "",
  setTo: (to: string) => set({ to }),
  setSubject: (subject: string) => set({ subject }),
}));
