import { useContext, useEffect, useState, Fragment, useRef } from "react";
import { DateTime } from "luxon"

import { getUserMeetings } from "../api/meetingApi";
import { UserContext } from "../context/UserProvider";

import styles from "./scheduler.module.scss";


const FullFrame = ({
    id,
    handleDragEnd,
    handleDragStart,
    startTime,
    endTime,
    index,
    frameText
}) => {
    const frames = endTime - startTime

    return (
        <article
            draggable
            onDragStart={handleDragStart(id, frames)}
            onDragEnd={handleDragEnd}
            style={{
                gridColumn: `${
                    startTime + 2
                } / ${endTime + 2}`,
                gridRowStart: `${2 + index}`,
                background: "lightblue",
                zIndex: 1,
            }}
            className={styles.timeFrame}
        >
            {frameText}
        </article>
    )
}

const StartFrame = ({
    id,
    handleDragEnd,
    handleDragStart,
    startTime,
    endTime,
    index,
    frameText
}) => {
    const frames = endTime
    console.log(frames)

    return (
        <article
            draggable
            onDragStart={handleDragStart(id, frames)}
            onDragEnd={handleDragEnd}
            style={{
                gridColumn: `${2} / ${endTime + 2}`,
                gridRowStart: `${2 + index}`,
                background: "lightblue",
                zIndex: 1,
            }}
            className={styles.startTimeFrame}
        >
            {frameText}
        </article>
    )
}

const EndFrame = ({
    id,
    handleDragEnd,
    handleDragStart,
    startTime,
    endTime,
    index,
    frameText
}) => {
    const frames = 24 - startTime

    return (
        <article
            draggable
            onDragStart={handleDragStart(id, frames)}
            onDragEnd={handleDragEnd}
            style={{
                gridColumn: `${
                    startTime + 2
                } / ${26}`,
                gridRowStart: `${2 + index}`,
                background: "lightblue",
                zIndex: 1,
            }}
            className={styles.endTimeFrame}
        >
            {frameText}
        </article>
    )
}

const TimeFrame = ({
    id,
    handleDragEnd,
    handleDragStart,
    startTime,
    endTime,
    index,
    frameText,
    frameType
}) => {
    const TimeFrameComponent = frameType === "full"
        ? FullFrame
        : frameType === "start"
            ? StartFrame
            : EndFrame

    return (
        <TimeFrameComponent
            id={id}
            handleDragEnd={handleDragEnd}
            handleDragStart={handleDragStart}
            startTime={startTime}
            endTime={endTime}
            index={index}
            frameText={frameText}
            frameType={frameType}
        />
    )
}


const formatMeeting = (meeting) => {
    const formattedMeeting = {
        id: meeting.id,
        home_title: meeting.home_title,
        startDateTime: DateTime.fromISO(`${meeting.date}T${meeting.start_time}`),
        endDateTime: DateTime.fromISO(`${meeting.date}T${meeting.end_time}`),
        meeting_partner_names: meeting.meeting_partner_names,
    }
    return formattedMeeting
}

const today = DateTime.local();

const customOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

const mockMeetings = [
    {
        id: "25",
        invitor_id: "1",
        home_id: "25",
        start_time: "01:00:00",
        end_time: "07:00:00",
        meeting_partner_names: "Hristofor Konstantinov",
        home_title: "Selska kushta",
        date: "2024-05-17",
    },
    {
        id: "27",
        invitor_id: "1",
        home_id: "30",
        start_time: "02:00:00",
        end_time: "04:00:00",
        meeting_partner_names: "Daniel Petkov",
        home_title: "Apartament",
        date: "2024-05-17",
    },
].map(formatMeeting);

const HOURS = [
    { text: "12AM", hour: 0 },
    { text: "1AM", hour: 1 },
    { text: "2AM", hour: 2 },
    { text: "3AM", hour: 3 },
    { text: "4AM", hour: 4 },
    { text: "5AM", hour: 5 },
    { text: "6AM", hour: 6 },
    { text: "7AM", hour: 7 },
    { text: "8AM", hour: 8 },
    { text: "9AM", hour: 9 },
    { text: "10AM", hour: 10 },
    { text: "11AM", hour: 11 },
    { text: "12PM", hour: 12 },
    { text: "1PM", hour: 13 },
    { text: "2PM", hour: 14 },
    { text: "3PM", hour: 15 },
    { text: "4PM", hour: 16 },
    { text: "5PM", hour: 17 },
    { text: "6PM", hour: 18 },
    { text: "7PM", hour: 19 },
    { text: "8PM", hour: 20 },
    { text: "9PM", hour: 21 },
    { text: "10PM", hour: 22 },
    { text: "11PM", hour: 23 },
];

const MeetingsScheduler = () => {
    const [meetings, setMeetings] = useState(mockMeetings);
    const { user } = useContext(UserContext);
    const [selectedPeriod, setSelectedPeriod] = useState(today);
    const draggedMeetingInfoRef = useRef(null)
    const [draggedNode, setDraggedNode] = useState(null)
    const [isDragging, setIsDragging] = useState(false)

    useEffect(() => {
        if (!user.token) return;
        const loadMeetings = async () => {
            const loadedMeetings = await getUserMeetings(user.token);
            setMeetings([...mockMeetings, ...loadedMeetings.map(formatMeeting)]);
        };

        loadMeetings();
    }, [user.token]);

    // console.table(meetings);

    const handleDragOver = (e) => {
        e.preventDefault()
        e.dataTransfer.dropEffect = "move"
    }

    const handleDrop = (i) => (e) => {
        const { meetingId, draggedFrame } = draggedMeetingInfoRef.current
        const newMeetingsState = meetings.map((meeting) => {
            if (meeting.id === meetingId) {
                const droppedOnHour = i
                const isStartTimeInPeriod = meeting.startDateTime.hasSame(selectedPeriod, 'day')
                const startHour = isStartTimeInPeriod
                    ? meeting.startDateTime.hour
                    : 0
                const draggedFromHour = startHour + draggedFrame
                const difference = droppedOnHour - draggedFromHour

                const newStartDateTime = meeting.startDateTime.plus({ hour: difference })
                const newEndDateTime = meeting.endDateTime.plus({ hour: difference })

                return {
                    ...meeting,
                    startDateTime: newStartDateTime,
                    endDateTime: newEndDateTime,
                }
            }
            return meeting
        })
        setMeetings(newMeetingsState)
        console.log(e)
    }

    const handleDragStart = (meetingId, frames) => (e) => {
        console.log(e)
        setTimeout(() => {
            e.target.classList.add(styles.hiddenFrame)
        }, 0)
        e.dataTransfer.effectAllowed = "move"
        const relativeX = e.nativeEvent.offsetX
        const elWidth = e.target.clientWidth
        
        const frameWidth = elWidth / frames
        const draggedFrame = Math.floor(relativeX / frameWidth)
        const draggedInfo = {
            meetingId,
            draggedFrame
        }
        draggedMeetingInfoRef.current = draggedInfo
        // console.log(e)
    }

    const handleDragEnd = (e) => {
        e.preventDefault()
        console.log("dragEnd")
        draggedMeetingInfoRef.current = null
        e.target.classList.remove(styles.hiddenFrame)
        e.target.dra
        // console.log(e)
    }

    const handleCellClick = (e) => {
        console.log(e)
    }

    const handleNextPeriodClick = () => {
        const newPeriod = selectedPeriod.plus({ days: 1 })
        setSelectedPeriod(newPeriod)
    }

    const handlePrevioustPeriodClick = () => {
        const newPeriod = selectedPeriod.minus({ days: 1 })
        setSelectedPeriod(newPeriod)
    }

    return (
        <section className={styles.schedulerContainer}>
            <section className={styles.schedulerRow}>
                <section className={styles.scheduler}>
                    <h2>Scheduler</h2>
                    <section>
                        <article className={styles.periodRow}>
                            <article>
                                <button type="button" onClick={handlePrevioustPeriodClick}>&larr;</button>
                                <span className={styles.periodText}>{selectedPeriod.toLocaleString(customOptions)}</span>
                                <button type="button" onClick={handleNextPeriodClick}>&rarr;</button>
                            </article>
                            <article className={styles.periodButtonsWrapper}>
                                <button type="button">Day</button>
                                <button type="button">Week</button>
                                <button type="button">Month</button>
                            </article>
                        </article>
                        <section 
                            className={styles.schedulerWrapper}
                        >
                            <article style={{ textAlign: "center" }}>Homes</article>
                            {HOURS.map((hour) => (
                                <article key={`id-${hour.text}`}  style={{ textAlign: "center" }}>
                                    {hour.text}
                                </article>
                            ))}
                            {meetings.map((meeting, index) => {
                                const startTime = meeting.startDateTime.hour

                                const endTime = meeting.endDateTime.hour

                                const isStartTimeInPeriod = meeting.startDateTime.hasSame(selectedPeriod, 'day')
                                const isEndTimeInPeriod = meeting.endDateTime.hasSame(selectedPeriod, 'day')

                                if (!isStartTimeInPeriod && !isEndTimeInPeriod) return

                                const frameType = isStartTimeInPeriod && isEndTimeInPeriod
                                    ? "full"
                                    : isStartTimeInPeriod
                                        ? "end"
                                        : "start"

                                return (
                                    <Fragment key={meeting.id}>
                                        <article
                                            style={{
                                                gridColumn: "1",
                                                gridRowStart: `${2 + index}`,
                                                background: "lightgreen",
                                                textAlign: "center",
                                            }}
                                        >
                                            {meeting.home_title}
                                        </article>
                                        <TimeFrame
                                            id={meeting.id}
                                            handleDragEnd={handleDragEnd}
                                            handleDragStart={handleDragStart}
                                            startTime={startTime}
                                            endTime={endTime}
                                            index={index}
                                            frameText={meeting.meeting_partner_names}
                                            frameType={frameType}
                                        />
                                        {Array.from({length: 24}, (_, i) => (
                                            <article 
                                                key={`cell-${index}-${i}`}
                                                style={{
                                                    gridColumn: `${
                                                        i + 2
                                                    } / ${i + 3}`,
                                                    gridRowStart: `${2 + index}`,
                                                    zIndex: isDragging ? 10 : 0,
                                                }}
                                                onDragOver={handleDragOver}
                                                onDrop={handleDrop(i)}
                                                onClick={handleCellClick}
                                            />
                                        ))}
                                    </Fragment>
                                );
                            })}
                        </section>
                    </section>
                </section>
                {/* <section className={styles.meetingsTable}>
                    <h2>Meetings List</h2>
                </section> */}
            </section>
        </section>
    );
};

export default MeetingsScheduler;
