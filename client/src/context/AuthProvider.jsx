import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios';
import Cookies from 'js-cookie';

const AuthContext = createContext({
    isLoggedIn: true,
    user: null
});

const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState({});

    axios.defaults.baseURL = 'http://localhost:5000';
    // axios.defaults.baseURL = 'https://meatika-server.vercel.app';

    useEffect(() => {
        // Check for existing token on page load
        const token = Cookies.get('token');
        if (token) {
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          setIsLoggedIn(true);
          getCurrentUser();
        }
    }, []);

    const getCurrentUser = async () => {
        try{
            const res = await axios.get('/accounts/me')
            setUser(res.data.user)
        }
        catch(error){
            console.log(error)
        }
    }

    const login = async (userData) => {
        try{
            const res = await axios.post('/accounts/login', userData);
            if(res.status !== 200){
                return {message : res.data.message, isSuccess: false}
            }
            const token = res.data.token;
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            setIsLoggedIn(true);
            getCurrentUser();
            Cookies.set('token', token);
            return {message : res.data.message, isSuccess: true}
        }
        catch (error) {
            return {message : error.response.data.message, isSuccess: false}
        }
    };

    const logout = () => {
        setIsLoggedIn(false);
        setUser(null);
        Cookies.remove('token');
        axios.defaults.headers.common['Authorization'] = null;
    };

    const value = { isLoggedIn, user, login, logout };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export { AuthContext, AuthProvider, useAuth };