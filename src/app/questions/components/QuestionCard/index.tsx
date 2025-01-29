interface QuestionCardProps {
  question: string;
  answer: string;
}

export default function QuestionCard({ question, answer }: QuestionCardProps) {
  return (
    <div className="w-full rounded-md shadow-md p-4 bg-gray-800 mb-4">
      <h1 className="text-xs md:text-sm font-bold mb-2">
        {question}
      </h1>
        <p className="text-xs md:text-sm text-gray-200">{answer}</p>
    </div>
  );
}
