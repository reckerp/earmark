import NextAuth from "next-auth";
import type { NextAuthConfig } from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
import prisma from "@/prisma/connection";

const authOptions = {
    providers: [
        SpotifyProvider({
            clientId: process.env.SPOTIFY_CLIENT_ID,
            clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
        }),
    ],
    secret: process.env.AUTH_SECRET,
    trustHost: true,
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            if (!user.email) {
                return false;
            }
            let db_user = await prisma.users.findUnique({
                where: {
                    email: user.email,
                },
            });

            if (!db_user) {
                db_user = await prisma.users.create({
                    data: {
                        email: user.email
                    },
                });
            }

            if (account?.provider === 'spotify') {
                return true;
            }
            return false;
        },
        async jwt({ token, account }) {
            if (account) {
                token = Object.assign({}, token, { access_token: account.access_token });
                token = Object.assign({}, token, { refresh_token: account.refresh_token });
                token = Object.assign({}, token, { token_expiry: account.expires_at });
            }
            return token
        },
        async session({ session, token }) {
            if (session) {
                let user = Object.assign({}, session.user, { access_token: token.access_token })
                user = Object.assign({}, user, { refresh_token: token.refresh_token })
                user = Object.assign({}, user, { token_expiry: token.token_expiry })

                session = Object.assign({}, session, { user })
            }
            return session
        }
    },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);
