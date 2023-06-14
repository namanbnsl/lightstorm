"use client";

import { LogIn } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { UserAuthForm } from "./UserAuthForm";

const LoginDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"} className="w-40">
          <LogIn className="mr-2 h-4 w-4" />
          Login
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle asChild>
            <h1 className="text-2xl font-semibold tracking-tight text-center">
              Sign In or Sign Up
            </h1>
          </DialogTitle>
          <DialogDescription asChild>
            <span className="text-center">
              Sign In or Sign Up with Discord or Google.
            </span>
          </DialogDescription>
        </DialogHeader>
        <UserAuthForm />
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;
