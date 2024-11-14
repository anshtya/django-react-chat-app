import { useEffect, useState } from "react";
import api from "../src/api";

export const userFetchRecipientuser = (chat, user) => {
    const [recipientUser, setRecipientUser] = useState(null);
    // const [error, setError] = useState(null);

    const recipientId = chat?.members.find((id) => id !== user?._id)

    useEffect(() => {
        const getUser = async() => {
            if(!recepientId) return null

            const response = await api.get('users/${recepientId}')

            setRecipientUser(response);
        }

        getUser()
    }, [recipientId]);

    return { recipientUser };
}