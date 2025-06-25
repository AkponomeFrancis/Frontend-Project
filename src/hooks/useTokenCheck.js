import React, { useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';

export default function useTokenCheck() {

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const { exp } = jwtDecode(token); 
        const now = Date.now() / 1000;
        if (exp < now) {
          
          localStorage.removeItem('token');
          window.location.href = '/login'; 
        }
      } catch  {
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
    }
  }, []);
}
