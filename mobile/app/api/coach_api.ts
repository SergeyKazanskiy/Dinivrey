import axios from 'axios';
import { API_BASE_URL } from './base_url';


export const api = axios.create({ baseURL: API_BASE_URL + `/coach_api/`});