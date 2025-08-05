import { NextRequest, NextResponse } from "next/server";
import { userStore } from "@/lib/userStore";

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: "Username and password are required" },
        { status: 400 }
      );
    }

    console.log(`Login attempt for username: ${username}`);
    console.log(`Total users in store: ${userStore.getUserCount()}`);

    const user = userStore.validateCredentials(username, password);

    if (!user) {
      console.log(`Invalid credentials for username: ${username}`);
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const token = `token_${user.id}_${Date.now()}`;

    const { password: _, ...userWithoutPassword } = user;

    console.log(`Login successful for username: ${username}`);
    return NextResponse.json({
      user: userWithoutPassword,
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}
