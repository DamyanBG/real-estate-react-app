import { hostUrl } from "../utils/urls";

export const fetchUserLogIn = async (loginInfo) => {
    const response = await fetch(`${hostUrl}/user/login`, {
        method: 'POST',
        body: JSON.stringify(loginInfo),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    return response
}