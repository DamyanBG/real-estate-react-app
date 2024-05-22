import { Fragment } from "react";

import TimeFrame from "./TimeFrame";
import { PERIOD_TYPES } from "../../utils/enums";

const WeekDaysFrame = ({ id, handleDragEnd, handleDragStart, startDateWeekdayNum, endDateWeekdayNum, index, frameText }) => {
    const frames = endDateWeekdayNum - startDateWeekdayNum;
    const gridColumnValue = `${startDateWeekdayNum + 2} / ${endDateWeekdayNum + 2}`

    return (
        <article
            draggable
            onDragStart={handleDragStart(id, frames)}
            onDragEnd={handleDragEnd}
            style={{
                gridColumn: gridColumnValue,
                gridRowStart: `${2 + index}`,
                background: "lightblue",
                zIndex: 1,
            }}
            className="timeFrame"
        >
            {frameText}
        </article>
    );
};

const MonthDaysFrame = ({ id, handleDragEnd, handleDragStart, startDate, endDate, index, frameText }) => {
    const frames = endDate - startDate;
    const gridColumnValue = `${startDate + 2} / ${endDate + 2}`

    return (
        <article
            draggable
            onDragStart={handleDragStart(id, frames)}
            onDragEnd={handleDragEnd}
            style={{
                gridColumn: gridColumnValue,
                gridRowStart: `${2 + index}`,
                background: "lightblue",
                zIndex: 1,
                whiteSpace: "nowrap",
                overflowX: "hidden",
                textOverflow: "ellipsis",
                fontSize: "14px",
                lineHeight: "24px"
            }}
            className="timeFrame"
        >
            {frameText}
        </article>
    );
};

const HoursBody = ({
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
                            background: "#7ac9d7",
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

                        const startDateWeekdayNum = startDateTime.weekday - 1
                        const endDateWeekdayNum = endDateTime.weekday
                       

                        return (
                            <WeekDaysFrame
                                key={meeting.id}
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
                            onDrop={handleDrop(i + 1)}
                            onClick={handleCellClick}
                        />
                    ))}
                </Fragment>
            );
        })
    )
}

const checkIsInSameMonthAndYear = (date1, date2) => {
    return date1.year === date2.year && date1.month === date2.month;
}

const MonthBody = ({
    resourcesWithFrames,
    selectedPeriod,
    handleDragEnd,
    handleDragStart,
    handleDragOver,
    handleDrop,
    handleCellClick
}) => {
    const monthDays = selectedPeriod.daysInMonth

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

                        const isInSameMonth = checkIsInSameMonthAndYear(startDateTime, selectedPeriod)
                        if (!isInSameMonth) return;

                        const startDate = startDateTime.day - 1
                        const endDate = endDateTime.day
                       

                        return (
                            <MonthDaysFrame
                                key={meeting.id}
                                id={meeting.id}
                                handleDragEnd={handleDragEnd}
                                handleDragStart={handleDragStart}
                                startDate={startDate}
                                endDate={endDate}
                                index={rIndex}
                                frameText={meeting.meeting_partner_names}
                            />
                        );
                    })}

                    {Array.from({ length: monthDays }, (_, i) => (
                        <article
                            key={`cell-${rIndex}-${i}`}
                            style={{
                                gridColumn: `${i + 2} / ${i + 3}`,
                                gridRowStart: `${2 + rIndex}`,
                                zIndex: 0,
                            }}
                            onDragOver={handleDragOver}
                            onDrop={handleDrop(i + 1)}
                            onClick={handleCellClick}
                        />
                    ))}
                </Fragment>
            );
        })
    )
}

const SchedulerBody = ({
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
    if (periodType === PERIOD_TYPES.month) {
        return (
            <MonthBody
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