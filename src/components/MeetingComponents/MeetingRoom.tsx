"use client";
import { cn } from "@/lib/utils";
import {
  CallControls,
  CallingState,
  CallParticipantsList,
  CallStatsButton,
  PaginatedGridLayout,
  SpeakerLayout,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import React, { useState } from "react";
import { LayoutList, Users } from "lucide-react";
import { useSearchParams } from "next/navigation";
import EndCall from "./EndCall";
import Loader from "../HomeComponents/Loader";

type CallLayoutType = "grid" | "speaker-left" | "speaker-right";

const MeetingRoom = () => {
  const [layout, setLayout] = useState<CallLayoutType>("speaker-left");
  const [showPerticipent, setShowPerticipent] = useState(false);
  const searchParams = useSearchParams();
  const isPersonalRoom = !!searchParams.get("personal");
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();

  if (callingState !== CallingState.JOINED) return <Loader />;

  const CallLayout = () => {
    switch (layout) {
      case "grid":
        return <PaginatedGridLayout />;
      case "speaker-right":
        return <SpeakerLayout participantsBarPosition={"left"} />;
      default:
        return <SpeakerLayout participantsBarPosition={"right"} />;
    }
  };
  return (
    <div className="relative h-screen w-full overflow-hidden pt-4">
      <div className="flex items-center justify-center relative size-full">
        <div className="flex size-full max-w-[1000px] items-center">
          <CallLayout />
        </div>
        <div
          className={`h-[calc(100vh-86px)] ${
            showPerticipent ? "block" : "hidden"
          } ml-2`}
        >
          <CallParticipantsList onClose={() => setShowPerticipent(false)} />
        </div>
      </div>
      <div className="fixed bottom-0 flex w-full items-center justify-center gap-5 flex-wrap">
        <CallControls />

        <DropdownMenu>
          <div className="flex items-center">
            <DropdownMenuTrigger className="rounded-full cursor-pointer p-2 bg-slate-600 hover:bg-blue-500">
              <LayoutList size={20} />
            </DropdownMenuTrigger>
          </div>

          <DropdownMenuContent>
            {["grid", "speaker-right", "speaker-left"].map((item, index) => (
              <div key={index}>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => {
                    setLayout(item as CallLayoutType);
                  }}
                >
                  {item}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
              </div>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <CallStatsButton />
        <button onClick={() => setShowPerticipent((prev) => !prev)}>
          <div className="rounded-full cursor-pointer p-2 bg-slate-600 hover:bg-blue-500">
            <Users size={20} />
          </div>
        </button>
        {!isPersonalRoom && <EndCall />}
      </div>
    </div>
  );
};

export default MeetingRoom;
