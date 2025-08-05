import { useState, useEffect } from 'react';
import { getProfile } from '../services/authService';
import { AuthContext } from './AuthContext'; // ✅ Import context

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Check token on first load
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            getProfile()
                .then(res => {
                    setUser(res.data.data.user);
                })
                .catch(() => {
                    localStorage.removeItem('token');
                    setUser(null);
                })
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, []);

    const login = (userData, token) => {
        localStorage.setItem('token', token);
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
}
