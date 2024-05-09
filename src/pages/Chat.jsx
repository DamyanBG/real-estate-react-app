import { io } from 'socket.io-client';
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { UserContext } from "../context/UserProvider";
import ChatView from "../components/chat/ChatView";
import { getChatInfo, postChatMessage } from "../api/chatApi";
import ChatLoadingUI from "../components/chat/ChatLoadingUI";
import { sortByDateTime } from "../utils/date";
import { combineMessages } from "../utils/utils";
import { hostUrl } from '../utils/urls';

import styles from "./chat.module.scss"

const Chat = () => {
    const { chatPartnerId } = useParams()
    const [partnerNames, setPartnerNames] = useState(null)
    const [partnerMessages, setPartnerMessages] = useState([])
    const [currentUserMessages, setCurrentUserMessages] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const { user } = useContext(UserContext)

    const messages = combineMessages(currentUserMessages, partnerMessages).sort(sortByDateTime)

    const [socket, setSocket] = useState(null);

    // useEffect(() => {
    //     setSocket(io(hostUrl, {
    //         reconnectionAttempts: 3
    //     }));
    // }, []);

    useEffect(() => {
        setSocket(io(hostUrl, {
            // rejectUnauthorized: false,
            transports: ['websocket'],
        }));
    }, []);

    useEffect(() => {
        if (!socket) return;
        socket.on('sync_message', (data) => {
            console.log(data)
            if (data.sender_id == chatPartnerId) {
                setPartnerMessages([
                    ...partnerMessages,
                    data
                ]);
            }
        });
    }, [socket, partnerMessages, chatPartnerId]);

    useEffect(() => {
        if (!socket) return;
        socket.on("connect_error", (err) => {
            console.log(`connect_error due to ${err.message}`);
          });
    }, [socket])

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
        if (!user.token) return
        getChatInfo(chatPartnerId, user.token)
            .then((resp) => resp.json())
            .then((json) => {
                setPartnerNames(json.chat_partner_names)
                setPartnerMessages(json.chat_partner_messages)
                setCurrentUserMessages(json.current_user_messages)
            })
            .finally(() => setIsLoading(false))
    }, [user.token, chatPartnerId])


    const handleMessageSend = async (message) => {
        if (!message) return
        const messageInfo = {
            sender_id: user.id,
            received_id: chatPartnerId,
            text: message
        }
        const resp = await postChatMessage(chatPartnerId, user.token, messageInfo)
        if (resp.ok) {
            const newMessage = await resp.json()
            setCurrentUserMessages([
                ...currentUserMessages,
                newMessage
            ])
            socket.emit('sync_message', newMessage);
        }
    }

    return (
        <section className={styles.chatSection}>
            {isLoading ? (
                <ChatLoadingUI />
            ) : (
                <ChatView
                    partnerNames={partnerNames}
                    currUserNames={{
                        "first_name": user.first_name,
                        "last_name": user.last_name
                    }}
                    messages={messages}
                    onSend={handleMessageSend}
                />
            )}
        </section>
    )
}

export default Chat;