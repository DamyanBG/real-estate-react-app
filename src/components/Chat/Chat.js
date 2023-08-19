import { useContext, useEffect, useRef, useState, useMemo } from 'react';
import './Chat.scss';
import { hostUrl } from '../../utils/urls';
import { UserContext } from '../../context/UserContext';
import { io } from 'socket.io-client';

const doSomething = () => {
    console.log("it is doing it")
    return "hey"
}

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

    // const socket = useMemo(() => (
    //     io("http://localhost:5000")
    // ), [])

    const [socket, setSocket] = useState(null)

    useEffect(() => {
        setSocket(io("http://localhost:5001"))
    }, [])

    useEffect(() => {
        if (!socket) return
        return () => {
            console.log("disconnect")
            socket.disconnect()
        }
    }, [])

    useEffect(() => {
        if (!socket) return
        console.log(socket.connected)
    }, [socket])

    useEffect(() => {
        if (!socket) return
        if (!user.id) return
        socket.emit("user_id", user.id)
    }, [user.id, socket])

    useEffect(() => {
        if (!socket) return
        socket.on("sync_message", (data) => {
            if (data.sender_id == interlocutorId) {
                setChatHistory([...chatHistory, {
                    id: data.id,
                    text: data.text,
                    position: "left"
                }])
            }
        });
    }, [socket, chatHistory]);

    const getMessages = () => {
        fetch(`${hostUrl}/message/${interlocutorId}`, {
            headers: {
                'Authorization': `Bearer ${user.token}`,
            },
        })
            .then((resp) => resp.json())
            .then(setMessages);
    };

    const sortMessages = () => {
        let sorted = Object.values(messages)
            .map((arr) =>
                arr.map((v) => ({
                    position: v.sender_id == user.id ? 'right' : 'left',
                    text: v.text,
                    id: v.id,
                    date: v.created_on,
                }))
            )
            .flat()
            .sort((a, b) => new Date(a.date) - new Date(b.date));
        setChatHistory(sorted);
    };

    useEffect(() => {
        if (!interlocutorId || !user.id) return;
        getMessages();
    }, [interlocutorId, user.id]);

    useEffect(() => {
        if (!messages) return;
        sortMessages();
    }, [messages]);

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
                'Authorization': `Bearer ${user.token}`,
            },
        })
            .then((resp) => resp.json())
            .then((json) => {
                setChatHistory([...chatHistory, {
                    id: json.id,
                    text: json.text,
                    position: "right"
                }])
                socket.emit("chat_message", {
                    ...postBody,
                    id: json.id
                })
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
