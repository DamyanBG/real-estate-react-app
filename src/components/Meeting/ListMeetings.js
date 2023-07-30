import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import { hostUrl } from '../../common/urls';
import { MEETING_STATUSES } from '../../common/enums';
import { useNavigate } from 'react-router-dom';
import './planner.scss';

const HOURS = [
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
    '21',
    '22',
    '23',
];

const EventContainer = ({ startTime, endTime, mouseMoveRef, eventId }) => {
    const startHour = parseInt(startTime.split(':')[0], 10);
    const endHour = parseInt(endTime.split(':')[0], 10);
    const ref = useRef(null);

    console.log('inside map');
    console.log(endHour);

    // const clientX = useRef(null);

    return (
        <article
            ref={ref}
            style={{
                position: 'absolute',
                left: `${(startHour * 70 + 100).toString()}px`,
                border: 'none',
                padding: '4px',
                minHeight: '32px',
                width: `${(endHour - startHour - 1) * 70 + 70}px`,
                display: 'flex',
                flexDirection: 'row',
            }}
        >
            <div
                style={{
                    minWidth: '3px',
                    background: 'red',
                }}
            >
                |
            </div>
            <p
                style={{
                    border: '1px solid gray',
                    overflowX: 'hidden',
                    textOverflow: 'ellipsis',
                }}
            >
                Meeting
            </p>
            <div
                id={`end-${eventId}`}
                // draggable
                style={{
                    marginLeft: 'auto',
                    marginRight: '0',
                    minWidth: '4px',
                    background: 'red',
                }}
                // onDragStart={(e) => {
                //     console.log("dragStart");
                //     clientX.current = e.clientX;
                // }}
                // onDrag={(e) => {
                //     const newWidth =
                //         parseInt(e.clientX) -
                //         parseInt(clientX.current) +
                //         ((endHour - startHour - 1) * 70 + 70);
                //     ref.current.style.width = `${newWidth}px`;
                // }}
                // onDragEnd={() => {
                //     console.log("dragEnd")
                // }}
                // onMouseEnter={(e) => {
                //     e.target.style.background = "blue"
                // }}
                // onMouseMove={(e) => {
                //     console.log(e)
                // }}
            ></div>
        </article>
    );
};

const ButtonComponent = ({ buttonText, handleOnClick }) => (
    <button type="button" onClick={handleOnClick}>
        {buttonText}
    </button>
);

const MeetingRow = ({ meeting }) => {
    return (
        <>
            Meeting between {meeting.invitor_id} and {meeting.invited_id} starts at{' '}
            {meeting.start_time} and ends at {meeting.end_time}!
        </>
    );
};

export default function ListMeetings() {
    const { user } = useContext(UserContext);
    const [meetingsList, setMeetingsList] = useState([]);
    const navigate = useNavigate();

    const mouseMoveRef = useRef(null)
    const resizeElement = useRef(null)
    const resizeElementInitialWidth = useRef(null)
    const [isChangingWidth, setIsChangingWidth] = useState(false)

    const homes = useMemo(
        () =>
            meetingsList.reduce((acc, meeting) => {
                const homeId = meeting.home_id;
                if (acc.includes(homeId)) return acc;
                return [...acc, homeId];
            }, []),
        [meetingsList]
    );

    const getMeetings = () => {
        fetch(`${hostUrl}/meeting`, {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        })
            .then((resp) => resp.json())
            .then((json) => {
                console.log(json);
                setMeetingsList(json);
            });
    };

    useEffect(() => {
        if (!user.id) return;
        getMeetings();
    }, [user.id]);

    const patchMeetingStatus = (meetingId, newStatus) => {
        const patchBody = {
            meeting_id: meetingId,
            status: newStatus,
        };
        fetch(`${hostUrl}/meetings`, {
            method: 'PATCH',
            body: JSON.stringify(patchBody),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`,
            },
        }).then((resp) => {
            if (resp.ok) {
                getMeetings();
            }
        });
    };

    const deleteMeeting = (meetingId) => {
        fetch(`${hostUrl}/meetings`, {
            method: 'DELETE',
            body: JSON.stringify({
                meeting_id: meetingId,
            }),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`,
            },
        }).then((resp) => {
            if (resp.ok) {
                const newMeetingList = meetingsList.filter((ml) => ml.id !== meetingId);
                setMeetingsList(newMeetingList);
            }
        });
    };

    const handleOnAccept = (meetingId) => {
        patchMeetingStatus(meetingId, MEETING_STATUSES.accepted);
    };

    const handleOnReject = (meetingId) => {
        patchMeetingStatus(meetingId, MEETING_STATUSES.rejected);
    };

    const handleOnEdit = (meetingId) => {
        navigate(`/edit-meeting?meetingId=${meetingId}`);
    };

    const handleOnDelete = (meetingId) => {
        deleteMeeting(meetingId);
    };

    return (
        <div>
            {Object.values(MEETING_STATUSES).map((status) => (
                <article key={status}>
                    <h1>{status.toUpperCase()} MEETINGS</h1>
                    {meetingsList
                        .filter((ml) => ml.status === status)
                        .map((ml) => (
                            <article key={ml.id} style={{ padding: '24px' }}>
                                <p>
                                    <MeetingRow meeting={ml} status={status} />
                                </p>
                                {status === MEETING_STATUSES.pending && (
                                    <>
                                        {ml.invited_id === user.id ? (
                                            <>
                                                <ButtonComponent
                                                    buttonText="Accept"
                                                    handleOnClick={() => handleOnAccept(ml.id)}
                                                />
                                                <ButtonComponent
                                                    buttonText="Reject"
                                                    handleOnClick={() => handleOnReject(ml.id)}
                                                />
                                            </>
                                        ) : (
                                            <>
                                                <ButtonComponent
                                                    buttonText="Edit"
                                                    handleOnClick={() => handleOnEdit(ml.id)}
                                                />
                                                <ButtonComponent
                                                    buttonText="Delete"
                                                    handleOnClick={() => handleOnDelete(ml.id)}
                                                />
                                            </>
                                        )}
                                    </>
                                )}
                            </article>
                        ))}
                </article>
            ))}
            <section>
                <h2>Time planner</h2>
                <table className="planner-table">
                    <thead>
                        <tr>
                            <th>Homes</th>
                            {HOURS.map((hour) => (
                                <th key={`hour-th-${hour}`}>{hour}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {homes.map((home) => (
                            <tr key={`resource-row-${home}`} className="resource-row">
                                <td>{home}</td>
                                {HOURS.map((hour) => (
                                    <td key={`resource-hour-${home}-${hour}`}></td>
                                ))}
                                <div className="event-element">Something</div>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <section style={{ marginTop: '50px' }} className="planner-section">
                    <article className="planner-head-row-container">
                        <article style={{ minWidth: '100px', textAlign: 'center' }}>
                            Resources
                        </article>
                        {HOURS.map((hour) => (
                            <article className="head-cell" key={`header-cell-${hour}`}>
                                {hour}
                            </article>
                        ))}
                    </article>
                    {homes.map((home) => (
                        <article 
                            className="planner-row" 
                            key={`planner-row-${home}`} 
                            onMouseDown={(e) => {

                                console.log(e.target)
                                console.log(e.target.parentElement)
                                if (e.target.id.includes("end")) {
                                    console.log("yes, includes")
                                    console.log("Initial")
                                    console.log(e.clientX)
                                    mouseMoveRef.current = e.clientX
                                    resizeElement.current = e.target.parentElement
                                    resizeElementInitialWidth.current = parseInt(e.target.parentElement.style.width.slice(0, -2))
                                    // console.log(e.target.parentElement.style.width)
                                    // console.log(typeof e.target.parentElement.style.width)
                                    setIsChangingWidth(true)
                                }
                            }}
                            onMouseUp={() => {
                                // TO DO
                                // Take the difference and set the new hour for the end_time
                                // const widthDifference = 
                                mouseMoveRef.current = null
                                resizeElement.current = null
                                resizeElementInitialWidth.current = null
                                setIsChangingWidth(false)
                            }}
                            onMouseMove={(e) => {
                                if (isChangingWidth) {
                                    console.log(e.clientX)
                                    const newWidth = parseInt(e.clientX) - parseInt(mouseMoveRef.current) + resizeElementInitialWidth.current
                                    resizeElement.current.style.width = `${newWidth}px`
                                }
                                
                            }}
                        >
                            <article style={{ minWidth: '100px', textAlign: 'center' }}>
                                {home}
                            </article>
                            {HOURS.map((hour) => (
                                <article className="row-cell" key={`row-cell-${hour}`} onDrop={(e) => {
                                    e.preventDefault()
                                    console.log('on Drop')
                                }}></article>
                            ))}
                            <article
                                style={{
                                    position: 'absolute',
                                    left: '100px',
                                }}
                            >
                                Absolute
                            </article>
                            {meetingsList
                                .filter((meeting) => meeting.home_id === home)
                                .map((meeting) => (
                                    <EventContainer
                                        key={meeting.id}
                                        startTime={meeting.start_time}
                                        endTime={meeting.end_time}
                                        mouseMoveRef={mouseMoveRef}
                                        eventId={meeting.id}
                                    />
                                ))}
                        </article>
                    ))}
                </section>
            </section>
        </div>
    );
}
