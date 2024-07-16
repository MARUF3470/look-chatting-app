import db from "@/lib/db";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";
import { join } from "path";
import { writeFile, mkdir } from "fs/promises";

export const POST = async (req: Request) => {
    try {
        const data = await req.formData();
        const username = data.get("username");
        const email = data.get("email");
        const password = data.get("password");
        const image = data.get("image");

        if (typeof username !== "string" || typeof email !== "string" || typeof password !== "string") {
            return NextResponse.json({ message: "Invalid input data" }, { status: 400 });
        }

        let imagePath = null;
        if (image instanceof File) {
            const buffer = Buffer.from(await image.arrayBuffer());
            const uploadDir = join(process.cwd(), "public", "uploads");
            const uniqueName = Date.now() + "_";
            const imgExt = image.name.split(".").pop();
            const filename = uniqueName + "." + imgExt;
            imagePath = `/uploads/${filename}`;

            // Ensure the upload directory exists
            await mkdir(uploadDir, { recursive: true });

            await writeFile(`${uploadDir}/${filename}`, buffer);
        }

        const existingEmail = await db.user.findUnique({
            where: { email: email }
        });
        if (existingEmail) {
            return NextResponse.json({ user: null, message: 'User email already exists' });
        }

        const existingUserName = await db.user.findUnique({
            where: { username: username }
        });
        if (existingUserName) {
            return NextResponse.json({ user: null, message: 'Username already exists, try another username' });
        }

        const hashPassword = await hash(password, 10);
        const newUser = await db.user.create({
            data: {
                email,
                username,
                password: hashPassword,
                image: imagePath // Save the image path in the database
            }
        });

        return NextResponse.json({ user: newUser, message: 'User created successfully' }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
    }
};
