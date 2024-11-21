import "../styles/chat/Room.css"

const RoomListItem = ({ room }) => {
    return (
        <div className="room-item p-3 d-flex justify-content-center" role="button">
            {room.name}
        </div>
    );
}

export default RoomListItem