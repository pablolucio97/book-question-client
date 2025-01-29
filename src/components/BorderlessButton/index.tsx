import { HTMLAttributes } from "react";

interface BorderlessButtonProps extends HTMLAttributes<HTMLButtonElement> {
  title: string;
}

export default function BorderlessButton({
  title,
  className,
  ...props
}: BorderlessButtonProps) {
  const combinedClassName = `flex items-center justify-center min-w-40 h-12 rounded-md text-sm md:text-md p-4 font-poppins font-bold text-secondary ${
    className || ""
  }`;
  return (
    <button className={combinedClassName} {...props}>
      {title}
    </button>
  );
}
