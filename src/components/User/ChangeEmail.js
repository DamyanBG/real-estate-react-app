import { hostUrl } from '../../utils/urls';
import FormSubmitButton from '../../common/FormSubmitButton';

export default function ChangeEmail({ handleOnChange, userInfo, user }) {
     const updateUserEmail = () => {
        const putBody = {
            user_id: user._id,
            email: userInfo.email,
        };
        fetch(`${hostUrl}/user/email`, {
            method: 'PATCH',
            body: JSON.stringify(putBody),
            headers: {
                'Content-Type': 'application/json',
            },
        });
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();
        updateUserEmail();
    };

    return (
        <div className="center">
            <form onSubmit={handleOnSubmit}>
                <input type="email" value={userInfo.email} name="email" onChange={handleOnChange} />
                <FormSubmitButton />
            </form>
        </div>
    );
}
