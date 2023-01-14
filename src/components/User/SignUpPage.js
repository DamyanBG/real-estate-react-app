import { USER_FIELDS } from '../../common/fields';
import { ROLES_ENUM } from '../../common/enums';
import { useState } from 'react';
import InputFormRow from '../../common/InputFormRow';
import { hostUrl } from '../../common/urls';
import FormSubmitButton from '../../common/FormSubmitButton';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function SignUpPage() {
    const [userInfo, setUserInfo] = useState({
        role: ROLES_ENUM.user,
    });
    const [isValid, setValid] = useState(true);

    const navigate = useNavigate();

    const postHome = async () => {
        try {
            const data = await fetch(`${hostUrl}/user`, {
                method: 'POST',
                body: JSON.stringify(userInfo),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (data) {
                navigate('/');
                toast.success('Successful Sign up!', { autoClose: 3000, pauseOnHover: false });
            }
        } catch (err) {
            toast.error(`Something went wrong! ${err}`, { autoClose: 3000, pauseOnHover: false });
        }
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();
        isValid ? postHome() : toast.error('Please enter valid values');
    };

    const handleOnChange = (e) => {
        const val = e.target.name;

        if (val === 'email') {
            let regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
            regex.test(e.target.value) ? setValid(true) : setValid(false);
        } else if (val === 'phone_number') {
            let regex = /^([0-9]{3,})*$/g;
            setValid(regex.test(e.target.value));
        } else {
            const len = e.target.value.length;
            if (val === 'first_name' || val === 'last_name') {
                len < 3 || len > 150 ? setValid(false) : setValid(true);
            } else {
                len < 6 || len > 150 ? setValid(false) : setValid(true);
            }
        }

        setUserInfo({
            ...userInfo,
            [e.target.name]: e.target.value,
        });
    };

    const handleCheckboxChange = (e) => {
        if (e.target.checked) {
            setUserInfo({
                ...userInfo,
                role: ROLES_ENUM.seller,
            });
            return;
        }
        setUserInfo({
            ...userInfo,
            role: ROLES_ENUM.user,
        });
    };

    return (
        <div className="center">
            <form onSubmit={handleOnSubmit}>
                {USER_FIELDS.map((uf) => (
                    <InputFormRow
                        key={uf.labelName}
                        labelName={uf.labelName}
                        name={uf.name}
                        value={userInfo[uf.name]}
                        type={uf.type}
                        handleOnChange={handleOnChange}
                        isValid={isValid}
                    />
                ))}
                <article className="form-row">
                    <label>Password</label>
                    <input
                        autoComplete="true"
                        type="password"
                        name="password"
                        value={userInfo.password || ''}
                        onChange={handleOnChange}
                    />
                    {!isValid ? (
                        <p style={{ color: 'red', fontSize: '13px' }}>
                            Password must have minimum 6 and maximum 150 characters
                        </p>
                    ) : null}
                </article>
                <article className="checkbox-row">
                    <input type="checkbox" onChange={handleCheckboxChange} />
                    <p>Sign Up as seller</p>
                </article>
                <FormSubmitButton />
            </form>
        </div>
    );
}
