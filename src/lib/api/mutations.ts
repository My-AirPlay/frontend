import { InferType } from "yup";
import { loginSchema, registerSchema } from "../schemas";
import api from "./core";
import { AxiosError } from "axios";

export const registerUser = async (
  userInfo: InferType<typeof registerSchema>
) => {
  try {
    const { data } = await api.post("/artist/signup", {
      password: userInfo.password,
      email: userInfo.email,
    });
    return {
      data,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: error as AxiosError,
    };
  }
};

export const loginUser = async (userInfo: InferType<typeof loginSchema>) => {
  try {
    const { data } = await api.post("/artist/signin", userInfo);
    return {
      data,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: error as AxiosError,
    };
  }
};
