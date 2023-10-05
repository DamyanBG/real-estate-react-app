import React, { useState } from 'react';
import { ROLES_ENUM } from '@/utils/enums';
import { USER_FIELDS } from '@/common/fields';
import InputFormRow from '@/common/InputFormRow';
import FormSubmitButton from '@/common/FormSubmitButton';
import { useNavigate } from 'react-router-dom';
import { hostUrl } from '@/utils/urls';
import { toast } from 'react-toastify';
import { api } from '@/common/api';

export default function AdminForm() {
    const [userInfo, setUserInfo] = useState({
        role: ROLES_ENUM.admin,
    });
    const navigate = useNavigate();

    const createUser = async () => {
        const body = {
            body: JSON.stringify(userInfo),
        };

        const data = await api.create(`${hostUrl}/user`, body);
        if (data) {
            navigate('/admin/users');
            toast.success('User create!', { autoClose: 3000, pauseOnHover: false });
        }
    };
    const handleOnSubmit = (e) => {
        e.preventDefault();
        let validity = false;
        if (Object.keys(userInfo).length === 6) {
            for (let i = 0; i < USER_FIELDS.length; i++) {
                // eslint-disable-next-line no-undef
                if (document.getElementById(`${USER_FIELDS[i].name}Error`) === null) {
                    validity = true;
                } else {
                    validity = false;
                    break;
                }
            }
        }
        validity
            ? createUser()
            : toast.error('Please Enter Valid Values', { autoClose: 3000, pauseOnHover: false });
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
                        type={uf.type}
                        userInfo={userInfo}
                        handleOnChange={handleOnChange}
                    />
                ))}

                <button onClick={FormSubmitButton} type="submit" className="submit_btn">
                    Submit
                </button>
            </form>
        </>
    );
}
