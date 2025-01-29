import { ICreateUserDTO, IUserDTO } from "@/dtos";
import { api, IApiSuccessResponse } from "@/services/api";

export class UsersRepository {
  async createUser(data: ICreateUserDTO) {
    const response = await api.post<IApiSuccessResponse<IUserDTO>>("/users", data);
    return response.data.RES;
  }
  async getUser(email: string) {
    const response = await api.get<IApiSuccessResponse<IUserDTO>>(`/users/${email}`);
    return response.data.RES;
  }
}
