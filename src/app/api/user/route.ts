import db from "@/lib/db"
import { hash } from "bcrypt"
import { NextResponse } from "next/server"

import { z } from "zod";

const userSchema = z.object({
    username: z
        .string()
        .min(2, {
            message: "Email must be at least 2 characters.",
        })
        .max(100),
    email: z.string().min(11, {
        message: "Email must be at least 11 characters.",
    }),
    password: z
        .string()
        .min(1, {
            message: "Password is requied.",
        })
        .min(6, {
            message: "Password must be at least 6 characters.",
        }),
    image: z
        .instanceof(File)
        .refine((file) => file.size <= 5 * 1024 * 1024, {
            message: "Image size should be less than 5MB.",
        })
        .optional(), // Make image optional in the schema
});

export const POST = async (req: Request) => {
    try {
        const body = await req.json()
        const { email, username, password } = userSchema.parse(body)
        const existingEmail = await db.user.findUnique({
            where: { email: email }
        })
        if (existingEmail) {
            return NextResponse.json({ user: null, message: 'User email already exist' })
        }
        const existingUserName = await db.user.findUnique({
            where: { username: username }
        })
        if (existingUserName) {
            return NextResponse.json({ user: null, message: 'Username already exist, try another username' })
        }
        const hashPassword = await hash(password, 10)
        const newUser = await db.user.create({
            data: {
                email,
                username,
                password: hashPassword
            }
        })
        return NextResponse.json({ user: newUser, message: 'User created successfully' }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: 'Something went wrong' }, { status: 500 })
    }
}