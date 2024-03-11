"use client";
import Messages from "@/components/ChatBox/Messages";
import ChatForm from "@/components/Form/ChatForm";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useFormState } from "@/store/FormState";
import { useMessages } from "@/store/messages";
import { RotateCwIcon } from "lucide-react";

export default function Home() {
  const { messages, clearMessages } = useMessages();
  const { setError } = useFormState();
  return (
    <main className=" h-screen pb-5  flex flex-col justify-between  text-white px-5 mx-auto w-full flex-1 ">
      <header className=" py-3 flex justify-between items-center">
        <p className=" text-xl font-bold">
          ChatGPT <span className=" text-white/40">3.5</span>
        </p>
        <Button
          variant={"outline"}
          onClick={() => {
            clearMessages();
            setError("");
          }}
        >
          <RotateCwIcon />{" "}
        </Button>
      </header>
      {messages.length <= 0 ? (
        <div className="flex justify-center items-center h-full flex-1 gap-10 container    flex-col ">
          <h1 className="text-3xl font-bold text-center">
            How can I help you today?
          </h1>
          <div className=" grid grid-cols-2 gap-3 w-full ">
            <Suggestion />
            <Suggestion />
            <Suggestion />
            <Suggestion />
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
  const { setValue } = useFormState();
  return (
    <button
      onClick={() =>
        setValue("Suggest Fun Activities for Family Visiting San Francisco")
      }
      className=" border-white/10 hover:bg-white/10  border px-5 py-4 rounded-xl text-left "
    >
      <p>Suggest Fun Activities</p>
      <span>for Family Visiting San Francisco</span>
    </button>
  );
};
