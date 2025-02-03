import axios, { AxiosResponse } from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const api = axios.create({
  baseURL,
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
    return response;
  }
);
