import { NextRequest, NextResponse } from "next/server";

const users: any[] = [];

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: "Username and password are required" },
        { status: 400 }
      );
    }

    if (users.find((u) => u.username === username)) {
      return NextResponse.json(
        { error: "Username already exists" },
        { status: 409 }
      );
    }

    const recoveryPhrase = generateRecoveryPhrase();

    const user = {
      id: Date.now().toString(),
      username,
      password: password,
      recoveryPhrase,
      createdAt: new Date(),
    };

    users.push(user);

    const token = `token_${user.id}_${Date.now()}`;

    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json({
      user: userWithoutPassword,
      token,
    });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json({ error: "Registration failed" }, { status: 500 });
  }
}

function generateRecoveryPhrase(): string {
  const words = [
    "abandon",
    "ability",
    "able",
    "about",
    "above",
    "absent",
    "absorb",
    "abstract",
    "absurd",
    "abuse",
    "access",
    "accident",
    "account",
    "accuse",
    "achieve",
    "acid",
    "acoustic",
    "acquire",
    "across",
    "act",
    "action",
    "actor",
    "actual",
    "adapt",
    "add",
    "addict",
    "address",
    "adjust",
    "admit",
    "adult",
    "advance",
    "advice",
    "aerobic",
    "affair",
    "afford",
    "afraid",
    "again",
    "age",
    "agent",
    "agree",
    "ahead",
    "aim",
    "air",
    "airport",
    "aisle",
    "alarm",
    "album",
    "alcohol",
    "alert",
    "alien",
  ];

  const phrase = [];
  for (let i = 0; i < 12; i++) {
    phrase.push(words[Math.floor(Math.random() * words.length)]);
  }
  return phrase.join(" ");
}
