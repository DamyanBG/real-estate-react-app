import { toast } from 'react-toastify';

export const api = {
    getAll: async function (url) {
        try {
            const resp = await fetch(url);
            const json = await resp.json();
            return json;
        } catch (error) {
            toast.error(`Something get wrong`, {
                autoClose: 3000,
                pauseOnHover: false,
            });
        }
    },
    delete: async function (url, { body }) {
        try {
            const resp = await fetch(`${url}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body,
            });
            return resp;
        } catch (error) {
            toast.error(`Something get wrong`, {
                autoClose: 3000,
                pauseOnHover: false,
            });
        }
    },
    create: async function (url, { body }) {
        try {
            return await fetch(url, {
                method: 'POST',
                body,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        } catch (err) {
            toast.error(`Something went wrong! ${err}`, { autoClose: 3000, pauseOnHover: false });
        }
    },
};
