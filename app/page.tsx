"use client";
import Messages from "@/components/ChatBox/Messages";
import ChatForm from "@/components/Form/ChatForm";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useFormState } from "@/store/FormState";
import { useMessages } from "@/store/messages";
import { RotateCwIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { prompts } from "@/lib/constant";
import useGenerateMessage from "@/hooks/useGenerateMessage";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export default function Home() {
  const { messages, clearMessages } = useMessages();
  const { setError, state } = useFormState();
  const isMobile = useMediaQuery("(max-width:1024px)");

  return (
    <main className=" h-screen pb-5  flex flex-col justify-between  text-white px-5 mx-auto w-full flex-1 ">
      <header className=" py-3 flex justify-between items-center">
        <p className=" text-xl font-bold">
          ChatGPT <span className=" text-white/40">5.5</span>
        </p>

        <Button
          variant={"outline"}
          disabled={state.pending}
          onClick={() => {
            clearMessages();
            setError("");
          }}
        >
          <RotateCwIcon />{" "}
        </Button>
      </header>
      {messages.length <= 0 ? (
        <div className="flex justify-center items-center h-full flex-1 gap-10 container  flex-col py-5 ">
          <div className="space-y-4 flex-1  flex flex-col justify-center items-center">
            <div className=" bg-white p-3 rounded-full w-fit mx-auto">
              <img
                src="/chatgpt.svg"
                alt="Chatgpt"
                className="size-8"
                width={32}
                height={32}
              />
            </div>
            <h1 className="text-3xl font-bold text-center">
              How can I help you today?
            </h1>
          </div>
          <div className=" grid lg:grid-cols-2  gap-3 w-full self-end   ">
            <Suggestion />
            <Suggestion />
            {!isMobile ? (
              <>
                <Suggestion />
                <Suggestion />
              </>
            ) : null}
          </div>
        </div>
      ) : null}

      {messages.length > 0 ? (
        <ScrollArea className=" flex-1 relative   ">
          <div className=" h-full flex flex-col py-4  ">
            <Messages messages={messages} />
          </div>
          <div className=" h-[36px] w-full absolute bottom-0  bg-gradient-to-b from-transparent to-themeBackground  container" />
        </ScrollArea>
      ) : null}
      <ChatForm />
    </main>
  );
}

const Suggestion = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { handleSubmit } = useGenerateMessage();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const prompt = useMemo(() => {
    return prompts[(Math.random() * prompts.length) | 0];
  }, []);

  return isMounted ? (
    <button
      onClick={() => {
        handleSubmit(prompt);
      }}
      className="border-white/10 hover:bg-white/10 border focus:bg-white/10  px-5 py-4 rounded-xl text-left"
    >
      <p className=" font-semibold">
        {prompt.split(" ").slice(0, 4).join(" ")}
      </p>
      <span className=" text-white/70">
        {prompt.split(" ").slice(4, -1).join(" ")}
      </span>
    </button>
  ) : null;
};
