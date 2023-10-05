import { useState, useContext } from 'react';
import { SIGNIN_FIELDS } from '@/common/fields';
import { validateField } from '@/common/validation';
import { toast } from 'react-toastify';
import FormSubmitButton from '@/common/FormSubmitButton';
import InputFormRow from '@/common/InputFormRow';
import { hostUrl } from '@/utils/urls';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '@/context/UserContext';

export default function SignIn() {
    const [loginInfo, setLoginInfo] = useState({});
    const [validationErrors, setValidationErrors] = useState(
        SIGNIN_FIELDS.map((uf) => uf.name).reduce((acc, curr) => ((acc[curr] = ''), acc), {})
    );

    const { setUser } = useContext(UserContext);

    const navigate = useNavigate();

    const signIn = async () => {
        try {
            const response = await fetch(`${hostUrl}/user/login`, {
                method: 'POST',
                body: JSON.stringify(loginInfo),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response && response.ok) {
                const data = await response.json();

                localStorage.setItem('user', JSON.stringify(data));
                setUser(data);
                navigate('/');
            }
        } catch (error) {
            toast.error('Incorrect email or password!', {
                autoClose: 3000,
                pauseOnHover: false,
            });
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
        setLoginInfo({
            ...loginInfo,
            [e.target.name]: e.target.value,
        });
        handleValidate(e);
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();
        if (Object.keys(validationErrors).length > 0) {
            toast.error('Please enter valid values!', { autoClose: 3000, pauseOnHover: false });
            return;
        }
        signIn();
    };

    return (
        <div data-testid="sign-in-page-form" className="center">
            <form onSubmit={handleOnSubmit} data-testid="sign-in-form">
                <h3>Sign In</h3>
                {SIGNIN_FIELDS.map((sf) => (
                    <InputFormRow
                        key={sf.labelName}
                        labelName={sf.labelName}
                        name={sf.name}
                        value={loginInfo[sf.name]}
                        type={sf.type}
                        handleOnChange={handleOnChange}
                        validationError={validationErrors[sf.name]}
                        dataTestId={sf.name}
                    />
                ))}
                <FormSubmitButton disabled={Object.keys(validationErrors).length} />
            </form>
        </div>
    );
}
