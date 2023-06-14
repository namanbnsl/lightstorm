"use client";

import Link from "next/link";

const Logo = () => {
  return (
    <div className="hidden md:flex">
      {/* Logo */}
      <Link href="/" className="flex items-center">
        <span className="hidden font-bold sm:inline-block">light.storm</span>
      </Link>
    </div>
  );
};

export default Logo;
