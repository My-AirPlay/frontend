'use client'

const ARTIST_TOKEN_STORAGE_PREFIX = 'AIRPLAY_ARTIST';
const ADMIN_TOKEN_STORAGE_PREFIX = 'AIRPLAY_ADMIN';

export const authTokenStorage = {
  getArtistToken: () =>
    typeof window !== undefined ? JSON.parse(
      window.localStorage.getItem(`${ARTIST_TOKEN_STORAGE_PREFIX}_TOKEN`) as string,
    ) : null,
  getAdminToken: () =>
    typeof window !== undefined ? JSON.parse(
      window.localStorage.getItem(`${ADMIN_TOKEN_STORAGE_PREFIX}_TOKEN`) as string,
    ) : null,

  setArtistToken: (token: string) => {
    if (typeof window !== undefined) {
      window.localStorage.setItem(
        `${ARTIST_TOKEN_STORAGE_PREFIX}_TOKEN`,
        JSON.stringify(token),
      );
    }
    else {
      return
    }
  },
  setAdminToken: (token: string) => {
    if (typeof window !== undefined) {
      window.localStorage.setItem(
        `${ADMIN_TOKEN_STORAGE_PREFIX}_TOKEN`,
        JSON.stringify(token),
      );
    }
    else {
      return
    }
  },

  clearArtistToken: () => {
    if (typeof window !== undefined) {
      window.localStorage.removeItem(`${ARTIST_TOKEN_STORAGE_PREFIX}_TOKEN`);
    }
    else {
      return
    }
  },

  clearAdminToken: () => {
    if (typeof window !== undefined) {
      window.localStorage.removeItem(`${ADMIN_TOKEN_STORAGE_PREFIX}_TOKEN`);
    }
    else {
      return
    }
  },

  logout: (role: "ADMIN" | "ARTISTE" = "ARTISTE") => {
    if (typeof window !== undefined) {
      if (role === "ADMIN") {
        authTokenStorage.clearAdminToken();
        window.localStorage.removeItem(`${ADMIN_TOKEN_STORAGE_PREFIX}_TOKEN`);
        window.location.href = '/admin/login';
      } else {
        authTokenStorage.clearArtistToken();
        window.localStorage.removeItem(`${ARTIST_TOKEN_STORAGE_PREFIX}_TOKEN`);
        window.location.href = '/login';
      }
    }
    else {
      return
    }
  }
};
