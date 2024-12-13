// in auth.ts

import { AuthOptions, getServerSession } from "next-auth";
import Facebook from "next-auth/providers/facebook";

// scope
const authOptions: AuthOptions = {
  // Configure one or more authentication providers
  providers: [
    Facebook({
      clientId: process.env.FACEBOOK_ID!,
      clientSecret: process.env.FACEBOOK_SECRET!,
      authorization: {
        params: {
          scope: "public_profile",
        },
      },
    }),

    // ...add more providers here
  ],
};

/**
 * Helper function to get the session on the server without having to import the authOptions object every single time
 * @returns The session object or null
 */
const getSession = () => getServerSession(authOptions);

export { authOptions, getSession };
