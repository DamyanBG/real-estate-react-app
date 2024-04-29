import { hostUrl } from "../utils/urls";

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
