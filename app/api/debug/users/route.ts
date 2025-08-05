import { NextRequest, NextResponse } from "next/server";
import { userStore } from "@/lib/userStore";

export async function GET(request: NextRequest) {
  try {
    const userCount = userStore.getUserCount();
    const users = userStore.getAllUsers().map(user => ({
      id: user.id,
      username: user.username,
      createdAt: user.createdAt
    })); // Don't return passwords for security

    return NextResponse.json({
      userCount,
      users,
      message: `Found ${userCount} user(s) in store`
    });
  } catch (error) {
    console.error("Debug users error:", error);
    return NextResponse.json({ error: "Debug failed" }, { status: 500 });
  }
}