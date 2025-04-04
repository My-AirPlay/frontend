"use server";

import { cookies } from "next/headers";
import { AxiosError } from "axios";
import APIAxios, { deleteAxiosDefaultToken, setAxiosDefaultToken } from "@/utils/axios";




const ARTIST_TOKEN_PREFIX = 'AIRPLAY_ARTIST';
const ADMIN_TOKEN_PREFIX = 'AIRPLAY_ADMIN';


const cookieOptions = {
  secure: true,
  httpOnly: true,
  sameSite: "strict" as const,
  maxAge: 60 * 60 * 24 * 7,
  path: '/'
};

/**
 * Login function for artist users
 */
export async function loginArtist({
  access,
  refresh,
}: {
  access: string;
  refresh: string;
}) {
  const cookieStore = await cookies();
  setAxiosDefaultToken(access);
  cookieStore.set(`${ARTIST_TOKEN_PREFIX}_ACCESS`, access, cookieOptions);
  cookieStore.set(`${ARTIST_TOKEN_PREFIX}_REFRESH`, refresh, cookieOptions);

}

/**
 * Login function for admin users
 */
export async function loginAdmin({
  access,
  refresh,
}: {
  access: string;
  refresh: string;
}) {
  const cookieStore = await cookies();
  setAxiosDefaultToken(access);
  cookieStore.set(`${ADMIN_TOKEN_PREFIX}_ACCESS`, access, cookieOptions);
  cookieStore.set(`${ADMIN_TOKEN_PREFIX}_REFRESH`, refresh, cookieOptions);
}

/**
 * Get artist access token
 */
export async function getArtistAccessToken() {
  const cookieStore = await cookies();
  return cookieStore.get(`${ARTIST_TOKEN_PREFIX}_ACCESS`)?.value;
}

/**
 * Get admin access token
 */
export async function getAdminAccessToken() {
  const cookieStore = await cookies();
  return cookieStore.get(`${ADMIN_TOKEN_PREFIX}_ACCESS`)?.value;
}

/**
 * Clear artist auth tokens
 */
export async function clearArtistTokens() {
  const cookieStore = await cookies();
  cookieStore.delete(`${ARTIST_TOKEN_PREFIX}_ACCESS`);
  cookieStore.delete(`${ARTIST_TOKEN_PREFIX}_REFRESH`);
  deleteAxiosDefaultToken();
}

/**
 * Clear admin auth tokens
 */
export async function clearAdminTokens() {
  const cookieStore = await cookies();
  cookieStore.delete(`${ADMIN_TOKEN_PREFIX}_ACCESS`);
  cookieStore.delete(`${ADMIN_TOKEN_PREFIX}_REFRESH`);
}
deleteAxiosDefaultToken();

/**
 * Get artist user profile using access token
 */
export async function getArtistProfile() {
  const accessToken = await getArtistAccessToken();

  try {
    if (!accessToken || !accessToken.trim()) return null;

    const { data } = await APIAxios.get("/artist/profile", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.response?.data, accessToken);
      if (error.response?.status === 401) {
        await clearArtistTokens();
      }
    }
    return null;
  }
}

/**
 * Get admin user profile using access token
 */
export async function getAdminProfile() {
  const accessToken = await getAdminAccessToken();

  try {
    if (!accessToken || !accessToken.trim()) return null;

    const { data } = await APIAxios.get("/admin/profile", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.response?.data, accessToken);
      if (error.response?.status === 401) {
        await clearAdminTokens();
      }
    }
    return null;
  }
}