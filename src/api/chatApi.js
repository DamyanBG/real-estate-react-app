import { REQ_METHODS } from "../utils/enums";
import { hostUrl } from "../utils/urls";

export const getChatInfo = async (charPartnerId, token) => {
    const resp = await fetch(`${hostUrl}/chat-history/${charPartnerId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return resp;
};

export const postChatMessage = async (charPartnerId, token, messageInfo) => {
    const resp = await fetch(`${hostUrl}/chat-history/${charPartnerId}`, {
        method: REQ_METHODS.post,
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(messageInfo),
    });
    return resp;
};
