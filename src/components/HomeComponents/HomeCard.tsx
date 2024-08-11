"use client";
import { cn } from "@/lib/utils";
import { HomeCardParamsType } from "@/types/paramsType";
import Image from "next/image";
import React from "react";

const HomeCard = ({
  img,
  title,
  description,
  handleClick,
  className,
}: HomeCardParamsType) => {
  return (
    <div
      className={cn(
        "px-4 py-6 flex flex-col justify-between w-full xl:max-w-[270px] min-h-[260px] rounded-xl cursor-pointer",
        className
      )}
      onClick={handleClick}
    >
      <div className="flex justify-center size-12 rounded-lg glassmorphisom">
        <Image src={img} width={27} height={27} alt="" />
      </div>
      <div className="flex flex-col gap-5">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-lg font-normal">{description}.</p>
      </div>
    </div>
  );
};

export default HomeCard;
