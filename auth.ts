// in auth.ts

import { AuthOptions, getServerSession } from "next-auth";
import google from "next-auth/providers/google";

// scope
const authOptions: AuthOptions = {
  
  providers: [
    google({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
      authorization: {
        params: {
          scope: 'openid profile email',         
        },
      },
    }),   
  ],
  callbacks: {
    async session({ session, token }) {
      return session;
    },
  },
};

/**
 * Helper function to get the session on the server without having to import the authOptions object every single time
 * @returns The session object or null
 */
const getSession = () => getServerSession(authOptions);

export { authOptions, getSession };
