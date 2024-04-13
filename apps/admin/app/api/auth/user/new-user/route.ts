import db from "@repo/db/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.json();
  const userId = body.userId;

  const user = await db.admin.findUnique({
    where: {
      id: userId,
    },
  });

  if (user) {
    await db.admin.update({
      where: {
        id: userId,
      },
      data: {
        newUser: false,
      },
    });
  }

  return NextResponse.json({ message: "User updated" });
}
