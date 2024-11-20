import { useContext, useEffect, useState } from "react";
import { ChatContext } from "../../context/ChatContext";
import { FormControl, Stack } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ChatBox = () => {
    const { 
        user, 
        currentRoom, 
        messages, 
        sendTextMessage, 
        userJoinNotification, 
        setUserJoinNotification 
    } = useContext(ChatContext);

    const [ textMessage, setTextMessage ] = useState("");

    useEffect(() => {
        if (userJoinNotification) {
            toast.info(userJoinNotification);
            setUserJoinNotification(null)
        }
    }, [userJoinNotification]);

    if (!currentRoom) return (
        <p style={{ textAlign: "center", width: "100%" }}>
            No room selected yet
        </p>
    );

    return (
        <Stack gap={4} className="chat-box">
            <div className="chat-header">
                <strong>{currentRoom.name}</strong>
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
                                <span style={{fontWeight: 'bold'}}>{message.user}</span>
                                {message.content}
                            </Stack>
                        </Stack>
                    </Stack>
                )}
            </Stack>
            <Stack direction="horizontal" gap={3} className="chat-input flex-group-0">
                <FormControl
                    value={textMessage}
                    onChange={(text) => {setTextMessage(text.target.value)}}
                />
                <button className="send-btn"
                    onClick={() => {
                        sendTextMessage(textMessage, user.profile_picture.replace("http://localhost:8000",""));
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
    );
}

export default ChatBox;