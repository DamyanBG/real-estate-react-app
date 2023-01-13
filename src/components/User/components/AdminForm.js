import React, { useState } from 'react';
import { ROLES_ENUM } from 'common/enums';
import { USER_FIELDS } from 'common/fields';
import InputFormRow from 'common/InputFormRow';
import FormSubmitButton from 'common/FormSubmitButton';
import { useNavigate } from 'react-router-dom';
import { hostUrl } from 'common/urls';
import { toast } from 'react-toastify';

export default function AdminForm() {
    const [userInfo, setUserInfo] = useState({
        role: ROLES_ENUM.admin,
    });
    const navigate = useNavigate();

    const createUser = async () => {
        try {
            const data = await fetch(`${hostUrl}/user`, {
                method: 'POST',
                body: JSON.stringify(userInfo),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (data) {
                navigate('/admin/users');
                toast.success('User create!', { autoClose: 3000, pauseOnHover: false });
            }
        } catch (err) {
            toast.error(`Something went wrong! ${err}`, { autoClose: 3000, pauseOnHover: false });
        }
    };
    const handleOnSubmit = (e) => {
        e.preventDefault();
        createUser();
    };
    const handleOnChange = (e) => {
        setUserInfo({
            ...userInfo,
            [e.target.name]: e.target.value,
        });
    };
    return (
        <>
            <form onSubmit={handleOnSubmit}>
                {USER_FIELDS.map((uf) => (
                    <InputFormRow
                        key={uf.labelName}
                        labelName={uf.labelName}
                        name={uf.name}
                        value={userInfo[uf.name]}
                        handleOnChange={handleOnChange}
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
                </article>

                <button onClick={FormSubmitButton} type="submit" className="submit_btn">
                    Submit
                </button>
            </form>
        </>
    );
}
