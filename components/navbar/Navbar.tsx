"use client";

import Links from "./Links";
import Logo from "./Logo";
import UserNav from "./UserNav";

const Navbar = () => {
  return (
    <div className="hidden flex-col md:flex">
      <div>
        <div className="flex h-20 items-center px-8 mx-8 justify-between">
          <Logo />
          <Links />
          <UserNav />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
