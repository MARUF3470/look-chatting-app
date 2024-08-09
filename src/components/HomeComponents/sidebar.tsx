"use client";
import React from "react";
import { sideBarLinksArray } from "../../../constants";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Image from "next/image";

const Sidebar = () => {
  const pathname = usePathname();
  return (
    <section className="sticky left-0 top-0 h-screen flex w-fit flex-col justify-between max-sm:hidden lg:w-[264px]">
      <div className="flex flex-1 flex-col gap-6 p-6  bg-zinc-900">
        {sideBarLinksArray.map((link) => {
          const isActive =
            pathname === link.route || pathname.startsWith(`${link.route}/`);

          return (
            <Link
              href={link.route}
              key={link.label}
              className={cn(
                "flex gap-4 items-center rounded-lg justify-start p-4",
                {
                  "bg-blue-500": isActive,
                }
              )}
            >
              <Image
                src={link.imgUrl}
                alt={link.label}
                width={24}
                height={24}
              />
              <p className="text-lg font-semibold max-lg:hidden">
                {link.label}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Sidebar;
