"use client";
import { cn } from "@/lib/utils";
import { Avatar } from "@radix-ui/react-avatar";
import { ChevronLeft, PenBoxIcon, SparklesIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { AvatarFallback, AvatarImage } from "../ui/avatar";
import { ScrollArea } from "../ui/scroll-area";
import { useMessages } from "@/store/messages";
import { useFormState } from "@/store/FormState";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { Skeleton } from "../ui/skeleton";
import AuthenticationDropdown from "./AuthenticationDropdown";

const randomHeadingsToday = {
  today: [
    "The Impact of Technology ",
    "Exploring the Depths ",
    "The Art of Creative ",
    "Understanding Quantum ",
    "The History of Ancient",
    "The Future",
    "The Psychology ",
  ],

  prev: [
    "The Evolution",
    "Climate Change",
    "Innovations in Renewable ",
    "The Influence of Art on Culture",
    "Challenges in Global Health",
    "The World of Artificial Intelligence",
    "Advancements in Biotechnology",
    "The Beauty of Mathematics",
    "The Wonders of the Universe",
    "The Power of Positive Thinking",
    "The Role of Philosophy in Modern Society",
    "The Science of Happiness",
    "The Magic of Music",
  ],
};

const Sidebar = () => {
  const [IsOpen, setIsOpen] = useState(true);
  const { clearMessages } = useMessages();
  const { state } = useFormState();
  const { user, isLoading } = useKindeBrowserClient();

  return (
    <div className="flex">
      <div
        className={cn(
          "  h-screen bg-[#171717] text-white transition-all  duration-300 relative overflow-x-hidden overflow-y-auto hidden md:block ",
          IsOpen ? "md:w-[250px] xl:w-[330px]  px-3 pt-5" : "md:w-full"
        )}
      >
        <div className={cn("flex flex-col gap-5 h-full", !IsOpen && "hidden")}>
          <button
            className=" w-full flex items-center justify-between hover:bg-white/10 p-2  rounded-xl  "
            onClick={() => clearMessages()}
            disabled={state.pending}
          >
            <div className=" flex items-center gap-3">
              <Avatar>
                <AvatarFallback className=" bg-white text-black size-9">
                  C
                </AvatarFallback>
                {/* <div className=" p-1 bg-white rounded-full"> */}
                <AvatarImage
                  className="size-9 p-1 bg-white rounded-full"
                  src="/chatgpt.svg"
                />
                {/* </div> */}
              </Avatar>
              <p className="text-sm font-bold">New Chat</p>
            </div>
            <PenBoxIcon size={20} />
          </button>

          <div className=" overflow-auto scrollbar-hide   flex-1   ">
            <div className="relative space-y-7 py-4 px-3 ">
              {/* <div className=" absolute right-0 w-[10px]  h-full bg-gradient-to-r from-transparent to-themeBackground"></div> */}
              <div className="space-y-4">
                <p className="text-sm font-bold text-white/50">Today</p>
                {randomHeadingsToday.today.map((heading, index) => (
                  <HistoryTitle key={`TodayHeading-${index}`} title={heading} />
                ))}
              </div>

              <div className="space-y-4">
                <p className="text-sm font-bold text-white/50">
                  Previous 7 days
                </p>

                {randomHeadingsToday.prev.map((heading, index) => (
                  <HistoryTitle key={`PrevHeading-${index}`} title={heading} />
                ))}
              </div>
            </div>
          </div>

          <div className=" basis-[160px] ">
            <button className=" w-full flex items-center justify-between hover:bg-white/10 p-2  rounded-xl  ">
              <div className=" flex items-center gap-3">
                <div className=" size-9 border-white/30 border rounded-full grid place-content-center">
                  <SparklesIcon />
                </div>
                <div className=" text-left">
                  <p className=" font-bold">Upgrade Plan</p>
                  <p className="text-sm text-white/40">
                    Get Gpt 4 Dalle and More
                  </p>
                </div>
              </div>
            </button>
            <AuthenticationDropdown className="w-full flex items-center justify-between hover:bg-white/10 p-2  rounded-xl ">
              <div className=" flex items-center gap-3">
                {isLoading ? (
                  <>
                    <Avatar>
                      <AvatarFallback className=" bg-gray-600 animate-pulse size-9 "></AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <Skeleton className=" w-[20ch] h-[10px] bg-gray-600" />
                      <Skeleton className=" w-[15ch] h-[5px] bg-gray-600" />
                    </div>
                  </>
                ) : (
                  <>
                    <Avatar>
                      <AvatarFallback className=" bg-green-700 size-9">
                        {user?.given_name?.substring(0, 1)}
                      </AvatarFallback>
                      {user?.picture ? (
                        <AvatarImage className=" size-9" src={user?.picture} />
                      ) : null}
                    </Avatar>
                    <div className=" text-left">
                      <p className=" font-bold">
                        {user?.given_name} {user?.family_name}
                      </p>
                      <p className=" font-light text-xs ">{user?.email}</p>
                    </div>
                  </>
                )}
              </div>
            </AuthenticationDropdown>
          </div>
        </div>
      </div>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className=" md:block hidden group"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={cn(
            "lucide lucide-chevron-left text-gray-500 group-hover:text-white transition-all duration-300 group-hover:scale-110",
            IsOpen ? "" : "-rotate-180"
          )}
        >
          <path d="m15 18-6-6 6-6" />
        </svg>
      </button>
    </div>
  );
};

export default Sidebar;

const HistoryTitle = ({ title }: { title: string }) => {
  return (
    <div className="w-full overflow-hidden">
      <p className="text-lg  whitespace-nowrap ">{title}</p>
    </div>
  );
};
