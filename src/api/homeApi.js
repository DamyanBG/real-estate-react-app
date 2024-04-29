import axios from "axios";

import { hostUrl } from "../utils/urls";

export const HOME_API = axios.create({
    baseURL: `${hostUrl}`
})

export const fetchAllHomes = () => {

    console.log("hostUrl")
    console.log(hostUrl)
    return fetch(`${hostUrl}/homes`)
        .then((resp) => resp.json())
        .then((json) => {
            return json
        });
};

export const fetchPaginatedHomes = (page, rowsPerPage) => {
    return fetch(`${hostUrl}/homes/${page}/${rowsPerPage}`)
        .then((resp) => resp.json())
        .then((json) => {
            return json
        });
};

export const postHome = async (homeInfo, userId) => {
    const postBody = { ...homeInfo, owner_id: userId };
    try {
        const res = await HOME_API.post(`/home`, postBody)
        return { error: null, ...res }
    } catch (error) {
        return { error }
    }
}