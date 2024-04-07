import { useContext, useState } from 'react';
import { hostUrl } from '../../utils/urls';
import { MEETING_FIELDS } from '../../common/fields';
import InputFormRow from '../../common/InputFormRow';
import FormSubmitButton from '../../common/FormSubmitButton';
import { UserContext } from '../../context/UserContext';
import { MEETING_STATUSES } from '../../utils/enums';
import { useNavigate } from 'react-router-dom';
import { checkTextForProfanity } from '@/common/profanity';
import { useLocation  } from 'react-router-dom';

export default function CreateMeeting() {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const invitedId = params.get('createWithId');
    const [meetingInfo, setMeetingInfo] = useState({});
    const { user } = useContext(UserContext);

    const navigate = useNavigate()

    const postMeeting = () => {
        const postBody = {
            invitor_id: user.id,
            invited_id: invitedId,
            status: MEETING_STATUSES.pending,
            ...meetingInfo,
        };
        fetch(`${hostUrl}/meeting`, {
            method: 'POST',
            body: JSON.stringify(postBody),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`,
            },
        })
            .then((resp) => {
                if (resp.status === 201) {
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
