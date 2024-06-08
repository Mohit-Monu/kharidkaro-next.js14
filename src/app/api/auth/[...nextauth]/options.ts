import { verifyPassword } from "@/lib/auth";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@/lib/db";
import User from "@/models/user";
export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
        role:{
          label: "Role",
          type: "text",
        }
      },
      async authorize(
        credentials
      ): Promise<{ id: string; name: string; role: string; email: string }> {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }
        await dbConnect();
        const user = await User.findOne({ email: credentials?.email });
        if (!user) {
          throw new Error("User not found");
        }
        if(user.role !== credentials?.role){
          throw new Error("Wrong way of login");
        }
        const isValid = await verifyPassword(
          credentials?.password,
          user?.password
        );
        if (!isValid) {
          throw new Error("Invalid password");
        }
        return {
          id: user._id,
          name: user.name,
          role: user.role,
          email: user.email,
        };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token = { ...token, ...user };
      }
      return token;
    },
    session({session,token}){
      session.user={
        ...session.user,
        role:token.role,
        id:token.id
      }
      return session
    }
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/authenticate",
  },
};
