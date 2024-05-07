import axios from "axios";

import { hostUrl } from "../utils/urls";

export const HOME_API = axios.create({
    baseURL: `${hostUrl}`
})

export const fetchAllHomes = () => {
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
        console.log(res)
        return { error: null, ...res }
    } catch (error) {
        console.log(error)
        return { error }
    }
}

export const fetchHomeDetails = async (homeId) => {
    const resp = await  fetch(`${hostUrl}/home-details/${homeId}`)
    return resp
}