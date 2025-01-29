"use client";

import { ChangeEvent } from "react";

interface SelectFileProps {
  onSelectFile?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function SelectFile({ onSelectFile }: SelectFileProps) {
  return (
    <div className="block w-full mb-4">
      <input
        type="file"
        className="opacity-0 mb-[-48px] cursor-pointer z-10 w-full h-12 text-md"
        onChange={onSelectFile}
      />
      <button
        type="button"
        className="w-full h-12 flex items-center justify-center bg-gray-300 font-medium rounded-lg text-black text-xs md:text-sm mt-[-4px]"
      >
        Select a file
      </button>
    </div>
  );
}
