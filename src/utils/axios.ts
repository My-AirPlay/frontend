import Axios, { AxiosError } from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL as string;

export const APIAxios = Axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, 
  headers: {
    'Content-Type': 'application/json',
  },
});

export const setAxiosDefaultToken = (token: string) => {
  APIAxios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const deleteAxiosDefaultToken = () => {
  delete APIAxios.defaults.headers.common.Authorization;
};


export const handleInactiveAccountRedirect = () => {
  if (typeof window !== 'undefined') {
    window.location.href = '/login';
  }
};

APIAxios.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    console.log('Axios Error Response:', error.response);

    if (error.response) {
      const errorData = error.response.data as { error?: { summary?: string } };
      const errorSummary = errorData.error?.summary;
      
      if (errorSummary === 'inactive account' || errorSummary === 'Invalid token' || errorSummary === 'Token has expired') {
        console.log('Authentication Error:', errorSummary);
        deleteAxiosDefaultToken();
        handleInactiveAccountRedirect();
      }
    }
    return Promise.reject(error);
  }
);

export default APIAxios;