import { GenerateMessage } from "@/actions/generator";
import { useFormState } from "@/store/FormState";
import { useMessages } from "@/store/messages";
import React from "react";

const useGenerateMessage = () => {
  const { state, setError, setPending, setValue } = useFormState();

  const { AddMessage, messages } = useMessages();

  const handleSubmit = async (inputValue: string) => {
    try {
      AddMessage({ role: "user", parts: inputValue });
      setValue("");
      setPending(true);
      const response = await GenerateMessage(inputValue, messages);
      if (response) {
        if (response.error) {
          throw new Error(response.error);
        } else if (response.content) {
          AddMessage({ role: "model", parts: response.content });
        }
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "Something went wrong");
      AddMessage({
        role: "model",
        parts: "There Was an Error While Generating Data",
      });
    } finally {
      setPending(false);
    }
  };
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await handleSubmit(state.inputValue);
  };

  return { handleFormSubmit, handleSubmit };
};

export default useGenerateMessage;
