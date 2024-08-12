import NextAuth from "next-auth"

declare module "next-auth" {
    interface User {
        username: string
        isAdmin: boolean
        id: string
    }
    interface Session {
        user: User & {
            username: string
            isAdmin: boolean
            id: string
        }
        token: {
            username: string
            isAdmin: boolean
            id: string
        }
    }

}