import axios, { AxiosResponse } from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3333",
});

export interface IApiSuccessResponse<T> {
  RES: T;
  STATUS: number;
}

api.interceptors.response.use(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (response: AxiosResponse<IApiSuccessResponse<any>>) => {
    if (process.env.NODE_ENV === "development") {
      console.log("[RESPONSE] - ", response);
    }
    return response
  }
);
