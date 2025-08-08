import axios from 'axios';
import { API_BASE_URL } from './base_url';
import { setManagerToken } from './manager_api';
import { setCoachToken } from './coach_api';
import { setStudentToken } from './student_api';


export const api = axios.create({ baseURL: API_BASE_URL + `/`});

export type UserRole = 'manager' | 'coach' | 'student';

export function setAuthToken(token: string, role: UserRole) {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  if (role === 'manager') setManagerToken(token);
  if (role === 'coach') setCoachToken(token);
  if (role === 'student') setStudentToken(token);
}