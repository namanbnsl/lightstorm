import { NewUser, users } from "@/db/schema";
import { drizzle } from "drizzle-orm/postgres-js";
import NextAuth, { AuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import GoogleProvider from "next-auth/providers/google";
import postgres from "postgres";

export const authOptions: AuthOptions = {
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_ID as string,
      clientSecret: process.env.DISCORD_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      const connectionString = process.env.DATABASE_URL as string;
      const sql = postgres(connectionString, { max: 1 });
      const db = drizzle(sql);

      const data: NewUser = {
        email: user.email as string,
        name: user.name,
        image: user.image,
      };

      await db
        .insert(users)
        .values(data)
        .onConflictDoUpdate({
          target: users.email,
          set: { name: data.name, image: data.image },
        });

      return true;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
