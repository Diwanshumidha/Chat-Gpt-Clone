"use client";
import { cn } from "@/lib/utils";
import { Avatar } from "@radix-ui/react-avatar";
import { ChevronLeft, PenBoxIcon } from "lucide-react";
import React, { useState } from "react";
import { AvatarFallback } from "../ui/avatar";

const Sidebar = () => {
  const [IsOpen, setIsOpen] = useState(true);
  return (
    <div className="flex">
      <div
        className={cn(
          "  h-screen bg-[#171717] text-white transition-all flex flex-col gap-5 duration-300 relative overflow-x-hidden overflow-y-auto ",
          IsOpen ? "w-[250px] xl:w-[300px] px-3 pt-5" : "w-[0px] "
        )}
      >
        <button className=" w-full flex items-center justify-between hover:bg-white/10 p-2  rounded-xl  ">
          <div className=" flex items-center gap-3">
            <Avatar>
              <AvatarFallback className=" bg-blue-700 size-9">C</AvatarFallback>
            </Avatar>
            <p className="text-sm font-bold">New Chat</p>
          </div>
          <PenBoxIcon size={20} />
        </button>

        <div>
          <p className="text-sm font-bold text-white/50">Today</p>
        </div>
      </div>
      <button onClick={() => setIsOpen((prev) => !prev)} className=" group">
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
