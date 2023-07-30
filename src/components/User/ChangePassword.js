import FormSubmitButton from '../../common/FormSubmitButton';
import { hostUrl } from '../../utils/urls';

export default function ChangePassword({  handleOnChange, userInfo, user }) {
    const updatePassword = () => {
        fetch(`${hostUrl}/user/password`, {
            method: 'PATCH',
            body: JSON.stringify({
                user_id: user._id,
                password: userInfo.password,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((resp) => {
                if (!resp.ok) {
                    alert('Password is not changed!');
                }
                resp.json();
            })
            .then((json) => {
                console.log(json);
            });
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();
        updatePassword();
    };

    return (
        <div className="center">
            <form onSubmit={handleOnSubmit}>
                <input
                    type="password"
                    value={userInfo.password}
                    onChange={handleOnChange}
                />
                <FormSubmitButton />
            </form>
        </div>
    );
}
