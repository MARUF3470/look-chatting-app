"use server"

import { NewPasswordSchema } from "@/schemas/schema"
import { z } from "zod"
import { getPasswordResetTokenByToken } from "./passwordResetToken"
import db from "@/lib/db"
import { hash } from "bcrypt";

export const newPassword = async (values: z.infer<typeof NewPasswordSchema>, token: string | null) => {
    if (!token) {
        return { error: 'Token is missing.' }
    }
    const validatedFields = NewPasswordSchema.safeParse(values)
    if (!validatedFields.success) return { error: 'Invalid Fields.' }
    const { password } = validatedFields.data

    const existingToken = await getPasswordResetTokenByToken(token)
    if (!existingToken) return { error: 'Invalid token.' }

    const hasExpire = new Date(existingToken.expires) < new Date()

    if (hasExpire) {
        return { error: 'Token has expired.' }
    }

    const existingUser = await db.user.findFirst({
        where: { email: existingToken.email }
    })

    if (!existingUser) {
        return { error: "Email doesn't exist." }
    }

    const hashPassword = await hash(password, 10);
    await db.user.update({
        where: { id: existingUser.id },
        data: { password: hashPassword }
    })

    await db.passwordResetToken.delete({
        where: { id: existingToken.id }
    })

    return { success: 'Password updated.' }
}