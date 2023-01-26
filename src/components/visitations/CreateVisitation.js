import React, { useState, useContext } from 'react';
import { VISITATION_FIELDS } from 'common/fields';
import { useNavigate } from 'react-router-dom';
import FormSubmitButton from 'common/FormSubmitButton';
import InputFormRow from 'common/InputFormRow';
import { hostUrl } from '../../common/urls';
import { toast } from 'react-toastify';
import { UserContext } from 'context/UserContext';

const CreateVisitation = () => {
    const queryParams = new URLSearchParams(`${location.search}`);
    const homeId = queryParams.get('homeId');

    const { user } = useContext(UserContext);

    const navigate = useNavigate();

    const [validationInfo, setValidationInfo] = useState({
        home_id: homeId,
    });

    const postValiations = async () => {
        try {
            const data = await fetch(`${hostUrl}/visitation`, {
                method: 'POST',
                body: JSON.stringify({ ...validationInfo, organizator_id: user._id }),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`,
                },
            });

            if (data) {
                navigate(`/home-details?homeId=${homeId}`);
                toast.success('Successful! Visitation Created!', {
                    autoClose: 3000,
                    pauseOnHover: false,
                });
            }
        } catch (err) {
            toast.error(`Something went wrong! ${err}`, { autoClose: 3000, pauseOnHover: false });
        }
    };

    const handleOnChange = (e) => {
        setValidationInfo({
            ...validationInfo,
            [e.target.name]: e.target.value,
        });
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();

        postValiations();
    };

    return (
        <div className="center">
            <form onSubmit={handleOnSubmit}>
                {VISITATION_FIELDS.map((vf) => (
                    <InputFormRow
                        key={vf.labelName}
                        type={vf.type}
                        labelName={vf.labelName}
                        name={vf.name}
                        value={validationInfo[vf.name]}
                        handleOnChange={handleOnChange}
                    />
                ))}
                <FormSubmitButton />
            </form>
        </div>
    );
};

export default CreateVisitation;
