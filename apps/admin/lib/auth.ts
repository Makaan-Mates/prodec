import GoogleProvider from "next-auth/providers/google";
import db from "@repo/db/client";

export const NEXT_AUTH_CONFIG = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET ?? "",
};

// Function to ensure a dummy admin exists
async function ensureDummyAdminExists() {
  const username = "dummyAdmin"; // Example username
  const email = "dummy@admin.com"; // Example email
  let admin = await db.admin.findUnique({
    where: {
      username: username,
    },
  });

  if (!admin) {
    admin = await db.admin.create({
      data: {
        email: email,
        username: username,
        name: "Dummy Admin", // Optional name
      },
    });
    console.log("Dummy admin created:", admin);
  } else {
    console.log("Dummy admin already exists.");
  }
}

// Call the function to ensure the dummy admin exists
ensureDummyAdminExists().catch((error) => {
  console.error("Failed to ensure dummy admin exists:", error);
});