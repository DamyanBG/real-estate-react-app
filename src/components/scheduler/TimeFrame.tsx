import { TimeFrameFactoryProps, TimeFrameProps } from "@/types/components";

const FullFrame = ({ id, handleDragEnd, handleDragStart, startTime, endTime, index, frameText }: TimeFrameProps) => {
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
                whiteSpace: "nowrap",
                overflowX: "hidden",
                textOverflow: "ellipsis",
                fontSize: "12px",
                lineHeight: "22px"
            }}
            className="timeFrame"
        >
            {frameText}
        </article>
    );
};

const StartFrame = ({ id, handleDragEnd, handleDragStart, startTime, endTime, index, frameText }: TimeFrameProps) => {
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
                whiteSpace: "nowrap",
                overflowX: "hidden",
                textOverflow: "ellipsis",
                fontSize: "12px",
                lineHeight: "22px"
            }}
            className="startTimeFrame"
        >
            {frameText}
        </article>
    );
};

const EndFrame = ({ id, handleDragEnd, handleDragStart, startTime, endTime, index, frameText }: TimeFrameProps) => {
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
                whiteSpace: "nowrap",
                overflowX: "hidden",
                textOverflow: "ellipsis",
                fontSize: "12px",
                lineHeight: "22px"
            }}
            className="endTimeFrame"
        >
            {frameText}
        </article>
    );
};

const TimeFrame = ({ id, handleDragEnd, handleDragStart, startTime, endTime, index, frameText, frameType }: TimeFrameFactoryProps) => {
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
        />
    );
};

export default TimeFrame