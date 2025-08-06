import axios from 'axios';
import { API_BASE_URL } from './base_url';


export const api = axios.create({ baseURL: API_BASE_URL + `/coach_api/`});

export function setCoachToken(token: string) {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}