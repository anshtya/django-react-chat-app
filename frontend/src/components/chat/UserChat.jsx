import { userFetchRecipientuser } from "../../../hooks/useFetchRecipient"

const UserChat = ({ chat, user }) => {
    const { recipientUser } = userFetchRecipientuser(chat, user);
    return <Stack
        direction="horizontal"
        gap={3}
        className="user-card align-items-center p-2 justify-content-between"
        role="button"
    >
        <div className="d-flex">
            <div className="me-2">
                <img src="https://avatars.githubusercontent.com/u/95761927?v=4" height="35px" />
            </div>
            <div className="text-content">
                <div className="name">{recipientUser?.name}</div>
                <div className="text">Text Message</div>
            </div>
        </div>
        <div className="d-flex flex-column align-items-end">
            <div className="date">12/11/2024</div>
        </div>
    </Stack>
}

export default UserChat