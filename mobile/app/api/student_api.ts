import axios from 'axios';
import { API_BASE_URL } from './base_url';


export const api = axios.create({ baseURL: API_BASE_URL + `/student_api/`});

export function setStudentToken(token: string) {
  //alert('student' + {token})
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}