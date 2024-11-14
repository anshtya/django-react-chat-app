import { createContext, useState } from "react";

export const AuthContext = createContext()

export const AuthContextProvider = ({ childern }) => {
    const [user, setUser] = useState({ name: "John" });
    return <AuthContext.Provider value={{ user }}>
        {childern}
    </AuthContext.Provider>
}