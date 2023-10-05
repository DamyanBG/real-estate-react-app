import React, { useState, useContext, useEffect } from 'react';
import { hostUrl } from '../../utils/urls';
import { UserContext } from '../../context/UserContext';
import { Link } from 'react-router-dom';

const ChatHistory = () => {
    const [interlocutors, setInterlocutors] = useState([]);
    const { user } = useContext(UserContext);

    useEffect(() => {
        if (!user.id) return
        fetchInterlocutors();
    }, [user.id]);

    const fetchInterlocutors = () => {
        fetch(`${hostUrl}/message/interlocutors`, {
            headers: {
                'Authorization': `Bearer ${user.token}`,
            },
        })
            .then((resp) => resp.json())
            .then((json) => {
                setInterlocutors(json);
            });
    };

    const chatsToRender = interlocutors?.map((chat) => {
        return (
            <Link to={`/chat?interlocutorId=${chat.id}&names=${chat.names}`} key={chat.id}>
                <div>
                    <div>{chat.names}</div>
                </div>
            </Link>
        );
    });

    return <div>{interlocutors && <div>{chatsToRender}</div>}</div>;
};

export default ChatHistory;
