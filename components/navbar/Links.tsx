"use client";

import Link from "next/link";
import { Button } from "../ui/button";

const Links = () => {
  return (
    <div>
      <nav className="flex items-center text-sm font-medium">
        <Link href={"/cards"}>
          <Button variant={"link"}>Cards</Button>
        </Link>
      </nav>
    </div>
  );
};

export default Links;
