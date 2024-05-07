import { hostUrl } from "../utils/urls"

export const getChatInfo = async (charPartnerId) => {
    const resp = await fetch(`${hostUrl}/chat-info/${charPartnerId}`)
    return resp
}