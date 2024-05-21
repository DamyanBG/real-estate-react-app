import { useContext, useEffect, useState, Fragment, useRef } from "react";
import { DateTime } from "luxon";

import { getUserMeetings } from "../api/meetingApi";
import { UserContext } from "../context/UserProvider";

import styles from "./scheduler.module.scss";
import { PERIOD_TYPES } from "../utils/enums";
import { HOURS, WEEK_DAYS } from "../utils/utils";
import SchedulerHeader from "../components/scheduler/SchedulerHeader";
import SchedulerBody from "../components/scheduler/SchedulerBody";
import PeriodSelect from "../components/scheduler/PeriodSelect";

const formatMeeting = (meeting) => {
    const formattedMeeting = {
        ...meeting,
        startDateTime: DateTime.fromISO(`${meeting.date}T${meeting.start_time}`),
        endDateTime: DateTime.fromISO(`${meeting.date}T${meeting.end_time}`),
    };
    return formattedMeeting;
};

const today = DateTime.local();

const MeetingsScheduler = () => {
    const [homesWithMeetings, setHomesWithMeetings] = useState([]);
    const { user } = useContext(UserContext);
    const [selectedPeriod, setSelectedPeriod] = useState(today);
    const [periodType, setPeriodType] = useState(PERIOD_TYPES.day);
    const draggedMeetingInfoRef = useRef(null);

    const gridTemplateColumnsValue = periodType === PERIOD_TYPES.day
        ? "2fr repeat(24, 1fr)"
        : periodType === PERIOD_TYPES.week
            ? "2fr repeat(7, 1fr)"
            : "2fr repeat(30, 1fr)"

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
                            <PeriodSelect
                                styles={styles}
                                selectedPeriod={selectedPeriod}
                                handlePrevioustPeriodClick={handlePrevioustPeriodClick}
                                handleNextPeriodClick={handleNextPeriodClick}
                            />
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
                        <section 
                            className={styles.schedulerWrapper}
                            style={{
                                display: "grid",
                                gridTemplateColumns: gridTemplateColumnsValue
                            }}
                        >
                            <article style={{ textAlign: "center" }}>Homes</article>
                            <SchedulerHeader periodType={periodType} />
                            <SchedulerBody
                                styles={styles}
                                periodType={periodType}
                                resourcesWithFrames={homesWithMeetings}
                                selectedPeriod={selectedPeriod}
                                handleDragEnd={handleDragEnd}
                                handleDragStart={handleDragStart}
                                handleDragOver={handleDragOver}
                                handleDrop={handleDrop}
                                handleCellClick={handleCellClick}
                            />
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
