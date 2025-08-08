import { useSharedHttpClient } from './httpClient';
import {AxiosError} from 'axios';
import { auth } from './firebaseConfig';
import { useAuthState } from './state';
import { objectToJson } from '../utils';


const isDevelopMode = false; 


export const httpWrapper = async (
  apiCall: () => Promise<any>,
  callback: (data: any) => void,
  title?: string
) => {
  const { setLoading, setSuccess, setError } = useSharedHttpClient.getState();

  const run = async (): Promise<boolean> => {
    try {
      setLoading(true);

      const response = await apiCall();
      callback(response.data);
      //setSuccess(title ?? 'The request was completed successfully!'); where?
      return true;
    } catch (error: any) {
      const message = error instanceof AxiosError ? error.message : 'Server error!';
      const status = error?.response?.status;

      if (status === 401 && !isDevelopMode) {
        const refreshed = await retryWithFreshToken(apiCall, callback, setError);
        return refreshed;
      }
      setError(message);
      return false;
    } finally {
      setLoading(false);
    }
  };
  await run();
};

async function retryWithFreshToken(
  apiCall: () => Promise<any>,
  callback: (data: any) => void,
  setError: (msg: string) => void
): Promise<boolean> {
  try {
    const newToken = await auth.currentUser?.getIdToken(true);
    if (!newToken) throw new Error('Token refresh failed');

    await useAuthState.getState().refreshToken(newToken);

    const retryResponse = await apiCall();
    callback(retryResponse.data);

    return true;
  } catch (err) {
    setError('Auth retry failed');
    console.warn('Retry after token refresh failed:', err);
    return false;
  }
}