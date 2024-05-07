import { useContext } from "react";
import { useParams } from "react-router-dom";

import { UserContext } from "../context/UserProvider";

const Chat = () => {
    const { chatPartnerId } = useParams()
    const { user } = useContext(UserContext)

    return (
        <section>
            Chat
        </section>
    )
}

export default Chat;