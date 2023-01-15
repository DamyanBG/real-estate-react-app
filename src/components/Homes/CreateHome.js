import { useContext, useState } from 'react';
import { hostUrl } from '../../common/urls';
import InputFormRow from '../../common/InputFormRow';
import FormSubmitButton from '../../common/FormSubmitButton';
import { HOME_FIELDS } from '../../common/fields';
import { UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function CreateHome() {
    const [descriptionValidity, setDescriptionValidity] = useState(true);
    const [descriptionErrorMsg, setDescriptionErrorMsg] = useState('');
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
                    navigate(`/edit-home?homeId=${json._id}`);
                    return;
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

    const validateDescription = (e) => {
        const { value } = e.target;
        value.length < 3 || value.length > 150
            ? setDescriptionValidity(false)
            : setDescriptionValidity(true);
        descriptionValidity
            ? setDescriptionErrorMsg(null)
            : setDescriptionErrorMsg('Description must have minimum 3 and maximum 150 characters');
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();
        let validity = false;
        if (
            Object.keys(homeInfo).includes(
                'description',
                'title',
                'address',
                'city',
                'neighborhood',
                'price',
                'year'
            )
        ) {
            for (let i = 0; i < HOME_FIELDS.length; i++) {
                // eslint-disable-next-line no-undef
                if (document.getElementById(`${HOME_FIELDS[i].name}Error`) === null) {
                    validity = true;
                } else {
                    validity = false;
                    break;
                }
            }
        }
        validity
            ? postHome()
            : toast.error('Please Enter Valid Values', { autoClose: 3000, pauseOnHover: false });
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
                        onInput={validateDescription}
                    />
                    {!descriptionValidity && (
                        <p style={{ color: 'red', fontSize: '13px' }}>{descriptionErrorMsg}</p>
                    )}
                </article>
                <FormSubmitButton />
            </form>
        </div>
    );
}
