import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { NEXT_AUTH_CONFIG } from "../../../lib/auth";

export const GET = async () => {
  const session = await getServerSession(NEXT_AUTH_CONFIG);
  if (session.user) {
    return NextResponse.json({
      user: session.user,
    });
  }
  return NextResponse.json(
    {
      message: "You are not logged in",
    },
    {
      status: 403,
    },
  );
};
