import aiMagicIcon from "@/assets/ai_magic.svg";
import Image from "next/image";
import { InputHTMLAttributes } from "react";

interface QuestionInputProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  title: string;
  placeholder?: string;
  onMakeQuestion: () => void;
  disabled?: boolean;
}

export default function QuestionInput({
  title,
  className,
  onMakeQuestion,
  disabled,
  ...props
}: QuestionInputProps) {
  const combinedClassName = `w-full relative flex items-center justify-center min-h-56 max-h-56 border-[1px] border-gray-200 outline-none focus:border-primary bg-background rounded-md text-white text-sm md:text-md p-3 mt-1 ${
    className || ""
  }`;

  const MAX_INPUT_LENGTH = 500;

  return (
    <div className="block w-full">
      <span className="text-xs md:text-sm mb-1 font-poppins font-bold">
        {title}
      </span>
      <textarea
        className={combinedClassName}
        {...props}
        maxLength={MAX_INPUT_LENGTH}
      />
      <button className="absolute bottom-28 right-12 bg-primary flex items-center justify-center px-4 py-2 rounded-md text-white text-sm md:text-md font-bold disabled:opacity-50" onClick={onMakeQuestion} disabled={disabled}>
        Make question
        <Image src={aiMagicIcon} alt="upload-icon" className="w-6 h-6 ml-2" />
      </button>
    </div>
  );
}
