"use client";

import { useSession } from "next-auth/react";
import UserNavMenu from "./UserNavMenu";
import LoginDialog from "../auth/LoginDialog";
import { Icons } from "../ui/icons";

function UserNav() {
  const session = useSession();

  return (
    <>
      {session?.data?.user && <UserNavMenu />}
      {!session?.data?.user && session.status !== "loading" && <LoginDialog />}
      {session.status === "loading" && (
        <Icons.spinner className="mr-2 h-6 w-6 animate-spin" />
      )}
    </>
  );
}

export default UserNav;
