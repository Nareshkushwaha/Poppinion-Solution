import { create } from 'zustand';

interface AuthState {
  isAuthed: boolean;
  token: string | null;
  userEmail: string;
  login: (token: string) => void;
  logout: () => void;
}

const getEmailFromToken = (token: string | null) => {
  if (!token) return 'Admin';
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.email || 'Admin';
  } catch (e) {
    return 'Admin';
  }
};

// SSR ERROR FIX: Ye function check karega ki browser hai ya nahi
const getSafeStorage = (key: string) => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(key);
  }
  return null;
};

export const useAuth = create<AuthState>((set) => ({
  // Ab localStorage direct call nahi hoga, safe function se 'token' key use hogi
  isAuthed: !!getSafeStorage('token'),
  token: getSafeStorage('token'),
  userEmail: getEmailFromToken(getSafeStorage('token')),

  login: (token) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token);
    }
    set({ 
        isAuthed: true, 
        token: token,
        userEmail: getEmailFromToken(token) 
    });
  },
  
  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
    set({ isAuthed: false, token: null, userEmail: 'Admin' });
  },
}));