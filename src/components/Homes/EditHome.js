import { useContext, useEffect, useState } from 'react';
import { hostUrl } from '../../common/urls';
import InputFormRow from '../../common/InputFormRow';
import FormSubmitButton from '../../common/FormSubmitButton';
import { HOME_FIELDS } from '../../common/fields';
import { UserContext } from '../../context/UserContext';
import { toast } from 'react-toastify';
import { Formik } from 'formik';
import { homeFormValidateConditions, homeFormnItialValues } from 'common/formikFile';

export default function EditHome() {
    const params = new URLSearchParams(window.location.search);
    const homeId = params.get('homeId');
    const [homeInfo, setHomeInfo] = useState({});
    const { user } = useContext(UserContext);
    const [photo, setPhoto] = useState(null);

    const getHomeInfo = () => {
        fetch(`${hostUrl}/home/${homeId}`)
            .then((resp) => resp.json())
            .then(setHomeInfo);
    };

    useEffect(() => {
        if (!homeId) return;
        getHomeInfo();
    }, [homeId]);

    const putHome = (values) => {
        const postBody = { owner_id: user._id, home_id: homeId, ...values };
        fetch(`${hostUrl}/home`, {
            method: 'PUT',
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
                setHomeInfo({});
            });
    };

    const handleOnPhotoUpload = (event) => {
        setPhoto({
            selectedFile: event.target.files[0],
        });
    };

    const uploadPhoto = () => {
        const formData = new FormData();

        // Update the formData object
        formData.append('photo', photo.selectedFile, photo.selectedFile.name);
        formData.append('home_id', homeId);
        fetch(`${hostUrl}/home-photos`, {
            method: 'POST',
            body: formData,
        }).then((resp) => {
            if (resp.ok) {
                toast.success('Photo uploaded!', { autoClose: 3000, pauseOnHover: false });
                getHomeInfo();
                return resp.json();
            }
            toast.error('Photo not uploaded!', { autoClose: 3000, pauseOnHover: false });
        });
    };

    return (
        <Formik
            initialValues={homeFormnItialValues}
            validate={homeFormValidateConditions}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    setSubmitting(false);
                }, 400);
                setHomeInfo({
                    ...homeInfo,
                    ...values,
                });
                putHome(values);
            }}
        >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
            }) => (
                <div className="center">
                    <article style={{ margin: 'auto', width: '300px' }}>
                        <img src={homeInfo.photo_url} alt="" style={{ width: '100%' }} />
                        <input type="file" name="photo" onChange={handleOnPhotoUpload} />
                        <button onClick={uploadPhoto}>Upload photo</button>
                    </article>
                    <form onSubmit={handleSubmit}>
                        {HOME_FIELDS.map((hk) => (
                            <div key={hk.labelName}>
                                <InputFormRow
                                    labelName={hk.labelName}
                                    name={hk.name}
                                    value={values[hk.name]}
                                    handleOnChange={handleChange}
                                    handleOnBlur={handleBlur}
                                />
                                <p className="home-error">
                                    {errors[hk.name] && touched[hk.name] && errors[hk.name]}
                                </p>
                            </div>
                        ))}
                        <article className="form-row">
                            <label>Description</label>
                            <textarea
                                type="text"
                                name="description"
                                value={values.description}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.description && touched.description && errors.description}
                        </article>
                        <FormSubmitButton disabled={isSubmitting} />
                    </form>
                </div>
            )}
        </Formik>
    );
}
