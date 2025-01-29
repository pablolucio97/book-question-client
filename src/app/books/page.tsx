"use client";

import BorderlessButton from "@/components/BorderlessButton";
import Header from "@/components/Header";
import Subtitle from "@/components/Typography/Subtitle";
import { IBookDTO, IUserDTO } from "@/dtos";
import { BooksRepository } from "@/repositories/BooksRepository";
import { UsersRepository } from "@/repositories/UsersRepository";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import BookCard from "./components/BookCard";

export default function Books() {
  const [books, setBooks] = useState<IBookDTO[]>([]);
  const [user, setUser] = useState<IUserDTO | null>(null);

  const { data } = useSession();

  const usersRepository = useMemo(() => {
    return new UsersRepository();
  }, []);

  const booksRepository = useMemo(() => {
    return new BooksRepository();
  }, []);

  const getUser = useCallback(async () => {
    try {
      if (data && data.user && data.user.email) {
        const response = await fetch(
          `http://localhost:3333/users/${data.user.email}`
        );
        const user = await response.json();
        setUser(user);
      }
    } catch (error) {
      console.log("Error getting user", error);
    }
  }, [data]);

  const registerUser = useCallback(async () => {
    try {
      if (data && data.user && data.user.email && data.user.name) {
        const createdUser = await usersRepository.createUser({
          email: data.user.email,
          name: data.user.name,
        });
        if (createdUser) {
          setUser(createdUser);
        }
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response && error.response.status === 409) {
        await getUser();
      } else {
        console.error("Error registering user", error);
      }
    }
  }, [data, getUser, usersRepository]);

  useEffect(() => {
    registerUser();
  }, [registerUser]);

  const getBooksByUser = useCallback(async () => {
    try {
      if (user) {
        const userBooks = await booksRepository.listBooksByUser(user.email);
        setBooks(userBooks);
      }
    } catch (error) {
      console.log(error);
    }
  }, [booksRepository, user]);

  useEffect(() => {
    getBooksByUser();
  }, [getBooksByUser]);

  return (
    <div className="flex flex-col items-center">
      <Header />
      <div className="w-full lg:w-[1000px] xl:w-[1340px] min-h-[72vh] flex flex-col mt-8 px-4">
        <div className="w-full flex justify-between items-center mb-8">
          <Subtitle content="Books" />
          <Link href="/upload-book">
            <BorderlessButton title="Upload new book" />
          </Link>
        </div>
        {books.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
            {books.map((book) => (
              <Link href={`/questions/${book.id}`} key={book.id}>
                <BookCard
                  key={book.id}
                  title={book.title}
                  author={book.author}
                />
              </Link>
            ))}
          </div>
        ) : (
          <span className="text-md md:text-lg text-center my-12">
            It looks like you have no books. Try uploading a new one.
          </span>
        )}
      </div>
    </div>
  );
}
