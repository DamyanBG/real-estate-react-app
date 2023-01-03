import { useState } from 'react';
import { hostUrl } from '../../common/urls';
import InputFormRow from '../../common/InputFormRow';
import FormSubmitButton from '../../common/FormSubmitButton';
import { HOME_FIELDS } from '../../common/fields';

export default function CreateHome() {
    const [homeInfo, setHomeInfo] = useState({});

    const postHome = () => {
        fetch(`${hostUrl}/home`, {
            method: 'POST',
            body: JSON.stringify(homeInfo),
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
                setHomeInfo({});
            });
    };

    const handleOnChange = (e) => {
        setHomeInfo({
            ...homeInfo,
            [e.target.name]: e.target.value,
        });
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();
        postHome();
    };

    return (
        <div className="center">
            <form onSubmit={handleOnSubmit}>
                {HOME_FIELDS.map((hk) => (
                    <InputFormRow
                        key={hk.labelName}
                        labelName={hk.labelName}
                        name={hk.name}
                        value={homeInfo[hk.name]}
                        handleOnChange={handleOnChange}
                    />
                ))}
                <article className="form-row">
                    <label>Description</label>
                    <textarea
                        type="text"
                        name="description"
                        value={homeInfo.description || ''}
                        onChange={handleOnChange}
                    />
                </article>
                <FormSubmitButton />
            </form>
        </div>
    );
}
