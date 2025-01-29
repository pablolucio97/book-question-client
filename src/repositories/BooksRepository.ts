import { IBookDTO, ICreateBookDTO } from "@/dtos";
import { api, IApiSuccessResponse } from "@/services/api";

export class BooksRepository {
  async listBooksByUser(userEmail: string) {
    const response = await api.get<IApiSuccessResponse<IBookDTO[]>>(
      `/books/list-by-user/${userEmail}`
    );
    return response.data.RES;
  }

  async uploadBook(book: ICreateBookDTO) {
    const bookData = new FormData();

    bookData.append("title", book.title);
    bookData.append("author", book.author);

    bookData.append("userId", book.userId);

    if (book.file) {
      bookData.append("file", book.file);
    }

    const response = await api.post<IApiSuccessResponse<IBookDTO>>(
      "/books",
      bookData
    );
    return response.data.RES;
  }

  async getBookById(bookId: string) {
    const response = await api.get<IApiSuccessResponse<IBookDTO>>(
      `/books/${bookId}`
    );
    return response.data.RES;
  }
}
