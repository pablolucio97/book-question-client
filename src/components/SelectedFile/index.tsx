import trash from "@/assets/trash.svg";
import { convertBytesToMB } from "@/utils/conversions";
import Image from "next/image";

export type IFile = {
  name: string;
  size: number;
  type: string;
  uri: string;
  file?: File;
};

interface SelectedFileProps {
  selectedFile: IFile;
  onRemoveFile: () => void;
}

export default function SelectedFile({
  selectedFile,
  onRemoveFile,
}: SelectedFileProps) {
  return (
    <div className="w-full flex flex-col mb-4">
      <span className="text-xs md:text-sm mb-1 font-poppins font-bold">
        Selected file
      </span>
      <div className="w-full flex justify-between min-w-40 border-[1px] outline-none bg-background rounded-md text-white text-sm md:text-md p-3">
        <div className="w-full flex flex-col">
          <span className="text-sm md:text-md">{`${selectedFile.name}.${selectedFile.type}`}</span>
          <span className="text-sm md:text-md">
            {convertBytesToMB(selectedFile.size)}MB
          </span>
        </div>
        <button onClick={onRemoveFile}>
          <Image src={trash} alt="remove-file" />
        </button>
      </div>
    </div>
  );
}
