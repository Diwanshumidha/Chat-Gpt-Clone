import { Message } from "@/store/messages";
import React, { useEffect, useRef } from "react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import Markdown from "react-markdown";
import rehypeColorChips from "rehype-color-chips";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { Skeleton } from "../ui/skeleton";
import { useFormState } from "@/store/FormState";

const Messages = ({ messages }: { messages: Message[] }) => {
  console.log(messages);
  const ScrollRef = useRef<HTMLDivElement>(null);

  const { state } = useFormState();
  useEffect(() => {
    ScrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  return (
    // <ScrollArea>
    <div className=" w-full space-y-4 container mx-auto">
      {messages.map((message, index) => {
        const isBotMessage = message.role === "model";
        return (
          <div className=" flex gap-4" key={`ChatMap${index}`}>
            <div>
              <Avatar className=" size-8">
                {isBotMessage ? (
                  <AvatarFallback className="bg-blue-600">C</AvatarFallback>
                ) : (
                  <AvatarFallback className="bg-green-600">D</AvatarFallback>
                )}
              </Avatar>
            </div>
            <div className=" space-y-2">
              <p className=" font-bold">{isBotMessage ? "ChatGpt" : "You"}</p>
              <div className=" space-y-3">
                <Markdown
                  rehypePlugins={[
                    [
                      rehypeColorChips,
                      { customClassName: "color-chip" },
                      rehypeHighlight,
                    ],
                  ]}
                  remarkPlugins={[remarkGfm]}
                >
                  {message.parts}
                </Markdown>
              </div>
            </div>
          </div>
        );
      })}
      {state.pending ? <Loader /> : null}

      <div ref={ScrollRef} />
    </div>
  );
};

export default Messages;

const Loader = () => {
  return (
    <div className=" flex gap-4">
      <div>
        <Avatar className=" size-8">
          <AvatarFallback className="bg-blue-600">C</AvatarFallback>
        </Avatar>
      </div>
      <div className=" space-y-2 w-full">
        <p className=" font-bold">ChatGpt</p>
        <div className="w-full space-y-3">
          <Skeleton className=" size-3 bg-white rounded-full   animate-scale" />
        </div>
      </div>
    </div>
  );
};
