import { useContext, useState } from 'react';
import { LAND_FIELDS } from '../../common/fields';
import InputFormRow from '../../common/InputFormRow';
import FormSubmitButton from '../../common/FormSubmitButton';
import { hostUrl } from '../../common/urls';
import { UserContext } from '../../context/UserContext';
import { validateField } from 'common/validation';
import { toast } from 'react-toastify';

export default function CreateLand() {
    const [landInfo, setLandInfo] = useState({});
    const [validationErrors, setValidationErrors] = useState(
        LAND_FIELDS.map((uf) => uf.name).reduce((acc, curr) => ((acc[curr] = ''), acc), {})
    );

    const { user } = useContext(UserContext);

    const postLand = () => {
        const postBody = {
            owner: user._id,
            ...landInfo,
        };
        fetch(`${hostUrl}/land`, {
            method: 'POST',
            body: JSON.stringify(postBody),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((resp) => {
                console.log(resp);
                return resp.json();
            })
            .then((json) => {
                console.log(json);
                setLandInfo({});
            });
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
        setLandInfo({
            ...landInfo,
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
        postLand();
    };

    return (
        <div className="center">
            <form onSubmit={handleOnSubmit}>
                {LAND_FIELDS.map((lf) => (
                    <InputFormRow
                        key={lf.labelName}
                        labelName={lf.labelName}
                        name={lf.name}
                        value={landInfo[lf.name]}
                        type={lf.type}
                        handleOnChange={handleOnChange}
                        validationError={validationErrors[lf.name]}
                    />
                ))}
                <FormSubmitButton />
            </form>
        </div>
    );
}
