import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const GoogleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
const GoogleClientSecret = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET;

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: GoogleClientId as string,
      clientSecret: GoogleClientSecret as string,
    }),
  ],
  secret: process.env.SECRET,
});
