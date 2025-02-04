import { InferType } from "yup";
import { loginSchema, registerSchema } from "../../schemas";
import api from "../core";
import { AxiosError } from "axios";
import { userProfileStage } from "../../constants";
import { login } from "@/actions/auth/auth.action";

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
    if (data.user.stage !== userProfileStage.verifyEmail) {
      await login({
        access: data.accessToken,
        refresh: data.refreshToken,
      });
    }

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

export const verifyUser = async ({
  email,
  verificationCode,
}: {
  email: string;
  verificationCode: string;
}) => {
  try {
    const { data } = await api.post("/artist/verify-email", {
      email,
      verificationCode,
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

export const forgotPassword = async ({ email }: { email: string }) => {
  try {
    const { data } = await api.post("/artist/request-password-reset", {
      email,
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
export const resetPassword = async ({
  token,
  newPassword,
}: {
  token: string;
  newPassword: string;
}) => {
  try {
    const { data } = await api.post(
      "/artist/password-reset",
      {
        newPassword,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
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
