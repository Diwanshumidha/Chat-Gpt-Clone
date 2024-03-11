import { create } from "zustand";

export type Message = { role: "model" | "user"; parts: string };
interface useMessagesState {
  messages: Message[] | [];
  AddMessage: (message: Message) => void;
  clearMessages: () => void;
}

export const useMessages = create<useMessagesState>((set) => ({
  messages: [],
  AddMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),
  clearMessages: () => {
    set({ messages: [] });
  },
}));
