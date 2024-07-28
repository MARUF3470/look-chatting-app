"use server"

import { decrypt } from "@/lib/encrypt&decrypt";
import { getVerificationTokenByToken } from "./verificationToken"
import db from "@/lib/db"
import EncryptedData from "@/types/encyptionType";

type D = {
    username: string
}

export const newVerification = async (token: string, data: string) => {

    const decryptedData = decrypt(JSON.parse(decodeURIComponent(data)) as EncryptedData);

    const registrationData = JSON.parse(decryptedData)

    const existingToken = await getVerificationTokenByToken(token)
    if (!existingToken) {
        return { error: 'Token does not exist.' }
    }
    const hasExpired = new Date(existingToken.expires) < new Date();
    if (hasExpired) {
        return { error: 'Token has expired.' }
    }

    await db.user.create({
        data: {
            email: existingToken?.email,
            username: registrationData?.username,
            password: registrationData?.password,
            emailVerified: true,
            image: registrationData?.imagePath
        }
    })
    await db.verificationToken.delete({
        where: { id: existingToken.id }
    })
    return { success: 'Email is verified.' }
}
