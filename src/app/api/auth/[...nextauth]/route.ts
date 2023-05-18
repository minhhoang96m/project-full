import prisma from '@/src/lib/prisma'
import {PrismaAdapter} from '@next-auth/prisma-adapter'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'

// * Takes a token, and returns a new token with updated
// * `accessToken` and `accessTokenExpires`. If an error occurs,
// * returns the old token and an error property

// const GOOGLE_AUTHORIZATION_URL =
//     'https://accounts.google.com/o/oauth2/v2/auth?' +
//     new URLSearchParams({
//         prompt: 'consent',
//         access_type: 'offline',
//         response_type: 'code',
//     })

// async function refreshAccessToken(token: any) {
//     try {
//         const url =
//             'https://oauth2.googleapis.com/token?' +
//             new URLSearchParams({
//                 client_id: process.env.GOOGLE_CLIENT_ID as string,
//                 client_secret: process.env.GOOGLE_CLIENT_SECRET as string,
//                 grant_type: 'refresh_token',
//                 refresh_token: token.refreshToken,
//             })

//         const response = await fetch(url, {
//             headers: {
//                 'Content-Type': 'application/x-www-form-urlencoded',
//             },
//             method: 'POST',
//         })

//         const refreshedTokens = await response.json()

//         if (!response.ok) {
//             throw refreshedTokens
//         }

//         return {
//             ...token,
//             accessToken: refreshedTokens.access_token,
//             accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
//             refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token
//         }
//     } catch (error) {
//         console.log(error)

//         return {
//             ...token,
//             error: 'RefreshAccessTokenError',
//         }
//     }
// }

const handler = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: 'Credentials',
            // The credentials is used to generate a suitable form on the sign in page.
            // You can specify whatever fields you are expecting to be submitted.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                username: {
                    label: 'Username',
                    type: 'text',
                    placeholder: 'USERNAME',
                },
                password: {
                    label: 'Password',
                    type: 'password',
                    placeholder: 'PASSWORD',
                },
            },
            async authorize(credentials, req) {
                // You need to provide your own logic here that takes the credentials
                // submitted and returns either a object representing a user or value
                // that is false/null if the credentials are invalid.
                // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
                // You can also use the `req` object to obtain additional parameters
                // (i.e., the request IP address)
                const res = await fetch('http://localhost:3000/api/login', {
                    method: 'POST',
                    body: JSON.stringify({
                        username: credentials?.username,
                        password: credentials?.password,
                    }),
                    headers: {'Content-Type': 'application/json'},
                })
                const user = await res.json()
         
                // If no error and we have user data, return it
                if (user) {
                    return user
                }
                // Return null if user data could not be retrieved
                return null
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            // authorization: GOOGLE_AUTHORIZATION_URL,
        }),
    ],
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        async jwt({token, account, user}) {

            // Initial sign in
            // if (account && user && account.expires_at) {
            //     return {
            //         ...token,
            //         accessTokenExpires : Date.now() + account.expires_at * 1000,
            //         refreshToken: account.refresh_token
            //     }
            // }
            // // Return previous token if the access token has not expired yet
            // if (Date.now() < token.access_token_expires) {
            //     return {...token, ...user, ...account}
            // }

            // Access token has expired, try to update it
            
            return {...token, ...user, ...account}
        },

        async session({session, token}) {
            session.user = token as any

            return session
        },
    },
})

export {handler as GET, handler as POST}
