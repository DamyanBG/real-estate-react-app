import { useEffect, useState, useContext } from 'react';
import { hostUrl } from '../../common/urls';
import FormSubmitButton from '../../common/FormSubmitButton';
import { UserContext } from '../../context/UserContext';

export default function ChangeEmail() {
    const [email, setEmail] = useState('');
    const { user } = useContext(UserContext)

    const getUser = () => {
        fetch(`${hostUrl}/user/${user._id}`)
            .then((resp) => resp.json())
            .then((json) => setEmail(json.email));
    };

    const updateUserEmail = () => {
        const putBody = {
            user_id: user._id,
            email: email,
        };
        fetch(`${hostUrl}/user/email`, {
            method: 'PATCH',
            body: JSON.stringify(putBody),
            headers: {
                'Content-Type': 'application/json',
            },
        });
    };

    useEffect(getUser, [user._id]);

    const handleOnSubmit = (e) => {
        e.preventDefault();
        updateUserEmail();
    };

    return (
        <div className="center">
            <h2>Change Email</h2>
            <form onSubmit={handleOnSubmit}>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <FormSubmitButton />
            </form>
        </div>
    );
}
