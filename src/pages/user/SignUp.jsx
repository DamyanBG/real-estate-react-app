import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { USER_FIELDS } from '../../utils/fields';
import { UserContext } from '../../context/UserProvider';
import { hostUrl } from '../../utils/urls';
import { validateField } from '../../utils/validation';
import InputFormRow from '../../components/form/InputFormRow';
import FormSubmitButton from '../../components/form/FormSubmitButton';
import { ROLES_ENUM } from '../../utils/enums';

export default function SignUp() {
    const [userInfo, setUserInfo] = useState({
        role: ROLES_ENUM.user,
    });
    const [validationErrors, setValidationErrors] = useState(
        USER_FIELDS.map((uf) => uf.name).reduce((acc, curr) => ((acc[curr] = ''), acc), {})
    );

    const { setUser } = useContext(UserContext);
    

    const navigate = useNavigate();

    const postUser = async () => {
        const urlPath =
            userInfo.role === ROLES_ENUM.user ? 'user/register-user' : 'user/register-seller';

        const { confirmPassword: _, ...postBody } = userInfo;

        try {
            const response = await fetch(`${hostUrl}/${urlPath}`, {
                method: 'POST',
                body: JSON.stringify(postBody),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const json = await response.json();

            console.log(json);

            if (!response.ok) {
                throw new Error('Request failed!');
            }
            
            const newUserInfo = {
                ...json,
                'role': userInfo.role
            }
            localStorage.setItem('user', JSON.stringify(newUserInfo));
            setUser(newUserInfo);

            navigate('/');
            toast.success('Successful Sign up!', { autoClose: 3000, pauseOnHover: false });
        } catch (err) {
            toast.error(`Something went wrong! ${err}`, { autoClose: 3000, pauseOnHover: false });
        }
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();

        if (userInfo.password === userInfo.confirmPassword) {
            if (Object.keys(validationErrors).length > 0) {
                toast.error('Please enter valid values!', { autoClose: 3000, pauseOnHover: false });
                return;
            }

            postUser();
        } else {
            toast.error('Password don`t match. Try again!', {
                autoClose: 3000,
                pauseOnHover: false,
            });
            return;
        }
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
        <section className="auth-form-container">
            <section className="auth-form-section">
                <form onSubmit={handleOnSubmit} data-testid="auth-form">
                    <h2>Registration Form</h2>
                    <article className="content">
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
                    </article>

                    <article className="alert">
                        <input
                            data-testid="as-seller"
                            type="checkbox"
                            onChange={handleCheckboxChange}
                        />
                        <p>Sign Up as seller</p>
                    </article>
                    <FormSubmitButton text="Register" />
                </form>
            </section>
        </section>
    );
}
