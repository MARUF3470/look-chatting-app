"use client";

import { StreamVideo, StreamVideoClient } from "@stream-io/video-react-sdk";

import { ReactNode, useEffect, useState } from "react";
import { tokenProvider } from "../actions/stream.actions";
import Loader from "@/components/HomeComponents/Loader";
import { useSession } from "next-auth/react";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;

const StreamVideoProvider = ({ children }: { children: ReactNode }) => {
  const { data } = useSession();
  console.log(data, apiKey);
  const [videoClient, setvideoClient] = useState<StreamVideoClient>();

  useEffect(() => {
    if (!data?.user) return;
    if (!apiKey) throw new Error("Stream api key is missing.");

    const client = new StreamVideoClient({
      apiKey,
      user: {
        id: data?.user?.id,
        name: data?.user?.username || data?.user?.id,
        image: data?.user?.image ?? undefined,
      },
      tokenProvider: tokenProvider,
    });
    setvideoClient(client);
  }, [data?.user]);
  if (!videoClient) return <Loader />;

  return <StreamVideo client={videoClient}>{children}</StreamVideo>;
};

export default StreamVideoProvider;
