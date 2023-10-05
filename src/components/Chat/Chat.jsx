import { useContext, useEffect, useRef, useState } from 'react';
import './Chat.scss';
import { hostUrl } from '../../utils/urls';
import { UserContext } from '../../context/UserContext';
import { io } from 'socket.io-client';
import { useSearchParams } from 'react-router-dom';

export default function Chat() {
    const params = useSearchParams()[0];
    const interlocutorId = params.get('interlocutorId');
    const names = params.get('names');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const { user } = useContext(UserContext);
    const ref = useRef();
    const regex = /[a-zA-Z0-9]/;

    const [socket, setSocket] = useState(null);

    useEffect(() => {
        setSocket(io('http://localhost:5000'));
    }, []);

    useEffect(() => {
        if (!socket) return;
        return () => {
            socket.disconnect();
        };
    }, [socket]);

    useEffect(() => {
        if (!socket || !user.id) return;
        socket.emit('user_id', user.id);
    }, [user.id, socket]);

    useEffect(() => {
        if (!socket) return;
        socket.on('sync_message', (data) => {
            if (data.sender_id == interlocutorId) {
                setMessages([
                    ...messages,
                    {
                        id: data.id,
                        text: data.text,
                        position: 'left',
                    },
                ]);
            }
        });
    }, [socket, messages]);

    const getMessages = () => {
        fetch(`${hostUrl}/message/${interlocutorId}`, {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        })
            .then((resp) => resp.json())
            .then((json) => {
                console.log(json)
                const sortedMessages = sortMessages(json)
                setMessages(sortedMessages)
            });
    };

    const sortMessages = (messagesForSorting) =>
        Object.values(messagesForSorting)
            .flat()
            .reduce((acc, message) => (
                [
                    ...acc,
                    {
                        position: message.sender_id == user.id ? 'right' : 'left',
                        text: message.text,
                        id: message.id,
                        date: message.created_on,
                    },
                ]
            ), [])
            .sort((a, b) => new Date(a.date) - new Date(b.date));

    useEffect(() => {
        if (!interlocutorId || !user.id) return;
        getMessages();
    }, [interlocutorId, user.id]);

    const handleOnMessageChange = (e) => {
        setMessage(e.target.value);
    };

    const postMessage = () => {
        const postBody = {
            sender_id: user.id,
            receiver_id: interlocutorId,
            text: message,
        };
        fetch(`${hostUrl}/message`, {
            method: 'POST',
            body: JSON.stringify(postBody),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`,
            },
        })
            .then((resp) => resp.json())
            .then((json) => {
                setMessages([
                    ...messages,
                    {
                        id: json.id,
                        text: json.text,
                        position: 'right',
                    },
                ]);
                socket.emit('chat_message', {
                    ...postBody,
                    id: json.id,
                });
                setMessage('');
                ref.current.focus();
            });
    };

    const handleOnMessageSend = () => {
        regex.test(message) ? postMessage() : null;
    };

    const handleOnKeyDown = (e) => {
        if (e.key === 'Enter') {
            regex.test(message) ? postMessage() : null;
        }
    };

    return (
        <div className="chat-container">
            <h2>Chat with {names}</h2>
            <section className="chat-messages">
                {messages.slice(-15).map((ch) => (
                    <p key={ch.id} className={`message-${ch.position}`}>
                        {ch.text}
                    </p>
                ))}
            </section>
            <input
                ref={ref}
                className="chat-input"
                type="text"
                value={message}
                onChange={handleOnMessageChange}
                onKeyDown={handleOnKeyDown}
            />
            <button className="chat-button" onClick={handleOnMessageSend} type="button">
                Send
            </button>
        </div>
    );
}
