import { createContext, useCallback, useEffect, useState } from "react";
import api from "../api";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children, user }) => {
    const [currentRoom, setCurrentRoom] = useState(undefined);
    const [chatRooms, setChatRooms] = useState([]);
    const [messages, setMessages] = useState([]);

    useEffect(() => { getRooms(); }, [user]);

    useEffect(() => { getRoomMessages(); }, [currentRoom]);

    const getRooms = async () => {
        const rooms = await api.get('rooms/');
        setChatRooms(rooms.data);
    };

    const getRoomMessages = async () => {
        if (currentRoom) {
            const messages = await api.get(`room/${currentRoom.id}/messages/`);
            setMessages(messages.data);
        }
    };

    const sendTextMessage = useCallback(async (textMessage, sender, currentChatId, setTextMessage) => {
        if (!textMessage) return;

        // const res = await api.post("messages", { currentChatId, sender, textMessage });

        // setNewMessage(res);
        // setMessages((prev)=>[...prev, response]);
        // setTextMessage("");
    }, []);

    return <ChatContext.Provider value={{
        user,
        currentRoom,
        setCurrentRoom,
        chatRooms,
        messages
    }}>
        {children}
    </ChatContext.Provider>
}