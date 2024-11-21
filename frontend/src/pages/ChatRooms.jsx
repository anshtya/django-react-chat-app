import React, { useContext } from 'react';
import { Container, Stack } from "react-bootstrap"
import NavBar from "../components/Navbar";
import RoomListItem from '../components/RoomListItem';
import { ChatContext } from '../context/ChatContext';
import { useNavigate } from 'react-router-dom';
import "../styles/chat/Chat.css"

function ChatRooms() {
    const { chatRooms } = useContext(ChatContext);
    const navigate = useNavigate();

    return (
        <div>
            <NavBar />
            <div className="w-25 m-auto">
                <Stack className="chat-room-list">
                    {chatRooms?.map((room, index) => {
                        return <div key={index} onClick={() =>navigate(`room/${room.id}`)}>
                            <RoomListItem room={room} />
                        </div>
                    })}
                </Stack>
            </div>
        </div>
    );
}

export default ChatRooms;