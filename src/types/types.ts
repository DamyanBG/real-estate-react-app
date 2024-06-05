import { DateTime } from "luxon";

export enum PeriodTypeEnum {
    day = "day",
    week = "week",
    month = "month",
}

export type Period = PeriodTypeEnum.day | PeriodTypeEnum.month | PeriodTypeEnum.week;

export interface DraggedInfo {
    meetingId: string;
    draggedFrame: number;
}

export type DraggedInfoRef = DraggedInfo | null;

export type TimeFrameData = {
    id: string | number;
    startDateTime: DateTime;
    endDateTime: DateTime;
    text: string;
};

export type ResourceWithFrames = {
    id: string | number;
    title: string;
    timeFrames: Array<TimeFrameData>;
};

export type ResourcesWithFrames = Array<ResourceWithFrames>