import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuLink,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { LogOut, LucideSettings2, Settings } from "lucide-react";
import { useKindeAuth, LogoutLink } from "@kinde-oss/kinde-auth-nextjs";
import { redirect } from "next/navigation";
import { cn } from "@/lib/utils";

type Props = {} & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

const AuthenticationDropdown = ({ children, ...props }: Props) => {
  const className =
    " py-3 focus:bg-white/20 focus:text-white hover:bg-white/20   font-semibold gap-2 cursor-pointer";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger {...props}>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className="w-[250px] bg-themeBackground text-white border-white/10 ">
        <DropdownMenuItem className={className}>
          <LucideSettings2 /> Customize ChatGPT
        </DropdownMenuItem>
        <DropdownMenuItem className={className}>
          <Settings size={20} /> Settings
        </DropdownMenuItem>
        <div className=" px-2">
          <DropdownMenuSeparator className=" bg-white/20" />
        </div>
        <DropdownMenuLink href={"/api/auth/logout"} className={className}>
          <LogOut size={20} /> Logout
        </DropdownMenuLink>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AuthenticationDropdown;
