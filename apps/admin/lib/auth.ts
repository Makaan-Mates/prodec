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
    newUser: boolean;
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
    async signIn({ user }: { user: Admin }) {
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
            newUser: true,
          },
        });
      }
      return true;
    },
    async session({ session }: { session: Session }) {
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
        session.user.newUser = dbUser.newUser;
      }

      return session;
    },
  },
};
