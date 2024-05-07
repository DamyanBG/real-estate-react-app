import { hostUrl } from "../utils/urls"

export const getChatInfo = async (charPartnerId, token) => {
    const resp = await fetch(`${hostUrl}/chat-history/${charPartnerId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return resp
}