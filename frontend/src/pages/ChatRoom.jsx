import React, { useContext } from 'react';
import '../styles/Chat.css';
import { Container } from "react-bootstrap"
import NavBar from "./components/Navbar";
import LoadingIndicator from '../components/LoadingIndicator';
import UserChat from '../components/chat/UserChat';
import PotentialChat from '../components/chat/PotentialChat';
import { ChatContext, ChatContextProvider } from '../context/ChatContext';
import { AuthContext } from '../context/AuthContext';
import ChatBox from '../components/chat/ChatBox';

function ChatRoom() {
    const { user } = useContext(AuthContext);
    const { userChats, isUserChatsLoading, updateCurrentChat } = useContext(ChatContext);

    return (
        <ChatContextProvider user={user}>
            <div>
                <NavBar />
                {isUserChatsLoading && <LoadingIndicator />}
                <Container className="text-secondary">
                    <PotentialChat />
                    <Stack direction="horizontal" gap={4} className="align-items-start">
                        <Stack className="messagees-box flex-grow-0 pe-3" gap={3}>

                            {isUserChatsLoading && <LoadingIndicator />}

                            {userChats?.map((chat, index) => {
                                return <div key={index} onClick={() => updateCurrentChat(chat)}>
                                    <UserChat chat={chat} user={user} />
                                </div>
                            })}
                        </Stack>
                        <ChatBox />
                    </Stack>
                </Container>
            </div>
        </ChatContextProvider>
    );
}

export default ChatRoom;