import { useContext, useState } from 'react';
import { hostUrl } from '../../common/urls';
import InputFormRow from '../../common/InputFormRow';
import FormSubmitButton from '../../common/FormSubmitButton';
import { HOME_FIELDS } from '../../common/fields';
import { UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import { homeFormValidateConditions, homeFormnItialValues } from 'common/formikFile';

export default function CreateHome() {
    const [homeInfo, setHomeInfo] = useState({});
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    const postHome = (values) => {
        const postBody = { owner_id: user._id, ...values };
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
                postHome(values);
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
