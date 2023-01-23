import { USER_FIELDS } from '../../common/fields';
import { ROLES_ENUM } from '../../common/enums';
import { useState } from 'react';
import InputFormRow from '../../common/InputFormRow';
import { hostUrl } from '../../common/urls';
import FormSubmitButton from '../../common/FormSubmitButton';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { validateField } from 'common/validation';

export default function SignUpPage() {
    const [userInfo, setUserInfo] = useState({
        role: ROLES_ENUM.user,
    });
    const [validationErrors, setValidationErrors] = useState(
        USER_FIELDS.map((uf) => uf.name).reduce((acc, curr) => ((acc[curr] = ''), acc), {})
    );

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
        if (Object.keys(validationErrors).length > 0) {
            toast.error('Please enter valid values!', { autoClose: 3000, pauseOnHover: false });
            return;
        }
        postHome();
    };

    const handleValidate = (e) => {
        const valError = validateField(e.target.type, e.target.value);
        if (valError) {
            setValidationErrors({
                ...validationErrors,
                [e.target.name]: valError,
            });
        } else {
            setValidationErrors((current) => {
                const copy = { ...current };
                delete copy[e.target.name];
                return copy;
            });
        }
    };

    const handleOnChange = (e) => {
        setUserInfo({
            ...userInfo,
            [e.target.name]: e.target.value,
        });
        handleValidate(e);
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
                        validationError={validationErrors[uf.name]}
                        dataTestId={uf.name}
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
