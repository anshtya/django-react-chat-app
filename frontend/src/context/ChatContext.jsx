import { createContext, useCallback, useEffect } from "react";
import api from "../api";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children, user }) => {
    const [userChats, setUserChats] = useState(null);
    const [isUserChatsLoading, setIsUserChatsLoading] = useState(false);
    const [potentialChats, setPotentialChats] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState(null);
    const [isMessageLoading, setIsMessagesLoading] = useState(false);
    const [newMessage, setNewMessage] = useState(null)
 
    useEffect(() => {
        const getUserChats = async () => {
            setIsUserChatsLoading(true)
            const res = await api.get("chats/")
            setIsUserChatsLoading(false)

            setUserChats(res)
        }
        getUserChats();
    }, [user]);

    useEffect(() => {
        const getMessages = async () => {
            setIsMessagesLoading(true)
            const res = await api.get(`messages/${currentChat?._id}`)
            setIsMessagesLoading(false)

            setMessages(res)
        }
        getMessages();
    }, [currentChat]);

    useEffect(() => {
        const getUsers = async () => {
            const res = await api.get("users/")
            const pChats = res.filter((u) => {
                let isChatCreated = false;
                if (user.id === u._id) return false;

                if (userChats) {
                    userChats?.some((chat) => {
                        return chat.members[0] === u._id || chat.members[1] === u._id
                    })
                }

                return !isChatCreated;
            })
            setPotentialChats(pChats);
        }
        getUsers();
    }, [userChats]);

    const createChat = useCallback(async (firstId, secondId) => {
        await api.post("chats/", { firstId, secondId });

        setUserChats((prev) => [...prev, response]);
    }, []);

    const updateCurrentChat = useCallback((chat) => {
        setCurrentChat(chat);
    }, []);

    const sendTextMessage = useCallback(async(textMessage, sender, currentChatId, setTextMessage) => {
        if (!textMessage) return;

        const res = await api.post("messages", { currentChatId, sender, textMessage });

        setNewMessage(res);
        setMessages((prev)=>[...prev, response]);
        setTextMessage("");
    }, []);

    return (
        <ChatContext.Provider
            value={{
                userChats,
                isUserChatsLoading,
                potentialChats,
                createChat,
                updateCurrentChat,
                messages,
                isMessageLoading,
                sendTextMessage
            }}>
            {children}
        </ChatContext.Provider>
    );
}