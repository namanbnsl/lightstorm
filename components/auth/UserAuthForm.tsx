"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { AiOutlineGoogle } from "react-icons/ai";
import { BsDiscord } from "react-icons/bs";
import { Icons } from "../ui/icons";
import { useState } from "react";
import { signIn } from "next-auth/react";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <div className={cn("grid gap-4", className)} {...props}>
      <Button
        onClick={() => {
          setIsLoading(true);
          signIn("google");
        }}
        variant="outline"
        type="button"
        disabled={isLoading}
      >
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <AiOutlineGoogle className="mr-2 w-5 h-5" />
        )}{" "}
        Google
      </Button>

      <Button
        onClick={() => {
          setIsLoading(true);
          signIn("discord");
        }}
        variant="default"
        type="button"
        disabled={isLoading}
      >
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <BsDiscord className="mr-2 w-4 h-4" />
        )}{" "}
        Discord
      </Button>
    </div>
  );
}
