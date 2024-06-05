import { Fragment } from "react";
import { DateTime } from "luxon"

import TimeFrame from "./TimeFrame";
import { PERIOD_TYPES } from "../../utils/enums";
import { BodyFactoryProps, BodyProps, MonthDaysFrameProps, WeekDaysFrameProps } from "@/types/components";

const WeekDaysFrame = ({ id, handleDragEnd, handleDragStart, startDateWeekdayNum, endDateWeekdayNum, index, frameText }: WeekDaysFrameProps) => {
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

const MonthDaysFrame = ({ id, handleDragEnd, handleDragStart, startDate, endDate, index, frameText }: MonthDaysFrameProps) => {
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
    currentDate,
    handleDragEnd,
    handleDragStart,
    handleDrop,
}: BodyProps) => {
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
    };

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
                    {resourceWithFrames.timeFrames.map((timeFrame) => {
                        const startTime = timeFrame.startDateTime.hour;

                        const endTime = timeFrame.endDateTime.hour;

                        const isStartTimeInPeriod = timeFrame.startDateTime.hasSame(currentDate, "day");
                        const isEndTimeInPeriod = timeFrame.endDateTime.hasSame(currentDate, "day");


                        if (!isStartTimeInPeriod && !isEndTimeInPeriod) return;

                        const frameType =
                            isStartTimeInPeriod && isEndTimeInPeriod ? "full" : isStartTimeInPeriod ? "end" : "start";
                        return (
                            <TimeFrame
                                key={timeFrame.id}
                                id={timeFrame.id}
                                handleDragEnd={handleDragEnd}
                                handleDragStart={handleDragStart}
                                startTime={startTime}
                                endTime={endTime}
                                index={rIndex}
                                frameText={timeFrame.text}
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
                        />
                    ))}
                </Fragment>
            );
        })
    )
}

const checkisInSameWeek = (dateToCheck: DateTime, referenceDate: DateTime) => {
    const startOfWeek = referenceDate.startOf('week')
    const endOfWeek = referenceDate.endOf('week')

    return dateToCheck >= startOfWeek && dateToCheck <= endOfWeek
}

const WeekDaysBody = ({
    resourcesWithFrames,
    currentDate,
    handleDragEnd,
    handleDragStart,
    handleDrop,
}: BodyProps) => {
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
    };

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
                    {resourceWithFrames.timeFrames.map((timeFrame) => {
                        const startDateTime = timeFrame.startDateTime
                        const endDateTime = timeFrame.endDateTime

                        const isInSameWeek = checkisInSameWeek(startDateTime, currentDate)
                        if (!isInSameWeek) return;

                        const startDateWeekdayNum = startDateTime.weekday - 1
                        const endDateWeekdayNum = endDateTime.weekday
                       

                        return (
                            <WeekDaysFrame
                                key={timeFrame.id}
                                id={timeFrame.id}
                                handleDragEnd={handleDragEnd}
                                handleDragStart={handleDragStart}
                                startDateWeekdayNum={startDateWeekdayNum}
                                endDateWeekdayNum={endDateWeekdayNum}
                                index={rIndex}
                                frameText={timeFrame.text}
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
                        />
                    ))}
                </Fragment>
            );
        })
    )
}

const checkIsInSameMonthAndYear = (date1: DateTime, date2: DateTime) => {
    return date1.year === date2.year && date1.month === date2.month;
}

const MonthBody = ({
    resourcesWithFrames,
    currentDate,
    handleDragEnd,
    handleDragStart,
    handleDrop,
}: BodyProps) => {
    const monthDays = currentDate.daysInMonth

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
    };

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
                    {resourceWithFrames.timeFrames.map((timeFrame) => {
                        const startDateTime = timeFrame.startDateTime
                        const endDateTime = timeFrame.endDateTime

                        const isInSameMonth = checkIsInSameMonthAndYear(startDateTime, currentDate)
                        if (!isInSameMonth) return;

                        const startDate = startDateTime.day - 1
                        const endDate = endDateTime.day
                       

                        return (
                            <MonthDaysFrame
                                key={timeFrame.id}
                                id={timeFrame.id}
                                handleDragEnd={handleDragEnd}
                                handleDragStart={handleDragStart}
                                startDate={startDate}
                                endDate={endDate}
                                index={rIndex}
                                frameText={timeFrame.text}
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
    currentDate,
    handleDragEnd,
    handleDragStart,
    handleDrop,
}: BodyFactoryProps) => {
    if (periodType === PERIOD_TYPES.day) {
        return (
            <HoursBody
                resourcesWithFrames={resourcesWithFrames}
                currentDate={currentDate}
                handleDragEnd={handleDragEnd}
                handleDragStart={handleDragStart}
                handleDrop={handleDrop}
            />
        )
    }
    if (periodType === PERIOD_TYPES.week) {
        return (
            <WeekDaysBody
                resourcesWithFrames={resourcesWithFrames}
                currentDate={currentDate}
                handleDragEnd={handleDragEnd}
                handleDragStart={handleDragStart}
                handleDrop={handleDrop}
            />
        )
    }
    if (periodType === PERIOD_TYPES.month) {
        return (
            <MonthBody
                resourcesWithFrames={resourcesWithFrames}
                currentDate={currentDate}
                handleDragEnd={handleDragEnd}
                handleDragStart={handleDragStart}
                handleDrop={handleDrop}
            />
        )
    }
    return null
}

export default SchedulerBody;