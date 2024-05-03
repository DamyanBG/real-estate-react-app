import { useState, useContext } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { SIGNIN_FIELDS } from "../../utils/fields";
import { UserContext } from "../../context/UserProvider";
import { validateField } from "../../utils/validation";
import InputFormRow from "../../components/form/InputFormRow";
import FormSubmitButton from "../../components/form/FormSubmitButton";
import { fetchUserLogIn } from "../../api/userApi";
import FormComponent from "../../components/form/FormComponent";
import AuthSection from "../../components/sections/AuthSection";

export default function SignIn() {
    const [loginInfo, setLoginInfo] = useState({});
    const [validationErrors, setValidationErrors] = useState(
        SIGNIN_FIELDS.map((uf) => uf.name).reduce(
            (acc, curr) => ((acc[curr] = ""), acc),
            {}
        )
    );
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const logIn = async () => {
        try {
            const response = await fetchUserLogIn(loginInfo);

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem("user", JSON.stringify(data));
                setUser(data);
                navigate("/");
            } else {
                toast.error("Incorrect email or password!", {
                    autoClose: 3000,
                    pauseOnHover: false,
                });
            }
        } catch (error) {
            toast.error("Sotmething wrong with fetch", {
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
            toast.error("Please enter valid values!", {
                autoClose: 3000,
                pauseOnHover: false,
            });
            return;
        }
        logIn();
    };

    return (
        <AuthSection>
            <FormComponent
                handleOnSubmit={handleOnSubmit}
                dataTestId="sign-in-form"
                formFields={SIGNIN_FIELDS.map((sf) => (
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
                submitButton={
                    <FormSubmitButton
                        disabled={Object.keys(validationErrors).length}
                        text="Sign In"
                    />
                }
                formHeaderText="Sign In Form"
            />
        </AuthSection>
    );
}
