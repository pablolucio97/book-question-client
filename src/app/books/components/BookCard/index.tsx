import bookOpen from "@/assets/book_open.svg";
import Image from "next/image";

interface BookCardProps {
  title: string;
  author: string;
  onSeeQuestions?: () => void;
}

export default function BookCard({
  title,
  author,
  onSeeQuestions,
}: BookCardProps) {
  return (
    <div
      className="w-full rounded-md shadow-md p-4 cursor-pointer bg-gray-900 "
      onClick={onSeeQuestions}
    >
      <div className="w-full flex flex-col justify-center items-center h-52 rounded-md p-4">
        <h1 className="text-md md:text-lg font-bold text-center mb-4">
          {title}
        </h1>
        <Image src={bookOpen} alt="book-icon" className="w-16 h-16" />
      </div>
      <div className="mt-2">
        <p className="text-sm md:text-md text-gray-200">{author}</p>
      </div>
    </div>
  );
}
