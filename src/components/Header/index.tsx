"use client";

import logout from "@/assets/logout.svg";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import LogoText from "../LogoText";

export default function Header() {
  const handleSignOut = async () => {
    await signOut({ redirect: true, callbackUrl: "/" });
  };

  const { data } = useSession();

  if (data && data.user) {
    return (
      <header className="w-screen h-16 flex p-4 bg-gray-900">
        <div className="flex w-full lg:w-[1000px] xl:w-[1400px]  mx-auto justify-between items-center">
          <div className="flex items-center">
            <LogoText />
          </div>
          <div className="flex items-center">
            <span className="text-sm md:text-md pr-3 mr-3 border-r-2 border-gray-100">
              {data.user.name}
            </span>
            <button className="text-sm md:text-md" onClick={handleSignOut}>
              Logout
            </button>
            <Image src={logout} alt="logout" className="w-5 h-5 ml-2" />
          </div>
        </div>
      </header>
    );
  } else {
    return null;
  }
}
