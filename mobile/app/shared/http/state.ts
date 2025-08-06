import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth } from './firebaseConfig';
import { user_login, user_logout} from './http';
import { objectToJson } from '../utils';
import { setAuthToken, UserRole } from "../../api/auth_api";


export interface AuthState {
  token: string | null;
  userId: number;
  role: UserRole | null;
  isLogin: boolean;

  loginUser: (role: UserRole, token: string, error:() => void) => void;
  logoutUser: (role: UserRole) => void;

  restoreAuth: () => Promise<void>;
  refreshToken: (newToken?: string) => Promise<void>;
}

export const useAuthState = create<AuthState>((set, get) => ({
  token: null,
  userId: 0,
  role: null,
  isLogin: false,


  loginUser: (role: UserRole, token: string, error) => {
    setAuthToken(token, role);
    
    user_login({role}, (res => {
      //alert('user_login ' + res.id)
      if (res.id > 0) {
        set({ token, userId: res.id, role, isLogin: true });
        
        AsyncStorage.setItem('token', token);
        AsyncStorage.setItem('userId', res.id.toString());
        AsyncStorage.setItem('role', role);
      } else {
        error();
      }
    }))
  },

  logoutUser: (role: UserRole) => {
    //alert('logoutUser')
    // user_logout(role, (res => {
    //   if (res.isOk) {
        set({ token: null, userId: 0, role: null, isLogin: false });

        AsyncStorage.multiRemove(['token', 'userId', 'role']);
      // }
    // }))
  },

  restoreAuth: async () => {
    const [token, userId, role] = await Promise.all([
      AsyncStorage.getItem('token'),
      AsyncStorage.getItem('userId'),
      AsyncStorage.getItem('role'),
    ]);
    if (token && userId && role) {
      set({ token, userId: Number(userId), role: role as UserRole, isLogin: true });
    }
  },

  refreshToken: async (newToken?: string) => {
    const token = newToken ?? (await auth.currentUser?.getIdToken(true));
    if (token) {
      await AsyncStorage.setItem('token', token);
      set((state) => ({ ...state, token }));

      const {role} = get()
      if (role) setAuthToken(token, role);
    }
  },
}));
