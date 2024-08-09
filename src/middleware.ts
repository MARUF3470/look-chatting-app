// import { withAuth } from "next-auth/middleware"

// export const config = { matcher: ["/"] }

// ********for role based authentication *********
// export default withAuth({
//     callbacks: {
//         authorized: ({ req, token }) => {
//             if (req.nextUrl.pathname === "/admin") {
//                 return token?.isAdmin === true
//             }
//             return Boolean(token)
//         }
//     }
// })

// *************************************************

export { default } from "next-auth/middleware"

export const config = { matcher: ["/", "/admin", "/protected", "/protected/:path*"] }
