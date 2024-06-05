import React, { useContext, useEffect, useState, useRef } from "react";
import { DateTime } from "luxon";

import { getUserMeetings } from "../api/meetingApi";
import { UserContext } from "../context/UserProvider";

import styles from "./scheduler.module.scss";
import { PERIOD_TYPES } from "@/utils/enums";
import { DraggedInfoRef, Period, PeriodTypeEnum, ResourcesWithFrames } from "@/types/types";
// import Scheduler from "@/components/scheduler/Scheduler";

import { Scheduler } from "react-simple-resources-scheduler";
import "react-simple-resources-scheduler/dist/scheduler.css"
// import "./scheduler.css"


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
    const [currentDate, setCurrentDate] = useState<DateTime>(today);
    const [periodType, setPeriodType] = useState<Period>(PeriodTypeEnum.day);
    const draggedMeetingInfoRef = useRef<DraggedInfoRef>(null);

    const resourcesWithFrames: ResourcesWithFrames = homesWithMeetings.map((homeWithMeeting => ({
        id: homeWithMeeting.id,
        title: homeWithMeeting.title,
        timeFrames: homeWithMeeting.home_meetings.map((homeMeeting) => ({
            id: homeMeeting.id,
            startDateTime: homeMeeting.startDateTime,
            endDateTime: homeMeeting.endDateTime,
            text: homeMeeting.meeting_partner_names
        }))
    })))

    console.log(homesWithMeetings)

    const gridTemplateColumnsValue = periodType === PERIOD_TYPES.day
        ? "2fr repeat(24, 1fr)"
        : periodType === PERIOD_TYPES.week
            ? "2fr repeat(7, 1fr)"
            : defineMonthGridColumnsValue(currentDate)

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

    const handleDrop = (i: number) => (e: React.DragEvent<HTMLDivElement>) => {
        console.log(i)
        if (periodType === PERIOD_TYPES.day) {
            const { meetingId, draggedFrame } = draggedMeetingInfoRef.current;
            const newHomeWithMeetingsState = homesWithMeetings.map((hm) => ({
                ...hm,
                home_meetings: hm.home_meetings.map((meeting) => {
                    if (meeting.id === meetingId) {
                        const droppedOnHour = i;
                        const isStartTimeInPeriod = meeting.startDateTime.hasSame(currentDate, "day");
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

    const handleDragStart = (meetingId: string | number, frames: number) => (e: React.DragEvent<HTMLDivElement>) => {
        setTimeout(() => {
            (e.target as Element).classList.add(styles.hiddenFrame);
        }, 0);
        e.dataTransfer.effectAllowed = "move";
        const relativeX = e.nativeEvent.offsetX;
        const elWidth = (e.target as Element).clientWidth;

        const frameWidth = elWidth / frames;
        const draggedFrame = Math.floor(relativeX / frameWidth);
        const draggedInfo = {
            meetingId,
            draggedFrame,
        };
        draggedMeetingInfoRef.current = draggedInfo;
    };

    const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        draggedMeetingInfoRef.current = null;
        (e.target as Element).classList.remove(styles.hiddenFrame);
    };
 
    const handleDateChange = (newDate: DateTime) => {
        setCurrentDate(newDate);
    }

    const handlePeriodTypeChange = (newPeriodType) => {
        setPeriodType(newPeriodType)
    }

    return (
        <section className={styles.schedulerContainer}>
            <section className={styles.schedulerRow}>
                <Scheduler
                    currentDate={currentDate}
                    periodType={periodType}
                    handleDateChange={handleDateChange}
                    handlePeriodTypeChange={handlePeriodTypeChange}
                    gridTemplateColumnsValue={gridTemplateColumnsValue}
                    resourcesWithFrames={resourcesWithFrames}
                    handleDragEnd={handleDragEnd}
                    handleDragStart={handleDragStart}
                    handleDrop={handleDrop}
                />
                {/* <section className={styles.meetingsTable}>
                    <h2>Meetings List</h2>
                </section> */}
            </section>
        </section>
    );
};

export default MeetingsScheduler;
