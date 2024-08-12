import Image from "next/image";
import Link from "next/link";
import React from "react";
import MobileNav from "./MobileNav";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import ThemeToggleBtn from "../common/ThemeToggleBtn";
import Logout from "../common/Logout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Navbar = async () => {
  const session = await getServerSession(authOptions);
  console.log(session?.user);
  return (
    <nav className="flex justify-between z-50 w-full px-6 py-4 lg:px-10 bg-zinc-900">
      <Link href="/" className="flex items-center gap-1">
        <Image
          src="/icons/logo.svg"
          width={32}
          height={32}
          alt="Look logo"
          className="max-sm:size-10"
        />
        <p className="text-[26px] font-extrabold text-white max-sm:hidden">
          Look
        </p>
      </Link>

      <div className="flex justify-between items-center gap-5">
        <div className="flex gap-2">
          {session?.user?.email && (
            <Avatar>
              <AvatarImage src={`${session?.user.image}`} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          )}
          {session?.user?.email && <Logout />}
          <div className="hidden lg:block md:block">
            <ThemeToggleBtn />
          </div>
        </div>
        <MobileNav />
      </div>
    </nav>
  );
};

export default Navbar;
