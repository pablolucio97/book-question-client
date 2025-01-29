import logo from "@/assets/logo_text.svg";
import Image from "next/image";

export default function LogoText() {
  return <Image src={logo} alt="logo" className="w-40 md:w-48" />;
}
