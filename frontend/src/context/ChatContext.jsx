import { createContext, useEffect, useState } from "react";
import { EVENT_CHAT_MESSAGE, EVENT_USER_JOIN, WS_BASE_URL } from "../constants";
import api from "../api";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children, user }) => {
    const [socket, setSocket] = useState(undefined)
    const [currentRoom, setCurrentRoom] = useState(undefined);
    const [chatRooms, setChatRooms] = useState([]);
    const [messages, setMessages] = useState([]);
    const [userJoinNotification, setUserJoinNotification] = useState(undefined);

    useEffect(() => {
        if (socket) {
            socket.onmessage = (event) => {
                const eventData = JSON.parse(event.data);

                if (eventData.user === user.username) return;

                switch (eventData.type) {
                    case EVENT_CHAT_MESSAGE:
                        const newMessage = {
                            "user": eventData.user,
                            "user_picture": eventData.user_picture,
                            "content": eventData.content
                        };
                        setMessages(prevMessages => [...prevMessages, newMessage]);
                        break;

                    case EVENT_USER_JOIN:
                        setUserJoinNotification(eventData.message);
                        break;

                    default:
                        break;
                }
            }
        }
    }, [socket, user])

    useEffect(() => { getRooms(); }, [user]);

    useEffect(() => {
        if (currentRoom) {
            const newSocket = new WebSocket(WS_BASE_URL + `ws/room/${user.username}/${currentRoom.id}/`);
            setSocket(newSocket);
            getRoomMessages();

            return (() => {
                if (newSocket.readyState === WebSocket.OPEN) newSocket.close();
            });
        }
    }, [currentRoom, user]);

    const getRooms = async () => {
        const rooms = await api.get('rooms/');
        setChatRooms(rooms.data);
    };

    const getRoomMessages = async () => {
        const messages = await api.get(`room/${currentRoom.id}/messages/`);
        setMessages(messages.data);
    };

    const sendTextMessage = async (message, user_picture) => {
        if (!message) return;
        const messageObj = {
            "user": user.username,
            "user_picture": user_picture,
            "content": message
        }
        setMessages(prevMessages => [...prevMessages, messageObj]);

        socket.send(JSON.stringify({
            "username": user.username,
            "content": message
        }))
    };

    return <ChatContext.Provider value={{
        user,
        currentRoom,
        setCurrentRoom,
        chatRooms,
        messages,
        sendTextMessage,
        userJoinNotification,
        setUserJoinNotification
    }}>
        {children}
    </ChatContext.Provider>
}