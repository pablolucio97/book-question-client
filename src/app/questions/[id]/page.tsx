"use client";

import BorderlessButton from "@/components/BorderlessButton";
import Header from "@/components/Header";
import QuestionInput from "@/components/QuestionInput";
import Subtitle from "@/components/Typography/Subtitle";
import { IBookDTO, IQuestionDTO } from "@/dtos";
import { BooksRepository } from "@/repositories/BooksRepository";
import { QuestionsRepository } from "@/repositories/QuestionsRepository";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import QuestionCard from "../components/QuestionCard";
import Loading from "../Loading";

export default function Questions() {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<IQuestionDTO[]>([]);
  const [question, setQuestion] = useState("");
  const [book, setBook] = useState<IBookDTO | null>(null);

  const params = useParams();
  const id = params?.id;

  const MIN_QUESTION_LENGTH = 5;

  const questionsRepository = useMemo(() => {
    return new QuestionsRepository();
  }, []);

  const bookRepository = useMemo(() => {
    return new BooksRepository();
  }, []);

  const listQuestions = useCallback(async () => {
    try {
      if (id) {
        setLoading(true);
        const questions = await questionsRepository.listQuestionsByBook(
          id as string
        );
        setQuestions(questions);
      }
    } catch (error) {
      console.log("Error getting questions", error);
    } finally {
      setLoading(false);
    }
  }, [id, questionsRepository]);

  useEffect(() => {
    listQuestions();
  }, [listQuestions]);

  const getBook = useCallback(async () => {
    try {
      setLoading(true);
      if (id) {
        //@ts-expect-error book is being returned inside an object by the server
        const { book } = await bookRepository.getBookById(id as string);
        setBook(book);
      }
    } catch (error) {
      console.log("Error getting book", error);
    } finally {
      setLoading(false);
    }
  }, [bookRepository, id]);

  useEffect(() => {
    getBook();
  }, [getBook]);

  const handleMakeQuestion = useCallback(async () => {
    try {
      setLoading(true);
      await questionsRepository.makeQuestion({
        book_id: id as string,
        question: question,
      });
      setQuestion("");
      await listQuestions();
    } catch (error) {
      console.log("Error making question", error);
    } finally {
      setLoading(false);
    }
  }, [id, listQuestions, question, questionsRepository]);

  return (
    <div className="flex flex-col items-center">
      <Header />
      <div className="w-full lg:w-[1000px] xl:w-[1340px] min-h-[72vh] flex flex-col mt-8 px-4">
        <div
          className={
            book
              ? "w-full flex justify-between items-center mb-8"
              : "w-full flex justify-end items-center mb-8"
          }
        >
          {book && <Subtitle content={book.title} />}
          <Link href="/books">
            <BorderlessButton title="See all books" />
          </Link>
        </div>
        <div className="w-full flex flex-col mb-4 max-h-[40vh] overflow-y-auto">
          {questions.length > 0 ? (
            questions.map((question) => (
              <QuestionCard
                key={question.id}
                question={question.question}
                answer={question.answer}
              />
            ))
          ) : (
            <span className="text-sm md:text-lg">
              Your questions will appear here.
            </span>
          )}
        </div>
        {loading ? (
          <div className="w-full mt-8">
            <Loading title="AI is thinking. Please, hold on a second..." />
          </div>
        ) : (
          <div className="w-full lg:w-[1000px] xl:w-[1340px] flex flex-col fixed bottom-0 pr-8 mt-8 bg-background">
            <QuestionInput
              title="Question"
              placeholder="Type your question"
              className="mb-24"
              onChange={(e) => setQuestion(e.target.value)}
              onMakeQuestion={handleMakeQuestion}
              disabled={loading || question.length < MIN_QUESTION_LENGTH}
            />
          </div>
        )}
      </div>
    </div>
  );
}
