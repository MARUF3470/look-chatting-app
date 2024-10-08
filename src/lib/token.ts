import { getVerificationTokenByEmail } from "@/app/utils/verificationToken";
import { v4 as uuid4 } from "uuid";
import db from "./db";
import { getPasswordResetTokenByEmail } from "@/app/utils/passwordResetToken";

export const generateverificationToken = async (email: string) => {
    const token = uuid4()
    const expires = new Date(new Date().getTime() + 3600 * 1000)

    const existingToken = await getVerificationTokenByEmail(email)
    if (existingToken) {
        await db.verificationToken.delete({
            where: {
                id: existingToken.id
            }
        })
    }
    const verificationToken = await db.verificationToken.create({
        data: {
            email,
            token,
            expires
        }
    })
    return verificationToken
}

export const generatePasswordResetToken = async (email: string) => {
    const token = uuid4()
    const expires = new Date(new Date().getTime() + 3600 * 1000)

    const existingToken = await getPasswordResetTokenByEmail(email)
    if (existingToken) {
        await db.passwordResetToken.delete({
            where: {
                id: existingToken.id
            }
        })
    }

    const resetToken = await db.passwordResetToken.create({
        data: {
            email,
            token,
            expires
        }
    })
    return resetToken

}