import React from 'react';
import { hostUrl } from '../../utils/urls';

import { UserContext } from '../../context/UserContext';
import { Link } from 'react-router-dom';

const ChatHistory = () => {
    const [chats, setChats] = React.useState([]);
    const { user } = React.useContext(UserContext);

    React.useEffect(() => {
        fetchChats();
    }, [user._id]);

    const fetchChats = () => {
        fetch(`${hostUrl}/message/history/${user._id}`)
            .then((resp) => resp.json())
            .then((json) => {
                setChats(json.interlocutors);
            });
    };

    const chatsToRender = chats?.map((chat) => {
        return (
            <Link exact to={`/chat?interlocutorId=${chat.id}?names=${chat.names}`} key={chat.id}>
                <div>
                    <div>{chat.names}</div>
                </div>
            </Link>
        );
    });
    return <div>{chats && <div>{chatsToRender}</div>}</div>;
};

export default ChatHistory;
