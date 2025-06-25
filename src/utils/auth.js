import {jwtDecode} from 'jwt-decode';

export const isTokenExpired = () => {
  const token = localStorage.getItem('token');
  if (!token) return true;

  try {
    const { exp } = jwtDecode(token);
    if (!exp) return true;

    const now = Date.now() / 1000; 
    return exp < now;
  } catch {
    return true; 
  }
};

export const isLoggedIn = () => !isTokenExpired();
