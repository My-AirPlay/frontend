import { InferType } from "yup";
import { loginSchema, registerSchema } from "../../../../../lib/schemas";
import { AxiosError } from "axios";
import { userProfileStage } from "../../../../../lib/constants";
import APIAxios, { setAxiosDefaultToken } from "@/utils/axios";
import { setArtistAccessToken } from "@/actions/auth/auth.action";
import { IArtistUser } from "@/contexts/AuthContextArtist";

export const registerUser = async (
  userInfo: InferType<typeof registerSchema>
) => {
  try {
    const { data } = await APIAxios.post("/artist/signup", {
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
interface IArtistLoginAPIResponse {
  accessToken: string;
  refreshToken: string;
  user: IArtistUser;
}

export const loginArtistUser = async (userInfo: InferType<typeof loginSchema>) => {
  try {
    const { data } = await APIAxios.post<IArtistLoginAPIResponse>("/artist/signin", userInfo);
    setAxiosDefaultToken(data.accessToken);
    if (data.user.stage !== userProfileStage.verifyEmail) {
      await setArtistAccessToken({
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
    const { data } = await APIAxios.post("/artist/verify-email", {
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
    const { data } = await APIAxios.post("/artist/request-password-reset", {
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
    const { data } = await APIAxios.post(
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
