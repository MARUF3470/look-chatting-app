
import { Resend } from 'resend';
import { encrypt } from './encrypt&decrypt';
const resend = new Resend(process.env.RESEND_API_KEY);


export const sendVerificationEmail = async (email: string, token: string, username: string, password: string, imagePath: string | null) => {
    const data = { username, password, imagePath };
    const encryptedData = encrypt(JSON.stringify(data));

    const confirmLink = `http://localhost:3000/authentication/new-verification?token=${token}&data=${encodeURIComponent(JSON.stringify(encryptedData))}`

    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: 'Confirm Your Email',
        html: `<p>You need to confirm your email for opening an account in Look, <a href="${confirmLink}">Click Here.</a></p>`
    });
}