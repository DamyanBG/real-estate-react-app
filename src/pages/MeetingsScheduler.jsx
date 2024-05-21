import { useContext, useEffect, useState, Fragment, useRef } from "react";
import { DateTime } from "luxon";

import { getUserMeetings } from "../api/meetingApi";
import { UserContext } from "../context/UserProvider";

import styles from "./scheduler.module.scss";
import { PERIOD_TYPES } from "../utils/enums";
import { HOURS, WEEK_DAYS } from "../utils/utils";
import SchedulerHeader from "../components/scheduler/SchedulerHeader";

const FullFrame = ({ id, handleDragEnd, handleDragStart, startTime, endTime, index, frameText }) => {
    const frames = endTime - startTime;

    return (
        <article
            draggable
            onDragStart={handleDragStart(id, frames)}
            onDragEnd={handleDragEnd}
            style={{
                gridColumn: `${startTime + 2} / ${endTime + 2}`,
                gridRowStart: `${2 + index}`,
                background: "lightblue",
                zIndex: 1,
            }}
            className={styles.timeFrame}
        >
            {frameText}
        </article>
    );
};

const StartFrame = ({ id, handleDragEnd, handleDragStart, startTime, endTime, index, frameText }) => {
    const frames = endTime;
    console.log(frames);

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
    );
};

const EndFrame = ({ id, handleDragEnd, handleDragStart, startTime, endTime, index, frameText }) => {
    const frames = 24 - startTime;

    return (
        <article
            draggable
            onDragStart={handleDragStart(id, frames)}
            onDragEnd={handleDragEnd}
            style={{
                gridColumn: `${startTime + 2} / ${26}`,
                gridRowStart: `${2 + index}`,
                background: "lightblue",
                zIndex: 1,
            }}
            className={styles.endTimeFrame}
        >
            {frameText}
        </article>
    );
};

const TimeFrame = ({ id, handleDragEnd, handleDragStart, startTime, endTime, index, frameText, frameType }) => {
    const TimeFrameComponent = frameType === "full" ? FullFrame : frameType === "start" ? StartFrame : EndFrame;

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
    );
};

const formatMeeting = (meeting) => {
    const formattedMeeting = {
        ...meeting,
        startDateTime: DateTime.fromISO(`${meeting.date}T${meeting.start_time}`),
        endDateTime: DateTime.fromISO(`${meeting.date}T${meeting.end_time}`),
    };
    return formattedMeeting;
};

const today = DateTime.local();

const customOptions = { weekday: "long", year: "numeric", month: "long", day: "numeric" };

const MeetingsScheduler = () => {
    const [homesWithMeetings, setHomesWithMeetings] = useState([]);
    const { user } = useContext(UserContext);
    const [selectedPeriod, setSelectedPeriod] = useState(today);
    const [periodType, setPeriodType] = useState(PERIOD_TYPES.day);
    const draggedMeetingInfoRef = useRef(null);

    useEffect(() => {
        if (!user.token) return;
        const loadMeetings = async () => {
            const loadedMeetings = await getUserMeetings(user.token);
            console.table(loadedMeetings);
            setHomesWithMeetings(
                loadedMeetings.map((home) => ({
                    ...home,
                    home_meetings: home.home_meetings.map(formatMeeting),
                }))
            );
        };

        loadMeetings();
    }, [user.token]);

    console.table(homesWithMeetings);

    const handleDragOver = (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
    };

    const handleDrop = (i) => (e) => {
        const { meetingId, draggedFrame } = draggedMeetingInfoRef.current;
        const newHomeWithMeetingsState = homesWithMeetings.map((hm) => ({
            ...hm,
            home_meetings: hm.home_meetings.map((meeting) => {
                if (meeting.id === meetingId) {
                    const droppedOnHour = i;
                    const isStartTimeInPeriod = meeting.startDateTime.hasSame(selectedPeriod, "day");
                    const startHour = isStartTimeInPeriod ? meeting.startDateTime.hour : 0;
                    const draggedFromHour = startHour + draggedFrame;
                    const difference = droppedOnHour - draggedFromHour;

                    const newStartDateTime = meeting.startDateTime.plus({ hour: difference });
                    const newEndDateTime = meeting.endDateTime.plus({ hour: difference });

                    return {
                        ...meeting,
                        startDateTime: newStartDateTime,
                        endDateTime: newEndDateTime,
                    };
                }
                return meeting;
            }),
        }));
        setHomesWithMeetings(newHomeWithMeetingsState);
    };

    const handleDragStart = (meetingId, frames) => (e) => {
        console.log(e);
        setTimeout(() => {
            e.target.classList.add(styles.hiddenFrame);
        }, 0);
        e.dataTransfer.effectAllowed = "move";
        const relativeX = e.nativeEvent.offsetX;
        const elWidth = e.target.clientWidth;

        const frameWidth = elWidth / frames;
        const draggedFrame = Math.floor(relativeX / frameWidth);
        const draggedInfo = {
            meetingId,
            draggedFrame,
        };
        draggedMeetingInfoRef.current = draggedInfo;
        // console.log(e)
    };

    const handleDragEnd = (e) => {
        e.preventDefault();
        draggedMeetingInfoRef.current = null;
        e.target.classList.remove(styles.hiddenFrame);
    };

    const handleCellClick = (e) => {
        console.log(e);
    };

    const handleNextPeriodClick = () => {
        const newPeriod = selectedPeriod.plus({ days: 1 });
        setSelectedPeriod(newPeriod);
    };

    const handlePrevioustPeriodClick = () => {
        const newPeriod = selectedPeriod.minus({ days: 1 });
        setSelectedPeriod(newPeriod);
    };

    return (
        <section className={styles.schedulerContainer}>
            <section className={styles.schedulerRow}>
                <section className={styles.scheduler}>
                    <h2>Scheduler</h2>
                    <section>
                        <article className={styles.periodRow}>
                            <article>
                                <button type="button" onClick={handlePrevioustPeriodClick}>
                                    &larr;
                                </button>
                                <span className={styles.periodText}>{selectedPeriod.toLocaleString(customOptions)}</span>
                                <button type="button" onClick={handleNextPeriodClick}>
                                    &rarr;
                                </button>
                            </article>
                            <article className={styles.periodButtonsWrapper}>
                                <button
                                    type="button"
                                    className={periodType === PERIOD_TYPES.day && styles.activePerBtn}
                                    onClick={() => setPeriodType(PERIOD_TYPES.day)}
                                >
                                    Day
                                </button>
                                <button
                                    type="button"
                                    className={periodType === PERIOD_TYPES.week && styles.activePerBtn}
                                    onClick={() => setPeriodType(PERIOD_TYPES.week)}
                                >
                                    Week
                                </button>
                                <button
                                    type="button"
                                    className={periodType === PERIOD_TYPES.month && styles.activePerBtn}
                                    onClick={() => setPeriodType(PERIOD_TYPES.month)}
                                >
                                    Month
                                </button>
                            </article>
                        </article>
                        <section className={styles.schedulerWrapper}>
                            <article style={{ textAlign: "center" }}>Homes</article>
                            <SchedulerHeader periodType={periodType} />
                            {homesWithMeetings.map((homeWithMeetings, hIndex) => {
                                return (
                                    <Fragment key={homeWithMeetings.id}>
                                        <article
                                            style={{
                                                gridColumn: "1",
                                                gridRowStart: `${2 + hIndex}`,
                                                background: "lightgreen",
                                                textAlign: "center",
                                            }}
                                        >
                                            {homeWithMeetings.title}
                                        </article>
                                        {homeWithMeetings.home_meetings.map((meeting, mIndex) => {
                                            const startTime = meeting.startDateTime.hour;

                                            const endTime = meeting.endDateTime.hour;

                                            const isStartTimeInPeriod = meeting.startDateTime.hasSame(selectedPeriod, "day");
                                            const isEndTimeInPeriod = meeting.endDateTime.hasSame(selectedPeriod, "day");

                                            if (!isStartTimeInPeriod && !isEndTimeInPeriod) return;

                                            const frameType =
                                                isStartTimeInPeriod && isEndTimeInPeriod ? "full" : isStartTimeInPeriod ? "end" : "start";
                                            return (
                                                <TimeFrame
                                                    key={meeting.id}
                                                    id={meeting.id}
                                                    handleDragEnd={handleDragEnd}
                                                    handleDragStart={handleDragStart}
                                                    startTime={startTime}
                                                    endTime={endTime}
                                                    index={mIndex}
                                                    frameText={meeting.meeting_partner_names}
                                                    frameType={frameType}
                                                />
                                            );
                                        })}

                                        {Array.from({ length: 24 }, (_, i) => (
                                            <article
                                                key={`cell-${hIndex}-${i}`}
                                                style={{
                                                    gridColumn: `${i + 2} / ${i + 3}`,
                                                    gridRowStart: `${2 + hIndex}`,
                                                    zIndex: 0,
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