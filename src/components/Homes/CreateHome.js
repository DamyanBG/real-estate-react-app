import { useContext, useState } from 'react';
import { hostUrl } from '../../common/urls';
import InputFormRow from '../../common/InputFormRow';
import FormSubmitButton from '../../common/FormSubmitButton';
import { HOME_FIELDS } from '../../common/fields';
import { UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';

export default function CreateHome() {
    const [homeInfo, setHomeInfo] = useState({});
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    const postHome = () => {
        const postBody = { owner_id: user._id, ...homeInfo };
        fetch(`${hostUrl}/home`, {
            method: 'POST',
            body: JSON.stringify(postBody),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((resp) => {
                return resp.json();
            })
            .then((json) => {
                if (json._id) {
                    navigate(`/edit-home?homeId=${json._id}`)
                    return
                }
                throw new Error();
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
