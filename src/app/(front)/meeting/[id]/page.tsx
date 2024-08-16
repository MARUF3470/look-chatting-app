"use client";
import MeetingRoom from "@/components/MeetingComponents/MeetingRoom";
import MeetingSetup from "@/components/MeetingComponents/MeetingSetup";
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import { useSession } from "next-auth/react";

import React, { useState } from "react";
import useGetCallById from "../../../../../hooks/useGetCallById";
import Loader from "@/components/HomeComponents/Loader";

export default function Meeting({ params }: { params: { id: string } }) {
  const { data } = useSession();
  const [isSetupCompleted, setIsSetupCompleted] = useState(false);

  const { call, callLoading } = useGetCallById(params?.id);

  if (callLoading) return <Loader />;
  return (
    <main className="w-full h-screen">
      <StreamCall call={call}>
        <StreamTheme>
          {!isSetupCompleted ? (
            <MeetingSetup setIsSetupCompleted={setIsSetupCompleted} />
          ) : (
            <MeetingRoom />
          )}
        </StreamTheme>
      </StreamCall>
    </main>
  );
}
