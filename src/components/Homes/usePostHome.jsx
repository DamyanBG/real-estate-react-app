import { useContext } from 'react';
import { postHome } from './api';
import { UserContext } from '../../context/UserContext';

const usePostHome = () => {
    const { user } = useContext(UserContext)
    const postHomeAction = async (homeInfo) => {
        let returnData
        try {
            console.log(homeInfo)
            const { error, data } = await postHome(homeInfo, user.id);
            if (error) {
                throw Error()
            }
            console.log(data)
            if (data.id) {
                returnData = data
            } else {
                throw Error()
            }
        } catch (error) {
            console.log(error)
            import('react-toastify').then((module) =>
                module.toast.error('Error during creation of home!', {
                    autoClose: 3000,
                    pauseOnHover: false,
                })
            );
        }

        return returnData
    }

    return postHomeAction
}

export default usePostHome