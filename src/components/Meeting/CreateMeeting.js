import { useContext, useState } from 'react';
import { hostUrl } from '../../common/urls';
import { MEETING_FIELDS } from '../../common/fields';
import InputFormRow from '../../common/InputFormRow';
import FormSubmitButton from '../../common/FormSubmitButton';
import { UserContext } from '../../context/UserContext';
import { MEETING_STATUSES } from '../../common/enums';

export default function CreateMeeting() {
    const params = new URLSearchParams(window.location.search);
    const invitedId = params.get('createWithId');
    const [meetingInfo, setMeetingInfo] = useState({});
    const { user } = useContext(UserContext);

    const postMeeting = () => {
        const postBody = {
            invitor_id: user._id,
            invited_id: invitedId,
            status: MEETING_STATUSES.pending,
            ...meetingInfo,
        };
        fetch(`${hostUrl}/meetings`, {
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
            });
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();
        postMeeting();
    };

    const handleOnChange = (e) => {
        setMeetingInfo({
            ...meetingInfo,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className="center">
            <form onSubmit={handleOnSubmit}>
                {MEETING_FIELDS.map((mf) => (
                    <InputFormRow
                        key={mf.name}
                        labelName={mf.labelName}
                        name={mf.name}
                        value={meetingInfo[mf.name]}
                        handleOnChange={handleOnChange}
                    />
                ))}
                <FormSubmitButton />
            </form>
        </div>
    );
}
