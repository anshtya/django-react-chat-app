import React, { useContext } from 'react';
import { Container, Stack } from "react-bootstrap"
import NavBar from "../components/Navbar";
import Room from '../components/chat/Room';
import { ChatContext } from '../context/ChatContext';
import ChatBox from '../components/chat/ChatBox';
import '../index.css';

function ChatRoom() {
    const { chatRooms, setCurrentRoom, } = useContext(ChatContext);

    return (
        <div style={{backgroundColor: 'black', color: 'white', minHeight: '100vh'}}>
            <NavBar />
            <Container className="text-secondary d-flex flex-column vh-100">
                
                <Stack direction="horizontal" gap={4} className="align-items-start">
                    <Stack className="chat-room-list messagees-box flex-grow-0 pe-3" gap={3}>
                        {chatRooms?.map((room, index) => {
                            return <div key={index} onClick={() => setCurrentRoom(room)}>
                                <Room room={room} />
                            </div>
                        })}
                    </Stack>
                    <ChatBox />
                </Stack>
            </Container>
        </div>
    );
}

export default ChatRoom;