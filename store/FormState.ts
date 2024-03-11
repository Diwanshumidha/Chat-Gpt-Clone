import { create } from "zustand";

export type FormState = {
  inputValue: string;
  pending: boolean;
  error: string | null;
};

interface useFormState {
  state: FormState;
  setValue: (value: string) => void;
  setPending: (pending: boolean) => void;
  setError: (error: string | null) => void;
}

export const useFormState = create<useFormState>((set) => ({
  state: { inputValue: "", error: null, pending: false },
  setValue: (value) => {
    set((prev) => ({ state: { ...prev.state, inputValue: value } }));
  },
  setPending: (pending) => {
    set((prev) => ({ state: { ...prev.state, pending } }));
  },
  setError: (error) => {
    set((prev) => ({ state: { ...prev.state, error } }));
  },
}));
