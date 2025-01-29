import { InputHTMLAttributes } from "react";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  title: string;
  placeholder?: string;
}

export default function TextInput({
  title,
  className,
  ...props
}: TextInputProps) {
  const combinedClassName = `w-full flex items-center justify-center min-w-40 h-12 border-[1px] border-gray-200 outline-none focus:border-primary bg-background rounded-md text-white text-md px-3 ${
    className || ""
  }`;
  return (
    <div className="block w-full">
      <span className="text-xs md:text-sm mb-1 font-poppins font-bold">
        {title}
      </span>
      <input className={combinedClassName} {...props} />
    </div>
  );
}
