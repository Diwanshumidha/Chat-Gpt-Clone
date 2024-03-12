"use client";
import React from "react";
import { Input, inputClassName } from "../ui/input";
import { Button } from "../ui/button";

import { cn } from "@/lib/utils";
import { Loader, Loader2, Upload, UploadIcon } from "lucide-react";
import { useFormState } from "@/store/FormState";
import useGenerateMessage from "@/hooks/useGenerateMessage";

interface FormState {
  inputValue: string;
  pending: boolean;
  error: string | null;
}

const ChatForm: React.FC = () => {
  const { state, setValue } = useFormState();

  const { handleFormSubmit } = useGenerateMessage();

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
        onSubmit={handleFormSubmit}
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
