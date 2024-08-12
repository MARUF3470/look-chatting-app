'use server'

import { StreamClient } from '@stream-io/node-sdk';

import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const apiSecret = process.env.STREAM_SECRATE

export const tokenProvider = async () => {
    const session = await getServerSession(authOptions);
    const user = session?.user
    if (!user) throw new Error('User is not logged in.')
    if (!apiKey) throw new Error('No api key is found.')
    if (!apiSecret) throw new Error('No api secret is found.')

    const client = new StreamClient(apiKey, apiSecret)

    // exp is optional (by default the token is valid for an hour)
    const exp = Math.round(new Date().getTime() / 1000) + 60 * 60;

    const issued = Math.floor(Date.now() / 1000) - 60

    const token = client.createToken(user.id, exp, issued)

    return token
}