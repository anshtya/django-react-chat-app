import { createContext, useEffect, useState } from "react";
import { USER } from "../constants";
import api from "../api";

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem(USER)) || null);

    useEffect(() => {
        if (user) { getUserProfile(); }
    }, []);

    const getUserProfile = async () => {
        let res = await api.get('profile/');
        localStorage.setItem(USER, JSON.stringify(res.data));
        setUser(res.data);
    }

    return <AuthContext.Provider value={{ user, setUser }}>
        {children}
    </AuthContext.Provider>
}