import { REQ_METHODS } from "../utils/enums";
import { hostUrl } from "../utils/urls";

export const postMeeting = async (postBody, token) => {
    const resp = await fetch(`${hostUrl}/meeting`, {
        method: REQ_METHODS.post,
        body: JSON.stringify(postBody),
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });
    return resp;
};
