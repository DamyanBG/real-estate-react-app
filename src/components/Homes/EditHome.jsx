import { useEffect, useState } from 'react';
import { hostUrl } from '../../utils/urls';
import InputFormRow from '../../common/InputFormRow';
import FormSubmitButton from '../../common/FormSubmitButton';
import { HOME_FIELDS } from '../../common/fields';
import { checkObjForProfanity } from '@/common/profanity';
import './EditHome.scss';

// import { UserContext } from '../../context/UserContext';
// import { toast } from 'react-toastify';

export default function EditHome() {
    const params = new URLSearchParams(window.location.search);
    const homeId = params.get('homeId');
    const [homeInfo, setHomeInfo] = useState({});
    const [loading, setLoading] = useState(false);

    // const { user } = useContext(UserContext);
    // const [photo, setPhoto] = useState(null);

    const getHomeInfo = () => {
        fetch(`${hostUrl}/home/${homeId}`)
            .then((resp) => resp.json())
            .then(setHomeInfo);
    };

    useEffect(() => {
        if (!homeId) return;
        getHomeInfo();
    }, [homeId]);

    const putHome = () => {
        const putBody = { ...homeInfo };
        delete putBody.photo_url;
        setLoading(true);

        fetch(`${hostUrl}/home`, {
            method: 'PUT',
            body: JSON.stringify(putBody),
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
                setHomeInfo(json);
                setLoading(false);
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
        if (checkObjForProfanity(homeInfo)) return;
        putHome();
    };

    const handleOnPhotoUpload = (e) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            setHomeInfo({
                ...homeInfo,
                [e.target.name]: reader.result,
            });
        };
        if (e.target.files) {
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    console.log(homeInfo);

    // const uploadPhoto = () => {
    //     const formData = new FormData();

    //     // Update the formData object
    //     formData.append('photo', photo.selectedFile, photo.selectedFile.name);
    //     formData.append('home_id', homeId);
    //     fetch(`${hostUrl}/home-photos`, {
    //         method: 'POST',
    //         body: formData,
    //         headers: {
    //             'Authorization': `Bearer ${user.token}`
    //         },
    //     }).then((resp) => {
    //         if (resp.ok) {
    //             toast.success('Photo uploaded!', { autoClose: 3000, pauseOnHover: false });
    //             getHomeInfo();
    //             return resp.json();
    //         }
    //         toast.error('Photo not uploaded!', { autoClose: 3000, pauseOnHover: false });
    //     });
    // };

    return (
        <div className="center edit-form-wrapper">
            <form className="edit-form" onSubmit={handleOnSubmit}>
                {HOME_FIELDS.map((hk) => (
                    <InputFormRow
                        key={hk.labelName}
                        labelName={hk.labelName}
                        name={hk.name}
                        value={homeInfo[hk.name]}
                        handleOnChange={handleOnChange}
                    />
                ))}
                <article className="form-row-description">
                    <label>Description</label>
                    <textarea
                        rows="7"
                        cols="33"
                        type="text"
                        name="description"
                        value={homeInfo.description || ''}
                        onChange={handleOnChange}
                    />
                </article>
                <FormSubmitButton loading={loading} />
            </form>
            <article className="edit-form-file-upload" style={{ margin: 'auto', width: '300px' }}>
                <img src={homeInfo.photo_url} alt="" style={{ width: '100%' }} />
                <input type="file" name="photo" onChange={handleOnPhotoUpload} />
            </article>
        </div>
    );
}
