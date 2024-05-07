import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { UserContext } from "../context/UserProvider";
import ChatView from "../components/chat/ChatView";
import { getChatInfo, postChatMessage } from "../api/chatApi";
import ChatLoadingUI from "../components/chat/ChatLoadingUI";

import styles from "./chat.module.scss"

const combineMessages = (currentUserMessages, partnerMessages) => {
    const modifiedParterMessages = partnerMessages.map((m) => ({
        ...m,
        isCurrent: false
    }))
    const modifiedCurrUserMessages = currentUserMessages.map((m) => ({
        ...m,
        isCurrent: true
    }))
    const combinedMessages = modifiedCurrUserMessages.concat(modifiedParterMessages)
    return combinedMessages
}

const Chat = () => {
    const { chatPartnerId } = useParams()
    const [partnerNames, setPartnerNames] = useState(null)
    const [partnerMessages, setPartnerMessages] = useState([])
    const [currentUserMessages, setCurrentUserMessages] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const { user } = useContext(UserContext)

    const messages = combineMessages(currentUserMessages, partnerMessages)

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