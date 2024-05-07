import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { UserContext } from "../context/UserProvider";

import styles from "./chat.module.scss"
import ChatComponent from "../components/chat/ChatView";
import { getChatInfo } from "../api/chatApi";
import ChatLoadingUI from "../components/chat/ChatLoadingUI";

const Chat = () => {
    const { chatPartnerId } = useParams()
    const [chatPartner, setChatPartner] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const { user } = useContext(UserContext)

    useEffect(() => {
        if (!user.token) return
        getChatInfo(chatPartnerId, user.token)
            .then((resp) => resp.json())
            .then((json) => {
                console.log(json)
            })
    }, [user.token, chatPartnerId])

    return (
        <section className={styles.chatSection}>
            {isLoading ? (
                <ChatLoadingUI />
            ) : (
                <ChatComponent />
            )}
        </section>
    )
}

export default Chat;