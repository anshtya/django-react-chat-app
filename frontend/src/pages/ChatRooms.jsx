import React, { useContext } from 'react';
import { Container, Stack } from "react-bootstrap"
import NavBar from "../components/Navbar";
import RoomListItem from '../components/RoomListItem';
import { ChatContext } from '../context/ChatContext';
import { useNavigate } from 'react-router-dom';

function ChatRooms() {
    const { chatRooms } = useContext(ChatContext);
    const navigate = useNavigate();

    return (
        <div style={{ backgroundColor: 'black', color: 'white', minHeight: '100vh' }}>
            <NavBar />
            <Container className="text-secondary d-flex flex-column vh-100">
                <Stack className="chat-room-list flex-grow-0 pe-3" gap={3}>
                    {chatRooms?.map((room, index) => {
                        return <div key={index} onClick={() =>navigate(`room/${room.id}`)}>
                            <RoomListItem room={room} />
                        </div>
                    })}
                </Stack>
            </Container>
        </div>
    );
}

export default ChatRooms;