import { Fragment } from "react";

import TimeFrame from "./TimeFrame";
import { PERIOD_TYPES } from "../../utils/enums";

const FullFrame = ({ styles, id, handleDragEnd, handleDragStart, startTime, endTime, index, frameText }) => {
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
                    {resourceWithFrames.home_meetings.map((meeting, mIndex) => {
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
                                styles={styles}
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
                    {resourceWithFrames.home_meetings.map((meeting, mIndex) => {
                        const startTime = meeting.startDateTime.hour;

                        const endTime = meeting.endDateTime.hour;

                        const isStartTimeInPeriod = meeting.startDateTime.hasSame(selectedPeriod, "day");
                        const isEndTimeInPeriod = meeting.endDateTime.hasSame(selectedPeriod, "day");

                        if (!isStartTimeInPeriod && !isEndTimeInPeriod) return;

                        const frameType =
                            isStartTimeInPeriod && isEndTimeInPeriod ? "full" : isStartTimeInPeriod ? "end" : "start";
                        return (
                            <FullFrame
                                key={meeting.id}
                                styles={styles}
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