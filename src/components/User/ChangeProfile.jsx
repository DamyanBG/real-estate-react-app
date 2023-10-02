import FormSubmitButton from "common/FormSubmitButton";
import InputFormRow from "common/InputFormRow";
import { USER_PROFILE } from "common/fields";
import { hostUrl } from '../../utils/urls';

export default function ChangeProfile({ handleOnChange, userInfo, user }) {
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
    )
}