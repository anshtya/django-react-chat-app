import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ChatContext } from "../context/ChatContext";
import { EVENT_CHAT_MESSAGE, EVENT_USER_JOIN, WS_BASE_URL } from "../constants";
import api from "../api";
import { Container, FormControl, Stack } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/chat/Message.css"
import "../styles/chat/Room.css"
import NavBar from "../components/Navbar";

const Room = () => {
    let params = useParams();

    const { user, getRoom } = useContext(ChatContext);

    const [socket, setSocket] = useState(undefined)
    const [room, setRoom] = useState(undefined);
    const [messages, setMessages] = useState([]);
    const [userJoinNotification, setUserJoinNotification] = useState(undefined);
    const [textMessage, setTextMessage] = useState("");

    useEffect(() => {
        const roomId = parseInt(params.roomId);
        setRoom(getRoom(roomId));
    }, [params]);

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
    }, [socket])

    useEffect(() => {
        if (room) {
            const newSocket = new WebSocket(WS_BASE_URL + `ws/room/${user.username}/${room.id}/`);
            setSocket(newSocket);
            getRoomMessages();

            return (() => {
                if (newSocket.readyState === WebSocket.OPEN) newSocket.close();
            });
        }
    }, [room, user]);

    useEffect(() => {
        if (userJoinNotification) {
            toast.info(userJoinNotification);
            setUserJoinNotification(null)
        }
    }, [userJoinNotification]);

    const getRoomMessages = async () => {
        const messages = await api.get(`room/${room.id}/messages/`);
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

    return (
        <div>
            <NavBar />
            <Container className="room-box">
                <Stack gap={4}>
                    <div className="room-header">
                        {room && <strong>{room.name}</strong>}
                    </div>
                    <div>
                        <ToastContainer />
                    </div>
                    <Stack gap={3} className="messages">
                        {messages && messages.map((message, index) =>
                            <Stack
                                keys={index}
                                className={`${message.user === user.username
                                    ? "message self align-self-end flex-grow-0"
                                    : "message align-self-start flex-grow-0"
                                    }`}
                            >
                                <Stack direction="horizontal" gap={2}>
                                    <img src={`http://localhost:8000${message.user_picture}`} width="30" height="30" />
                                    <Stack direction="vertical" gap={2}>
                                        <span style={{ fontWeight: 'bold' }}>{message.user}</span>
                                        {message.content}
                                    </Stack>
                                </Stack>
                            </Stack>
                        )}
                    </Stack>
                    <Stack direction="horizontal" gap={3} className="flex-group-0">
                        <FormControl
                            value={textMessage}
                            onChange={(text) => { setTextMessage(text.target.value) }}
                        />
                        <button className="send-btn"
                            onClick={() => {
                                sendTextMessage(textMessage, user.profile_picture.replace("http://localhost:8000", ""));
                                setTextMessage("");
                            }}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-send" viewBox="0 0 16 16">
                                <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z" />
                            </svg>
                        </button>
                    </Stack>
                </Stack>
            </Container>
        </div>
    );
};

export default Room;