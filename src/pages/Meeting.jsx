import { useContext, useState } from "react";
import { useParams } from "react-router-dom";

import FormComponent from "../components/form/FormComponent";
import { MEETING_FIELDS } from "../utils/fields";
import InputFormRow from "../components/form/InputFormRow";
import FormSubmitButton from "../components/form/FormSubmitButton";
import { validateField } from "../utils/validation";
import { postMeeting } from "../api/meetingApi";
import { UserContext } from "../context/UserProvider";

import styles from "./meeting.module.scss";

const Meeting = () => {
    const [meetingInfo, setMeetingInfo] = useState({});
    const [validationErrors, setValidationErrors] = useState(
        MEETING_FIELDS.map((uf) => uf.name).reduce(
            (acc, curr) => ((acc[curr] = ""), acc),
            {}
        )
    );
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { homeId, meetingPartnerId } = useParams()
    const { user } = useContext(UserContext)

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true)
        const postBody = {
            ...meetingInfo,
            invitor_id: user.id,
            invited_id: meetingPartnerId,
        }
        try {
            const resp = await postMeeting(postBody, user.token)
            if (resp.status === 400) {
                const errors = await resp.json()
                console.log(errors)
            }
            const json = await resp.json()
            console.log(json)
        } catch {
            console.log("Internal error!")
        } finally {
            setIsSubmitting(false)
        }
    };

    const handleOnChange = (e) => {
        setMeetingInfo({
            ...meetingInfo,
            [e.target.name]: e.target.value,
        });
        handleValidate(e);
    };

    const isButtonDisabled = Object.keys(validationErrors).length || isSubmitting

    return (
        <section className={styles.mainSection}>
            <section className={styles.meetingFormSection}>
                <FormComponent
                    handleOnSubmit={handleSubmit}
                    dataTestId="meeting-form"
                    formFields={MEETING_FIELDS.map((mf) => (
                        <InputFormRow
                            key={mf.labelName}
                            labelName={mf.labelName}
                            name={mf.name}
                            value={meetingInfo[mf.name]}
                            type={mf.type}
                            handleOnChange={handleOnChange}
                            validationError={validationErrors[mf.name]}
                            dataTestId={mf.name}
                        />
                    ))}
                    submitButton={
                        <FormSubmitButton
                            disabled={isButtonDisabled}
                        />
                    }
                    formHeaderText="Request Meeting With Seller"
                />
            </section>
        </section>
    );
};

export default Meeting;
