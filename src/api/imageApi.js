import { hostUrl } from "../utils/urls"

export const postImage = async (photoData) => {
    const resp = await fetch(`${hostUrl}/temp-photo`, {
        method: "POST",
        body: JSON.stringify(photoData),
        headers: {
            "Content-Type": "application/json"
        }
    })
    const json = await resp.json()
    return json
}