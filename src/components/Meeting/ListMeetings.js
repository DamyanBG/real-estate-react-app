import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import { hostUrl } from '../../common/urls';
import { MEETING_STATUSES } from '../../common/enums';
import { useNavigate } from 'react-router-dom';

const ButtonComponent = ({ buttonText, handleOnClick }) => (
    <button type='button' onClick={handleOnClick}>{buttonText}</button>
)

const MeetingRow = ({ meeting }) => {
    return (
        <>
            Meeting between {meeting.invitor_id} and {meeting.invited_id} starts at{' '}
            {meeting.start_date} and ends at {meeting.end_date}!
        </>
    );
};

export default function ListMeetings() {
    const { user } = useContext(UserContext);
    const [meetingsList, setMeetingsList] = useState([]);
    const navigate = useNavigate()

    const getMeetings = () => {
        fetch(`${hostUrl}/meetings/${user._id}`)
            .then((resp) => resp.json())
            .then((json) => {
                console.log(json);
                setMeetingsList(json);
            });
    };

    useEffect(() => {
        if (!user._id) return;
        getMeetings();
    }, [user._id]);

    const patchMeetingStatus = (meetingId, newStatus) => {
        const patchBody = {
            meeting_id: meetingId,
            status: newStatus
        }
        fetch(`${hostUrl}/meetings`, {
            method: "PATCH",
            body: JSON.stringify(patchBody),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(resp => {
                if (resp.ok) {
                    getMeetings()
                }
            })
    }

    const deleteMeeting = (meetingId) => {
        fetch(`${hostUrl}/meetings`, {
            method: "DELETE",
            body: JSON.stringify({
                meeting_id: meetingId
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(resp => {
                if (resp.ok) {
                    const newMeetingList = meetingsList.filter((ml) => ml._id !== meetingId)
                    setMeetingsList(newMeetingList)
                }
            })
    }

    const handleOnAccept = (meetingId) => {
        patchMeetingStatus(meetingId, MEETING_STATUSES.accepted)
    }

    const handleOnReject = (meetingId) => {
        patchMeetingStatus(meetingId, MEETING_STATUSES.rejected)
    }

    const handleOnEdit = (meetingId) => {
        navigate(`/edit-meeting?meetingId=${meetingId}`)
    }

    const handleOnDelete = (meetingId) => {
        deleteMeeting(meetingId)
    }

    return (
        <div className="center">
            {Object.values(MEETING_STATUSES).map((status) => (
                <article key={status}>
                    <h1>{status.toUpperCase()} MEETINGS</h1>
                    {meetingsList
                        .filter((ml) => ml.status === status)
                        .map((ml) => (
                            <article key={ml._id} style={{ padding: '24px' }}>
                                <p>
                                    <MeetingRow meeting={ml} status={status} />
                                </p>
                                {status === MEETING_STATUSES.pending && (
                                    <>
                                        {
                                            ml.invited_id === user._id ? (
                                                <>
                                                    <ButtonComponent  buttonText="Accept" handleOnClick={() => handleOnAccept(ml._id)}  />
                                                    <ButtonComponent  buttonText="Reject" handleOnClick={() => handleOnReject(ml._id)}  />
                                                </>
                                            ) : (
                                                <>
                                                    <ButtonComponent  buttonText="Edit" handleOnClick={() => handleOnEdit(ml._id)}  />
                                                    <ButtonComponent  buttonText="Delete" handleOnClick={() => handleOnDelete(ml._id)}  />
                                                </>
                                            )
                                        }
                                    </>
                                )}
                            </article>
                        ))}
                </article>
            ))}
        </div>
    );
}
