export interface IBookDTO {
  id: string;
  title: string;
  author: string;
  pdfUrl: string;
}

export interface ICreateBookDTO {
  title: string;
  author: string;
  file: string;
  userId: string;
}

export interface IUserDTO {
  id: string;
  email: string;
  name: string;
}

export interface ICreateUserDTO {
  email: string;
  name: string;
}

export interface IQuestionDTO {
  id: string;
  question: string;
  answer: string;
}

export interface IMakeQuestionDTO {
  question: string;
  book_id: string;
}

