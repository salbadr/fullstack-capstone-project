import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export const AuthProvider = ({ children }) => {
    const token = sessionStorage.getItem('auth-token');

    const [isLoggedIn, setIsLoggedIn] = useState(token ? true : false);
    const [userName, setUserName] = useState("");

    return (
        <AppContext.Provider value={{ isLoggedIn, setIsLoggedIn, userName, setUserName }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);
