import React from 'react';
import { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
    const storedUser = localStorage.getItem('user');
    
    // Make sure it's valid JSON before parsing
    try {
        if (storedUser && storedUser !== "undefined") {
            setUser(JSON.parse(storedUser));
        }
    } catch (err) {
        console.error("Failed to parse stored user:", err);
        localStorage.removeItem('user'); // Clean up bad data
    }
}, []);
    const login = (userData, token) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', token);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider }