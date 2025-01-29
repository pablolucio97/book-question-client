import robotIcon from "@/assets/robot.svg";
import Image from "next/image";
import { ReactNode } from "react";

interface LoadingProps {
  title?: string;
  icon?: ReactNode;
}

export default function Loading({ title, icon }: LoadingProps) {
  return (
    <div className="flex flex-col items-center justify-center mx-auto">
      <span className="text-md md:text-lg mb-4>">
        {title ? title : "Loading..."}
      </span>
      {icon ? (
        icon
      ) : (
        <Image src={robotIcon} alt="loading" className="w-16 h-16 mt-4 animate-pulse" />
      )}
    </div>
  );
}
