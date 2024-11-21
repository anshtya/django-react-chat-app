import { createContext, useEffect, useState } from "react";
import api from "../api";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children, user }) => {
    const [chatRooms, setChatRooms] = useState([]);
    
    useEffect(() => { getRooms(); }, [user]);

    const getRooms = async () => {
        const rooms = await api.get('rooms/');
        setChatRooms(rooms.data);
    };

    const getRoom = (id) => {
        return chatRooms.find(room => room.id === id)
    }

    return <ChatContext.Provider value={{
        user,
        chatRooms,
        getRoom,
    }}>
        {children}
    </ChatContext.Provider>
}