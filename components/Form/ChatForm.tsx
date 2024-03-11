"use client";
import React, { useState } from "react";
import { Input, inputClassName } from "../ui/input";
import { Button } from "../ui/button";
import { GenerateMessage } from "@/actions/generator";
import { useMessages } from "@/store/messages";
import { cn } from "@/lib/utils";
import { Loader, Loader2, Upload, UploadIcon } from "lucide-react";
import { useFormState } from "@/store/FormState";

interface FormState {
  inputValue: string;
  pending: boolean;
  error: string | null;
}

const ChatForm: React.FC = () => {
  const [formState, setFormState] = useState<FormState>({
    inputValue: "",
    pending: false,
    error: null,
  });
  const { state, setError, setPending, setValue } = useFormState();

  const { AddMessage, messages } = useMessages();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      AddMessage({ role: "user", parts: state.inputValue });
      setValue("");
      setPending(true);
      const response = await GenerateMessage(state.inputValue, messages);
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setValue(value);
  };

  return (
    <div className=" space-y-2 container mx-auto">
      <form
        className={cn(
          inputClassName,
          "flex py-0 justify-center items-center container mx-auto h-[50px] rounded-xl bg-transparent border-2 border-white/10 focus-within:border-[1px]  focus-within:border-white "
        )}
        onSubmit={handleSubmit}
      >
        <Input
          type="text"
          name="inputValue"
          className="border-none bg-transparent placeholder:text-white/10   text-white h-full flex-1 focus-visible:outline-none focus-visible:ring-transparent focus-visible:ring-offset-0  focus-visible:ring-0"
          placeholder="Enter a message..."
          value={state.inputValue}
          onChange={handleChange}
        />

        <Button
          type="submit"
          className="h-[80%] disabled:bg-white/10 bg-white disabled:text-white text-black  "
          disabled={state.pending || state.inputValue.length <= 0}
        >
          {state.pending ? (
            <Loader2 size={20} className=" animate-spin" />
          ) : (
            <UploadIcon size={20} />
          )}
        </Button>
      </form>
      <div className=" flex justify-center">
        {!!state.error ? (
          <p className=" text-red-500/70 text-center">
            Something Went Wrong Try Reloading the Page or see the console for
            the error
          </p>
        ) : (
          <p className=" text-center text-white/40">
            I am using Gemini Model for the generation
          </p>
        )}
      </div>
    </div>
  );
};

export default ChatForm;
