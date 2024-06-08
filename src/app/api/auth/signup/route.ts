import { hashPassword } from "@/lib/auth";
import dbConnect from "@/lib/db";
import { NextResponse } from "next/server";
import USER from "@/models/user";
export async function POST(request: Request) {
  try {
    const data = await request.json();
    if (!data) {
      throw new TypeError("Request body is null");
    }
    const { email, password, name, role } = data;
    if (!email || !password || !name || !role) {
      throw new TypeError("Missing required fields");
    }
    if (
      typeof email !== "string" ||
      typeof password !== "string" ||
      typeof name !== "string" ||
      typeof role !== "string"
    ) {
      throw new TypeError("Invalid data type");
    }
    await dbConnect();
    const hashPass = await hashPassword(password);
    if (!hashPass) {
      throw new Error("Failed to hash password");
    }

    const existingUser = await USER.findOne({ email });
    if (existingUser) {
      throw new Error("User already exists");
    }

    const result = await new USER({
      email,
      password: hashPass,
      name,
      role,
    }).save();
    if (!result) {
      throw new Error("Failed to insert user into database");
    }
    return NextResponse.json({ message: "user created success" });
  } catch (err) {
    if (err instanceof TypeError) {
      return NextResponse.json(
        { message: "Something went wrong", error: err.message },
        { status: 400 }
      );
    } else if (err instanceof Error) {
      return NextResponse.json({ message: err.message }, { status: 500 });
    } else {
      return NextResponse.json(
        { message: "Something went wrong", error: err },
        { status: 400 }
      );
    }
  }
}
