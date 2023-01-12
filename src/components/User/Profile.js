import { useContext, useEffect, useState } from 'react';
import { USER_PROFILE } from '../../common/fields';
import InputFormRow from '../../common/InputFormRow';
import { hostUrl } from '../../common/urls';
import FormSubmitButton from '../../common/FormSubmitButton';
import { UserContext } from '../../context/UserContext';

export default function Profile() {
    const [userInfo, setUserInfo] = useState({});
    const { user } = useContext(UserContext)

    const handleOnChange = (e) => {
        setUserInfo({
            ...userInfo,
            [e.target.name]: e.target.value,
        });
    };

    const getUserInfo = () => {
        fetch(`${hostUrl}/user/${user._id}`)
            .then((resp) => resp.json())
            .then(setUserInfo);
    };

    const updateUserInfo = () => {
        const putBody = { user_id: user._id, ...userInfo };
        fetch(`${hostUrl}/user/profile`, {
            method: 'PATCH',
            body: JSON.stringify(putBody),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((resp) => {
                if (!resp.ok) {
                    alert('Problem occured!');
                }
                return resp.json();
            })
            .then((json) => {
                console.log(json);
            });
    };

    useEffect(getUserInfo, [user._id]);

    const handleOnSubmit = (e) => {
        e.preventDefault();
        updateUserInfo();
    };

    return (
        <div className="center">
            <form onSubmit={handleOnSubmit}>
                {USER_PROFILE.map((up) => (
                    <InputFormRow
                        key={up.labelName}
                        labelName={up.labelName}
                        name={up.name}
                        value={userInfo[up.name]}
                        handleOnChange={handleOnChange}
                    />
                ))}
                <FormSubmitButton />
            </form>
        </div>
    );
}
