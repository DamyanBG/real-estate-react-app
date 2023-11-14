import { useContext, useState } from 'react';
import { hostUrl } from '../../utils/urls';
import { MEETING_FIELDS } from '../../common/fields';
import InputFormRow from '../../common/InputFormRow';
import FormSubmitButton from '../../common/FormSubmitButton';
import { UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { checkTextForProfanity } from '@/common/profanity';

export default function EditMeeting() {
    const params = new URLSearchParams(window.location.search);
    const meetingId = params.get('meetingId');
    const [meetingInfo, setMeetingInfo] = useState({});
    const { user } = useContext(UserContext);

    const navigate = useNavigate()

    const postMeeting = () => {
        fetch(`${hostUrl}/meeting/${meetingId}`, {
            method: 'PATCH',
            body: JSON.stringify(meetingInfo),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`,
            },
        })
            .then((resp) => {
                if (resp.status === 204) {
                    navigate("/list-meetings")
                }
            })
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();
        if (checkTextForProfanity(meetingInfo)) return
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
                        type={mf.type}
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
