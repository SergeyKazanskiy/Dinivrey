import axios from 'axios';

export const api = axios.create({
  baseURL: `http://localhost:8000/api`
});

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
