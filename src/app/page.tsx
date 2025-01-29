"use client";

import googleIcon from "@/assets/google_icon.svg";
import Button from "@/components/Button";
import LogoText from "@/components/LogoText";
import Subtitle from "@/components/Typography/Subtitle";
import Title from "@/components/Typography/Title";
import { signIn } from "next-auth/react";
import Image from "next/image";

export default function Home() {
  const handleSignIn = async () => {
    await signIn("google", { redirect: true, callbackUrl: "/books" });
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-full min-h-[80vh] flex flex-col items-center justify-center pt-16 bg-gradient-to-r from-black to-gray-700">
        <Title content="Have an answer for each book question." />
        <Subtitle content="Powered by AI." className="mt-4 mb-10" />
        <Button
          title="Start with Google"
          icon={
            <Image
              src={googleIcon}
              className="w-6 h-6 mr-2"
              alt="google-logo"
            />
          }
          onClick={handleSignIn}
        />
        <div className="w-full p-4 md:p-8 flex justify-center mt-24">
          <LogoText />
        </div>
      </div>
    </div>
  );
}
