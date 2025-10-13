import axios from 'axios';

//export const API_BASE_URL = 'http://localhost:8000';
export const api = axios.create({ baseURL: process.env.EXPO_PUBLIC_API_BASE_URL + `/student_api/`});


export interface LoadingSlice {
  isLoading: boolean;
  isError: boolean;
  error_message: string;

  set_loading: (isLoading: boolean) => void;
  set_error: (isError: boolean, error_message: string) => void;
}

export const createLoadingSlice = (set: any): LoadingSlice => ({
  isLoading: false,
  isError: false,
  error_message: "",

  set_loading: (isLoading: boolean) =>
    set(() => {
      set({ isLoading });
    }),

  set_error: (isError: boolean, error_message: string) =>
    set(() => {
      set({ isError });
      set({ error_message });
    }),
});
