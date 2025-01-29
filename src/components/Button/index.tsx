import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  icon?: ReactNode;
}

export default function Button({
  title,
  icon,
  className,
  ...props
}: ButtonProps) {
  const combinedClassName = `flex items-center justify-center min-w-64 h-12 bg-primary rounded-md text-white text-sm md:text-md p-4 font-poppins font-bold disabled:opacity-50 ${
    className || ""
  }`;
  return (
    <button className={combinedClassName} {...props}>
      {icon && icon}
      {title}
    </button>
  );
}
