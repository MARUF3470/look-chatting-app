import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
    const confirmLink = `http://localhost:3000/authentication/new-verification?token=${token}`

    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: 'Confirm Your Email',
        html: `<p>You need to confirm your email for opening an account in Look, <a href="${confirmLink}">Click Here.</a></p>`
    });
}