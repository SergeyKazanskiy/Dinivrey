import { httpWrapper } from '../../shared/http/httpWrapper';
import { api } from "../../api/auth_api";


// Login
export function user_login(data: {role: string}, callback: (res: {id: number}) => void) {
    return httpWrapper(() => api.post(`user/login`, data), callback);
};

// Logout
export function user_logout(role: string, callback: (res: {isOk: boolean}) => void) {
    return httpWrapper(() => api.delete(`user/${role}/logout`), callback);
};
