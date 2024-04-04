import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        user: {
            /** Oauth access token */
            access_token?: string;
            /** Oauth refresh token */
            refresh_token?: string;
            /** Oauth token expiry date */
            token_expiry?: number;
        } & DefaultSession["user"];
    }
}

