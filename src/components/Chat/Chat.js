import { useContext, useEffect, useRef, useState } from 'react';
import './Chat.scss';
import { hostUrl } from '../../common/urls';
import { UserContext } from '../../context/UserContext';

export default function Chat() {
    const params = new URLSearchParams(window.location.search);
    const interlocutorId = params.get('interlocutorId');
    const names = params.get('names')
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState();
    const [chatHistory, setChatHistory] = useState([]);
    const { user } = useContext(UserContext);
    const ref = useRef()
    const regex = /[a-zA-Z0-9]/;

    const getMessages = () => {
        fetch(`${hostUrl}/message/${user._id}&${interlocutorId}`)
            .then((resp) => resp.json())
            .then(setMessages);
    };

    const sortMessages = () => {
        let sorted = Object.entries(messages)
            .map((arr) =>
                arr[1].map((v) => ({
                    position: v.sender_id === user._id ? 'right' : 'left',
                    text: v.text,
                    id: v._id,
                    date: v.createdAt,
                }))
            )
            .flat()
            .sort((a, b) => new Date(a.date) - new Date(b.date));
        setChatHistory(sorted);
    };

    useEffect(() => {
        if (!interlocutorId || !user._id) return;
        getMessages();
    }, [interlocutorId, user._id]);

    useEffect(() => {
        if (!messages) return;
        sortMessages();
    }, [messages]);

    const handleOnMessageChange = (e) => {
        setMessage(e.target.value);
    };

    const postMessage = () => {
        const postBody = {
            sender_id: user._id,
            receiver_id: interlocutorId,
            text: message,
        };
        fetch(`${hostUrl}/message`, {
            method: 'POST',
            body: JSON.stringify(postBody),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((resp) => resp.json())
            .then((json) => {
                setChatHistory([...chatHistory, {
                    id: json._id,
                    text: json.text,
                    position: "right"
                }])
                setMessage('');
                ref.current.focus()
            });
    }

    const handleOnMessageSend = () => {
        regex.test(message)? postMessage():  null;
    };

    const handleOnKeyDown = (e) => {
        if (e.key === "Enter") {
            regex.test(message)?  postMessage() :null;
        }
    }

    return (
        <div className="chat-container">
            <h2>Chat with {names}</h2>
            <section className="chat-messages">
                {chatHistory.map((ch) => (
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
