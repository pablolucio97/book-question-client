"use client";

import Button from "@/components/Button";
import SelectFile from "@/components/inputs/SelectFile";
import TextInput from "@/components/inputs/TextInput";
import SelectedFile, { IFile } from "@/components/SelectedFile";
import { ChangeEvent, Dispatch, FormEvent, SetStateAction } from "react";

interface UploadBookFormProps {
  onSubmit: () => void;
  wasFileUploaded: boolean;
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
  author: string;
  setAuthor: Dispatch<SetStateAction<string>>;
  selectedFile?: IFile;
  onSelectFile: (event: ChangeEvent<HTMLInputElement>) => void;
  onRemoveSelectedFile: () => void;
}

export default function UploadBookForm({
  title,
  setTitle,
  author,
  setAuthor,
  onSubmit,
  wasFileUploaded,
  selectedFile,
  onSelectFile,
  onRemoveSelectedFile,
}: UploadBookFormProps) {
  const upload = (event: ChangeEvent<FormEvent>) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <form className="w-full md:w-[640px] mx-auto" onSubmit={upload as never}>
      {wasFileUploaded && selectedFile ? (
        <SelectedFile
          selectedFile={selectedFile}
          onRemoveFile={onRemoveSelectedFile}
        />
      ) : (
        <SelectFile onSelectFile={onSelectFile} />
      )}
      <TextInput
        title="Title"
        placeholder="Inform the book's title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        className="mb-4"
      />
      <TextInput
        title="Author"
        placeholder="Inform the book's author"
        className="mb-6"
        value={author}
        onChange={(event) => setAuthor(event.target.value)}
      />
      <Button
        title="Confirm upload"
        type="submit"
        className="w-full"
        disabled={!title || !author || !wasFileUploaded}
      />
    </form>
  );
}
