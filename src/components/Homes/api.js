import axios from "axios";
import { hostUrl } from "utils/urls";


// const 2postHome = () => {
//     const postBody = { ...homeInfo, owner_id: user.id };
//     fetch(`${hostUrl}/home`, {
//         method: 'POST',
//         body: JSON.stringify(postBody),
//         headers: {
//             Authorization: `Bearer ${user.token}`,
//             'Content-Type': 'application/json',
//         },
//     })
//         .then((resp) => {
//             return resp.json();
//         })
//         .then((json) => {
//             if (json.id) {
//                 navigate(`/edit-home?homeId=${json.id}`);
//                 return;
//             }
//             throw new Error();
//         });
// };

export const HOME_API = axios.create({
    baseURL: `${hostUrl}`
})

const authInterceptor = (req) => {
    const accessToken = JSON.parse(localStorage.getItem("user"))?.token
    if (accessToken) {
        req.headers.Authorization = `Bearer ${accessToken}`
    }
    return req
}

HOME_API.interceptors.request.use(authInterceptor)

export const postHome = async (homeInfo, userId) => {
    const postBody = { ...homeInfo, owner_id: userId };
    try {
        const res = await HOME_API.post(`/home`, postBody)
        return { error: null, ...res }
    } catch (error) {
        return { error }
    }
}