import GoogleProvider from "next-auth/providers/google";
import db from "@repo/db/client";

interface Admin {
  id: string;
  name: string;
  email: string;
  username: string;
  image: string | null;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Session {
  user: {
    id: string;
    name: string;
    email: string;
    username: string;
    image: string | null;
    role: string;
  };
}

export const NEXT_AUTH_CONFIG = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET ?? "",

  callbacks: {
    async signIn({
      user,
      account,
      profile,
      email,
      credentials,
    }: {
      user: Admin;
    }) {
      // Find the user in the Admin table
      const dbUser = await db.admin.findUnique({
        where: {
          email: user.email,
        },
      });

      if (!dbUser) {
        // If the user doesn't exist, create a new Admin entry
        const usernameBase = user.email.split("@")[0];

        await db.admin.create({
          data: {
            email: user.email,
            name: user.name,
            username: `${usernameBase}`,
            image: user.image ?? null,
            role: "admin",
          },
        });
        console.log(`New user signed up: ${JSON.stringify(user)}`);
      } else {
        console.log(`Existing user signed in: ${JSON.stringify(user)}`);
      }

      return "/onboarding"; // Allow the sign-in
    },
    async session({ session }: { session: Session,}) {
      // Fetch additional user information from the Admin table
      const dbUser = await db.admin.findUnique({
        where: {
          email: session.user.email,
        },
      });

      if (dbUser) {
        // Add custom user information to the session object
        session.user.id = dbUser.id;
        session.user.role = dbUser.role;
        session.user.username = dbUser.username;
        session.user.image = dbUser.image;
      }

      return session;
    },
  },
};
