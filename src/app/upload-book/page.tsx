"use client";

import uploadIcon from "@/assets/upload.svg";
import BorderlessButton from "@/components/BorderlessButton";
import Header from "@/components/Header";
import { IFile } from "@/components/SelectedFile";
import Subtitle from "@/components/Typography/Subtitle";
import { IUserDTO } from "@/dtos";
import { BooksRepository } from "@/repositories/BooksRepository";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
import UploadBookForm from "./components/UploadBookForm";

export default function UploadBook() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [user, setUser] = useState<IUserDTO | null>(null);
  const [filePreview, setFilePreview] = useState<IFile>();
  const [file, setFile] = useState<File | null>(null);
  const [wasFileUploaded, setWasFileUploaded] = useState(false);

  const { data } = useSession();

  const router = useRouter();

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

  useEffect(() => {
    getUser();
  }, [getUser]);

  const handleSelectFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const filePreviewUrl = URL.createObjectURL(file);
      setFilePreview({
        name: file.name,
        size: file.size,
        type: file.type,
        uri: filePreviewUrl,
      });
      console.log(filePreview);
      setWasFileUploaded(true);
      setFile(file);
    }
  };

  const handleRemoveUploadedFile = () => {
    setWasFileUploaded(false);
  };

  const handleUploadBook = useCallback(async () => {
    try {
      if (user && user.id && filePreview) {
        const data = {
          author,
          title,
          file: file,
          userId: user.id,
        };
        await booksRepository.uploadBook(data as never);
        router.push("/books");
      }
    } catch (error) {
      console.log("Error uploading book", error);
    }
  }, [author, booksRepository, file, filePreview, router, title, user]);

  return (
    <div className="flex flex-col items-center">
      <Header />
      <div className="w-full lg:w-[1000px] xl:w-[1340px] min-h-[72vh] flex flex-col mt-8 px-4">
        <div className="w-full flex justify-between items-center mb-8">
          <Subtitle content="Upload book" />
          <Link href="/books">
            <BorderlessButton title="See my books" />
          </Link>
        </div>
        <UploadBookForm
          title={title}
          setTitle={setTitle}
          author={author}
          setAuthor={setAuthor}
          onSubmit={handleUploadBook}
          onSelectFile={handleSelectFile}
          onRemoveSelectedFile={handleRemoveUploadedFile}
          wasFileUploaded={wasFileUploaded}
          selectedFile={filePreview}
        />
        <Image src={uploadIcon} alt="upload-icon" className="mx-auto mt-12" />
      </div>
    </div>
  );
}
