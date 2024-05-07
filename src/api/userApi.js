import { hostUrl } from "../utils/urls";

export const fetchUserLogIn = async (loginInfo) => {
    const response = await fetch(`${hostUrl}/user/login`, {
        method: "POST",
        body: JSON.stringify(loginInfo),
        headers: {
            "Content-Type": "application/json",
        },
    });

    return response;
};

export const createUser = async (postBody, isSeller) => {
    const urlPath = isSeller
        ? "user/register-seller"
        : "user/register-user";

    const response = await fetch(`${hostUrl}/${urlPath}`, {
        method: "POST",
        body: JSON.stringify(postBody),
        headers: {
            "Content-Type": "application/json",
        },
    });

    const json = await response.json();
    return json
}