const Room = ({ room }) => {
    return (
        <div className="user-card align-items-center p-2 justify-content-between" role="button">
            <div className="text-content">
                <div className="name">{room.name}</div>
            </div>
        </div>
    );
}

export default Room