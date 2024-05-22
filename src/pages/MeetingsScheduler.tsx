import { useContext, useEffect, useState, Fragment, useRef } from "react";
import { DateTime } from "luxon";

import { getUserMeetings } from "../api/meetingApi";
import { UserContext } from "../context/UserProvider";

import styles from "./scheduler.module.scss";
import { HOURS, WEEK_DAYS } from "../utils/utils";
import SchedulerHeader from "../components/scheduler/SchedulerHeader";
import SchedulerBody from "../components/scheduler/SchedulerBody";
import PeriodSelect from "../components/scheduler/PeriodSelect";
import Scheduler from "@/components/scheduler/Scheduler";
import { PERIOD_TYPES } from "@/utils/enums";


const formatMeeting = (meeting) => {
    const formattedMeeting = {
        ...meeting,
        startDateTime: DateTime.fromISO(`${meeting.date}T${meeting.start_time}`),
        endDateTime: DateTime.fromISO(`${meeting.date}T${meeting.end_time}`),
    };
    return formattedMeeting;
};

const today = DateTime.local();

const defineMonthGridColumnsValue = (currentDate) => {
    const monthDays = currentDate.daysInMonth
    const gridColumnsValue = `200px repeat(${monthDays}, 100px)`
    return gridColumnsValue
}

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
            : defineMonthGridColumnsValue(selectedPeriod)

    useEffect(() => {
        if (!user.token) return;
        const loadMeetings = async () => {
            const loadedMeetings = await getUserMeetings(user.token);
            setHomesWithMeetings(
                loadedMeetings.map((home) => ({
                    ...home,
                    home_meetings: home.home_meetings.map(formatMeeting),
                }))
            );
        };

        loadMeetings();
    }, [user.token]);

    // console.table(homesWithMeetings);

    const handleDragOver = (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
    };

    const handleDrop = (i) => (e) => {
        console.log(i)
        if (periodType === PERIOD_TYPES.day) {
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
        }
        if (periodType === PERIOD_TYPES.week) {
            const { meetingId, draggedFrame } = draggedMeetingInfoRef.current;
            const newHomeWithMeetingsState = homesWithMeetings.map((hm) => ({
                ...hm,
                home_meetings: hm.home_meetings.map((meeting) => {
                    if (meeting.id === meetingId) {
                        const droppedOnWeekday = i;
                        const startWeekday = meeting.startDateTime.weekday
                        const draggedFromWeekday = startWeekday + draggedFrame;
                        const difference = droppedOnWeekday - draggedFromWeekday;

                        const newStartDateTime = meeting.startDateTime.plus({ day: difference });
                        const newEndDateTime = meeting.endDateTime.plus({ day: difference });

                        return {
                            ...meeting,
                            startDateTime: newStartDateTime,
                            endDateTime: newEndDateTime,
                        };
                    }
                    return meeting;
                })
            }))
            setHomesWithMeetings(newHomeWithMeetingsState);
        }
        if (periodType === PERIOD_TYPES.month) {
            const { meetingId, draggedFrame } = draggedMeetingInfoRef.current;
            const newHomeWithMeetingsState = homesWithMeetings.map((hm) => ({
                ...hm,
                home_meetings: hm.home_meetings.map((meeting) => {
                    if (meeting.id === meetingId) {
                        const droppedOnMonthDay = i;
                        console.log(droppedOnMonthDay)
                        const startMonthDay = meeting.startDateTime.day
                        console.log(startMonthDay)
                        const draggedFromWeekday = startMonthDay + draggedFrame;
                        const difference = droppedOnMonthDay - draggedFromWeekday;
                        console.log(difference)

                        const newStartDateTime = meeting.startDateTime.plus({ day: difference });
                        const newEndDateTime = meeting.endDateTime.plus({ day: difference });

                        console.log(newStartDateTime.day)
                        return {
                            ...meeting,
                            startDateTime: newStartDateTime,
                            endDateTime: newEndDateTime,
                        };
                    }
                    return meeting;
                })
            }))
            setHomesWithMeetings(newHomeWithMeetingsState);
        }
    };

    const handleDragStart = (meetingId, frames) => (e) => {
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
        if (periodType === PERIOD_TYPES.day) {
            const newPeriod = selectedPeriod.plus({ days: 1 });
            setSelectedPeriod(newPeriod);
            return
        }
        if (periodType === PERIOD_TYPES.week) {
            const newPeriod = selectedPeriod.plus({ days: 7 });
            setSelectedPeriod(newPeriod);
            return
        }
        const newPeriod = selectedPeriod.plus({ months: 1 });
        setSelectedPeriod(newPeriod);
    };

    const handlePrevioustPeriodClick = () => {
        if (periodType === PERIOD_TYPES.day) {
            const newPeriod = selectedPeriod.minus({ days: 1 });
            setSelectedPeriod(newPeriod);
            return
        }
        if (periodType === PERIOD_TYPES.week) {
            const newPeriod = selectedPeriod.minus({ days: 7 });
            setSelectedPeriod(newPeriod);
            return
        }
        const newPeriod = selectedPeriod.minus({ months: 1 });
        setSelectedPeriod(newPeriod);
    };

    const handlePeriodTypeChange = (newPeriodType) => {
        setPeriodType(newPeriodType)
    }

    return (
        <section className={styles.schedulerContainer}>
            <section className={styles.schedulerRow}>
                <Scheduler
                    selectedPeriod={selectedPeriod}
                    periodType={periodType}
                    handlePrevioustPeriodClick={handlePrevioustPeriodClick}
                    handleNextPeriodClick={handleNextPeriodClick}
                    handlePeriodTypeChange={handlePeriodTypeChange}
                    gridTemplateColumnsValue={gridTemplateColumnsValue}
                    homesWithMeetings={homesWithMeetings}
                    handleDragEnd={handleDragEnd}
                    handleDragStart={handleDragStart}
                    handleDragOver={handleDragOver}
                    handleDrop={handleDrop}
                    handleCellClick={handleCellClick}
                />
                {/* <section className={styles.meetingsTable}>
                    <h2>Meetings List</h2>
                </section> */}
            </section>
        </section>
    );
};

export default MeetingsScheduler;
