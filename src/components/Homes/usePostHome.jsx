import { useContext } from 'react';
import { postHome } from './api';
import { UserContext } from '@/context/UserContext';
import { useNavigate } from 'react-router-dom';

const usePostHome = () => {
    const { user } = useContext(UserContext)
    const navigate = useNavigate()
 
    const postHomeAction = async (homeInfo) => {
        try {
            const { error, data } = await postHome(homeInfo, user.id);
            if (error) {
                throw Error()
            }
            console.log(data)
            if (data.id) {
                navigate(`/edit-home?homeId=${data.id}`);
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
    }

    return postHomeAction
}

export default usePostHome