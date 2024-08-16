"use client";
import {
  DeviceSettings,
  useCall,
  VideoPreview,
} from "@stream-io/video-react-sdk";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";

const MeetingSetup = ({
  setIsSetupCompleted,
}: {
  setIsSetupCompleted: (value: boolean) => void;
}) => {
  const [micToggleOn, setMicToggleOn] = useState(false);
  const call = useCall();
  if (!call) {
    throw new Error("usecall must be used within StreamCall Component");
  }
  useEffect(() => {
    if (call) {
      if (micToggleOn) {
        call.microphone.disable();
        call.camera.disable();
      } else {
        call.microphone.enable();
        call.camera.enable();
      }
    }
  }, [micToggleOn, call]);

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-3">
      <h1 className="text-2xl font-bold">Setup</h1>
      {call && <VideoPreview className="w-1/2" />}
      <div className="flex h-16 items-center justify-center gap-3">
        <label className="flex items-center justify-center gap-2 font-medium">
          <input
            type="checkbox"
            checked={micToggleOn}
            name=""
            id=""
            onChange={(e) => setMicToggleOn(e.target.checked)}
          />
          Join with mic and camera off.
        </label>
        <DeviceSettings />
      </div>
      <Button
        className="bg-green-400"
        onClick={() => {
          call.join();
          setIsSetupCompleted(true);
        }}
      >
        Join Meeting
      </Button>
    </div>
  );
};

export default MeetingSetup;
