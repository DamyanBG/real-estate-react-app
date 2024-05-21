import { Fragment } from "react";

import TimeFrame from "./TimeFrame";
import { PERIOD_TYPES } from "../../utils/enums";

const WeekDaysFrame = ({ styles, id, handleDragEnd, handleDragStart, startDateWeekdayNum, endDateWeekdayNum, index, frameText }) => {
    const frames = endDateWeekdayNum - startDateWeekdayNum;

    return (
        <article
            draggable
            onDragStart={handleDragStart(id, frames)}
            onDragEnd={handleDragEnd}
            style={{
                gridColumn: `${endDateWeekdayNum + 2} / ${startDateWeekdayNum + 2}`,
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

const HoursBody = ({
    styles,
    resourcesWithFrames,
    selectedPeriod,
    handleDragEnd,
    handleDragStart,
    handleDragOver,
    handleDrop,
    handleCellClick
}) => {
    return (
        resourcesWithFrames.map((resourceWithFrames, rIndex) => {
            return (
                <Fragment key={resourceWithFrames.id}>
                    <article
                        style={{
                            gridColumn: "1",
                            gridRowStart: `${2 + rIndex}`,
                            background: "lightgreen",
                            textAlign: "center",
                        }}
                    >
                        {resourceWithFrames.title}
                    </article>
                    {resourceWithFrames.home_meetings.map((meeting) => {
                        const startTime = meeting.startDateTime.hour;

                        const endTime = meeting.endDateTime.hour;

                        const isStartTimeInPeriod = meeting.startDateTime.hasSame(selectedPeriod, "day");
                        const isEndTimeInPeriod = meeting.endDateTime.hasSame(selectedPeriod, "day");

                        console.log(resourceWithFrames.title)

                        if (!isStartTimeInPeriod && !isEndTimeInPeriod) return;
                        console.log("passed")
                        console.log(resourceWithFrames.title)

                        const frameType =
                            isStartTimeInPeriod && isEndTimeInPeriod ? "full" : isStartTimeInPeriod ? "end" : "start";
                        return (
                            <TimeFrame
                                key={meeting.id}
                                styles={styles}
                                id={meeting.id}
                                handleDragEnd={handleDragEnd}
                                handleDragStart={handleDragStart}
                                startTime={startTime}
                                endTime={endTime}
                                index={rIndex}
                                frameText={meeting.meeting_partner_names}
                                frameType={frameType}
                            />
                        );
                    })}

                    {Array.from({ length: 24 }, (_, i) => (
                        <article
                            key={`cell-${rIndex}-${i}`}
                            style={{
                                gridColumn: `${i + 2} / ${i + 3}`,
                                gridRowStart: `${2 + rIndex}`,
                                zIndex: 0,
                            }}
                            onDragOver={handleDragOver}
                            onDrop={handleDrop(i)}
                            onClick={handleCellClick}
                        />
                    ))}
                </Fragment>
            );
        })
    )
}

const checkisInSameWeek = (dateToCheck, referenceDate) => {
    const startOfWeek = referenceDate.startOf('week')
    const endOfWeek = referenceDate.endOf('week')

    return dateToCheck >= startOfWeek && dateToCheck <= endOfWeek
}

const WeekDaysBody = ({
    styles,
    resourcesWithFrames,
    selectedPeriod,
    handleDragEnd,
    handleDragStart,
    handleDragOver,
    handleDrop,
    handleCellClick
}) => {
    return (
        resourcesWithFrames.map((resourceWithFrames, rIndex) => {
            return (
                <Fragment key={resourceWithFrames.id}>
                    <article
                        style={{
                            gridColumn: "1",
                            gridRowStart: `${2 + rIndex}`,
                            background: "lightgreen",
                            textAlign: "center",
                        }}
                    >
                        {resourceWithFrames.title}
                    </article>
                    {resourceWithFrames.home_meetings.map((meeting) => {
                        const startDateTime = meeting.startDateTime
                        const endDateTime = meeting.endDateTime

                        const isInSameWeek = checkisInSameWeek(startDateTime, selectedPeriod)
                        if (!isInSameWeek) return;

                        const startDateWeekdayNum = startDateTime.weekday
                        const endDateWeekdayNum = endDateTime.weekday

                        return (
                            <WeekDaysFrame
                                key={meeting.id}
                                styles={styles}
                                id={meeting.id}
                                handleDragEnd={handleDragEnd}
                                handleDragStart={handleDragStart}
                                startDateWeekdayNum={startDateWeekdayNum}
                                endDateWeekdayNum={endDateWeekdayNum}
                                index={rIndex}
                                frameText={meeting.meeting_partner_names}
                            />
                        );
                    })}

                    {Array.from({ length: 7 }, (_, i) => (
                        <article
                            key={`cell-${rIndex}-${i}`}
                            style={{
                                gridColumn: `${i + 2} / ${i + 3}`,
                                gridRowStart: `${2 + rIndex}`,
                                zIndex: 0,
                            }}
                            onDragOver={handleDragOver}
                            onDrop={handleDrop(i)}
                            onClick={handleCellClick}
                        />
                    ))}
                </Fragment>
            );
        })
    )
}

const SchedulerBody = ({
    styles,
    periodType,
    resourcesWithFrames,
    selectedPeriod,
    handleDragEnd,
    handleDragStart,
    handleDragOver,
    handleDrop,
    handleCellClick
}) => {
    if (periodType === PERIOD_TYPES.day) {
        return (
            <HoursBody
                styles={styles}
                resourcesWithFrames={resourcesWithFrames}
                selectedPeriod={selectedPeriod}
                handleDragEnd={handleDragEnd}
                handleDragStart={handleDragStart}
                handleDragOver={handleDragOver}
                handleDrop={handleDrop}
                handleCellClick={handleCellClick}
            />
        )
    }
    if (periodType === PERIOD_TYPES.week) {
        return (
            <WeekDaysBody
                styles={styles}
                resourcesWithFrames={resourcesWithFrames}
                selectedPeriod={selectedPeriod}
                handleDragEnd={handleDragEnd}
                handleDragStart={handleDragStart}
                handleDragOver={handleDragOver}
                handleDrop={handleDrop}
                handleCellClick={handleCellClick}
            />
        )
    }
    return null
}

export default SchedulerBody;