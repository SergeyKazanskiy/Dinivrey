import { create } from 'zustand';


interface SharedHttpClient {
  isLoading: boolean;
  catchError: boolean;
  errorMessage: string;
  successMessage: string;

  setLoading: (isLoading: boolean) => void;
  setSuccess: (message: string) => void;
  setError: (message: string) => void;
  clearMessages: () => void;
}

export const useSharedHttpClient = create<SharedHttpClient>((set) => ({
  isLoading: false,
  catchError: false,
  errorMessage: '',
  successMessage: '',
  
  setLoading: (isLoading: boolean) => set({ isLoading }),
  setSuccess: (message: string) => set({ successMessage: message }),
  setError: (message: string) => set({ catchError: true, errorMessage: message }),
  clearMessages: () => set({ successMessage: '', catchError: false, errorMessage: '' }),
}));

