import axios from 'axios';


//export const API_BASE_URL = 'http://localhost:8000/api';
export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const prefix = API_BASE_URL === "http://localhost:8000" ? `/api` : `/`

export const api = axios.create({ baseURL: API_BASE_URL + prefix});

export function setAuthToken(token: string) {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}


