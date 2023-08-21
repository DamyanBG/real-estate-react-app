import { USER_FIELDS } from '../../common/fields';
import { ROLES_ENUM } from '../../utils/enums';
import { useState } from 'react';
import InputFormRow from '../../common/InputFormRow';
import { hostUrl } from '../../utils/urls';
import FormSubmitButton from '../../common/FormSubmitButton';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { validateField } from 'common/validation';
import { checkObjForProfanity } from 'common/profanity';

export default function SignUpPage() {
    const [userInfo, setUserInfo] = useState({
        role: ROLES_ENUM.user,
    });
    const [validationErrors, setValidationErrors] = useState(
        USER_FIELDS.map((uf) => uf.name).reduce((acc, curr) => ((acc[curr] = ''), acc), {})
    );

    const navigate = useNavigate();

    const postUser = async () => {
        const urlPath = userInfo.role === ROLES_ENUM.user
            ? "user/register-user"
            : "user/register-seller"
        try {
            const response = await fetch(`${hostUrl}/${urlPath}`, {
                method: 'POST',
                body: JSON.stringify(userInfo),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const json = await response.json()

            console.log(json)

            if (!response.ok) {
                throw new Error("Request failed!")
            }

            navigate('/');
            console.log(response);
            toast.success('Successful Sign up!', { autoClose: 3000, pauseOnHover: false });

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
        if (checkObjForProfanity(userInfo)) return
        postUser();
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
            <form onSubmit={handleOnSubmit} data-testid="register-form">
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
                    <input data-testid="as-seller" type="checkbox" onChange={handleCheckboxChange} />
                    <p>Sign Up as seller</p>
                </article>

                <FormSubmitButton />
            </form>
        </div>
    );
}
