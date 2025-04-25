import { useSharedHttpClient } from './httpClient';
import {AxiosError} from 'axios';


export const httpWrapper = async (
  apiCall: () => Promise<any>,
  callback: (data: any) => void,
  title?: string,
) => {
  const { setLoading, setSuccess, setError } = useSharedHttpClient.getState();
  
  try {
    setLoading(true);
    const data = await apiCall();
    callback(data.data);
    setSuccess(title ? title :'The request was completed successfully!');
  } catch (error) {
    const message = error instanceof AxiosError ? error.message : 'Server error!';
    setError(message);
  } finally {
    setLoading(false);
  }
};
