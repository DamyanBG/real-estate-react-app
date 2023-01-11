import { useContext, useState } from 'react';
import { LAND_FIELDS } from '../../common/fields';
import InputFormRow from '../../common/InputFormRow';
import FormSubmitButton from '../../common/FormSubmitButton';
import { hostUrl } from '../../common/urls';
import { UserContext } from '../../context/UserContext';

export default function CreateLand() {
    const [landInfo, setLandInfo] = useState({});
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

    const handleOnChange = (e) => {
        setLandInfo({
            ...landInfo,
            [e.target.name]: e.target.value,
        });
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();
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
                        handleOnChange={handleOnChange}
                    />
                ))}
                <FormSubmitButton />
            </form>
        </div>
    );
}
