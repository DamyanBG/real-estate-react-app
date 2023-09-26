import { hostUrl } from "utils/urls";

export const fetchAllHomes = () => {
    return fetch(`${hostUrl}/homes`)
        .then((resp) => resp.json())
        .then((json) => {
            return json
        });
};