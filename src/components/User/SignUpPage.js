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
            ? postHome()
            : toast.error('Please Enter Valid Values', { autoClose: 3000, pauseOnHover: false });
    };

    const handleOnChange = (e) => {
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
                        userInfo={userInfo}
                        handleOnChange={handleOnChange}
                    />
                ))}

                <article className="checkbox-row">
                    <input type="checkbox" onChange={handleCheckboxChange} />
                    <p>Sign Up as seller</p>
                </article>
                <FormSubmitButton />
            </form>
        </div>
    );
}
