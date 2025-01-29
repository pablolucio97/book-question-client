import { IMakeQuestionDTO, IQuestionDTO } from "@/dtos";
import { api, IApiSuccessResponse } from "@/services/api";

export class QuestionsRepository {
  async listQuestionsByBook(bookId: string) {
    const response = await api.get<IApiSuccessResponse<IQuestionDTO[]>>(
      `/questions-answers/list-by-book/${bookId}`
    );
    return response.data.RES;
  }

  async makeQuestion(question: IMakeQuestionDTO) {
    const response = await api.post<IApiSuccessResponse<IQuestionDTO>>(
      "/questions-answers",
      question
    );
    return response.data.RES;
  }
}
