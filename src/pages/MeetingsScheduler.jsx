import { useContext, useEffect, useState, Fragment } from "react";

import { getUserMeetings } from "../api/meetingApi";
import { UserContext } from "../context/UserProvider";

import styles from "./scheduler.module.scss";

const today = new Date().toDateString();

const mockMeetings = [
    {
        id: "25",
        invitor_id: "1",
        home_id: "25",
        start_time: '00:10:00',
        end_time: '02:10:00',
        meeting_partner_names: "Hristofor Konstantinov"
    },
    {
        id: "27",
        invitor_id: "1",
        home_id: "30",
        start_time: '03:10:00',
        end_time: '06:10:00',
        meeting_partner_names: "Daniel Petkov"
    },
]

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
    const [currentPeriod, setCurrentPeriod] = useState(today);

    useEffect(() => {
        if (!user.token) return;
        const loadMeetings = async () => {
            const loadedMeetings = await getUserMeetings(user.token);
            setMeetings([...mockMeetings, ...loadedMeetings]);
        };

        loadMeetings();

    }, [user.token]);

    console.table(meetings);

    return (
        <section className={styles.schedulerContainer}>
            <section className={styles.schedulerRow}>
                <section className={styles.scheduler}>
                    <h2>Scheduler</h2>
                    <section>
                        <article className={styles.periodRow}>
                            <article>{currentPeriod}</article>
                            <article>
                                <button type="button">Day</button>
                                <button type="button">Week</button>
                                <button type="button">Month</button>
                            </article>
                        </article>
                        <section className={styles.schedulerWrapper}>
                                <article>Homes</article>
                                {HOURS.map((hour) => (
                                    <article key={`id-${hour.text}`}>
                                        {hour.text}
                                    </article>
                                ))}
                                {meetings.map((meeting, index) => {
                                    console.log(meeting.start_time);
                                    console.log(typeof meeting.start_time);
                                    const startDateTime = new Date(
                                        "2000-01-01T" + meeting.start_time
                                    );
                                    const startTime = startDateTime.getHours();
                                    console.log(startTime);

                                    const endDateTime = new Date(
                                        "2000-01-01T" + meeting.end_time
                                    );
                                    const endTime = endDateTime.getHours();
                                    console.log("endTime");
                                    console.log(endTime);

                                    return (
                                            <Fragment key={meeting.id}>
                                                <article style={{ gridColumn: "1", gridRowStart: `${2 + index}`, background: "lightgreen", textAlign: "center" }}>
                                                    {meeting.home_id}
                                                </article>
                                                <article style={{ gridColumn: `${startTime + 2} / ${endTime + 3}`, gridRowStart: `${2 + index}`, background: "lightblue" }} className={styles.timeFrame}>
                                                    {meeting.meeting_partner_names}
                                                </article>
                                            </Fragment>
                                    );
                                })}
                        </section>
                    </section>
                </section>
                <section className={styles.meetingsTable}>
                    <h2>Meetings List</h2>
                </section>
            </section>
        </section>
    );
};

export default MeetingsScheduler;
