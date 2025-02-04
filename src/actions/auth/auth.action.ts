"use server";

import api from "@/lib/api/core";
import { TOKENS } from "@/lib/constants";
import { AxiosError } from "axios";
import { cookies } from "next/headers";

export async function login({
  access,
  refresh,
}: {
  access: string;
  refresh: string;
}) {
  const cookie = await cookies();
  cookie.set(TOKENS.ACCESS, access, {
    secure: true,
  });
  cookie.set(TOKENS.REFRESH, refresh, {
    secure: true,
  });
}

export async function getAccessToken() {
  return (await cookies()).get(TOKENS.ACCESS);
}

export const clearAuthTokens = async () => {
  const cookie = await cookies();
  cookie.delete(TOKENS.ACCESS);
  cookie.delete(TOKENS.REFRESH);
};
export const getUserProfile = async (accessToken: string) => {
  try {
    if (!accessToken.trim()) return null;
    const { data } = await api.get("/artist/profile", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.code === "401") {
        await clearAuthTokens();
      }
    }
    return null;
  }
};
