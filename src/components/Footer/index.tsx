import { getCurrentYear } from "@/utils/date";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="w-full min-h-[40] flex flex-col items-center justify-center py-8">
      <div className="w-full flex items-center justify-center">
        <span className="text-xs md:text-sm">{`${getCurrentYear()} - Developed with`}</span>
        <span className="text-sm md:text-md mx-1 text-primary">❤</span>
        <span className="text-xs md:text-sm">by Pablo Silva Dev</span>
      </div>
      <div className="w-1/2 md:w-1/3 h-[1px] bg-gray-100 my-4"></div>
      <Link href="https://www.pablosilvadev.com.br" target="_blank">
        Access my website
      </Link>
    </div>
  );
}
