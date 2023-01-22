import { useContext, useState } from 'react';
import { hostUrl } from '../../common/urls';
import InputFormRow from '../../common/InputFormRow';
import FormSubmitButton from '../../common/FormSubmitButton';
import { HOME_FIELDS } from '../../common/fields';
import { UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { validateField } from 'common/validation';
import { toast } from 'react-toastify';

export default function CreateHome() {
    const [homeInfo, setHomeInfo] = useState({});
    const [validationErrors, setValidationErrors] = useState(
        HOME_FIELDS.map((uf) => uf.name).reduce((acc, curr) => ((acc[curr] = ''), acc), {})
    );

    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const [photo, setPhoto] = useState(null);

    const postHome = () => {
        const formData = new FormData()
        formData.append("title", homeInfo.title)
        formData.append("city", homeInfo.city)
        formData.append("neighborhood", homeInfo.neighborhood)
        formData.append("address", homeInfo.address)
        formData.append("longitude", homeInfo.longitude)
        formData.append("latitude", homeInfo.latitude)
        formData.append("price", homeInfo.price)
        formData.append("size", homeInfo.size)
        formData.append("year", homeInfo.year)
        formData.append("description", homeInfo.description)
        if (photo) formData.append('photo', photo, photo.name);
        formData.append("owner_id", user._id)
        console.log(formData)
        console.log(homeInfo.title)
        fetch(`${hostUrl}/home`, {
            method: 'POST',
            body: formData,
            // headers: {
            //     'Content-Type': 'application/json',
            // },
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
        setHomeInfo({
            ...homeInfo,
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
        postHome();
    };


    const handleOnPhotoUpload = (event) => {
        setPhoto(event.target.files[0])
    }

    return (
        <div className="center">
            <form onSubmit={handleOnSubmit}>
                <article style={{ margin: 'auto', width: '300px' }}>
                    <input type="file" name="photo" onChange={handleOnPhotoUpload} />
                </article>
                {HOME_FIELDS.map((hk) => (
                    <InputFormRow
                        key={hk.labelName}
                        labelName={hk.labelName}
                        name={hk.name}
                        value={homeInfo[hk.name]}
                        type={hk.type}
                        handleOnChange={handleOnChange}
                        validationError={validationErrors[hk.name]}
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
