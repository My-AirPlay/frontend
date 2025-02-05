import { onboardingBasciInfoSchema } from "@/lib/schemas";
import { InferType } from "yup";
import api from "../core";
import { getAccessToken } from "@/actions/auth/auth.action";

export const postOnboardingPersonalDetail = async ({
  userInfo,
  email,
}: {
  userInfo: InferType<typeof onboardingBasciInfoSchema>;
  email: string;
}) => {
  try {
    const accessToken = await getAccessToken();
    if (!accessToken?.value) return;
    const { data } = await api.post(
      "/artist/add-biodata",
      {
        userBioData: userInfo,
        email,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken.value}`,
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
      error,
    };
  }
};
