import { DateTime } from "luxon"

import { Period, ResourcesWithFrames } from "./types";

export interface PeriodToggleBtnProps {
    periodType: Period;
    btnPeriodType: Period;
    onPeriodChange: (newPeriod: Period) => void;
}

export interface DateSelectProps {
    currentDate: DateTime;
    periodType: Period;
    onDateChange: (newDate: DateTime) => void;
}

export interface TimeFrameFactoryProps {
    id: string | number;
    handleDragEnd: (e: React.DragEvent<HTMLDivElement>) => void;
    handleDragStart: (meetingId: string | number, frames: number) => (e: React.DragEvent<HTMLDivElement>) => void;
    startTime: number;
    endTime: number;
    index: number;
    frameText: string;
    frameType: string;
}

export interface TimeFrameProps {
    id: string | number;
    handleDragEnd: (e: React.DragEvent<HTMLDivElement>) => void;
    handleDragStart: (meetingId: string | number, frames: number) => (e: React.DragEvent<HTMLDivElement>) => void;
    startTime: number;
    endTime: number;
    index:number ;
    frameText: string;
}

export interface WeekDaysFrameProps {
    id: string | number;
    handleDragEnd: (e: React.DragEvent<HTMLDivElement>) => void;
    handleDragStart: (meetingId: string | number, frames: number) => (e: React.DragEvent<HTMLDivElement>) => void;
    startDateWeekdayNum: number;
    endDateWeekdayNum: number;
    index:number ;
    frameText: string;
}

export interface MonthDaysFrameProps {
    id: string | number;
    handleDragEnd: (e: React.DragEvent<HTMLDivElement>) => void;
    handleDragStart: (meetingId: string | number, frames: number) => (e: React.DragEvent<HTMLDivElement>) => void;
    startDate: number;
    endDate: number;
    index:number ;
    frameText: string;
}

export interface BodyProps {
    resourcesWithFrames: ResourcesWithFrames;
    currentDate: DateTime;
    handleDragEnd: (e: React.DragEvent<HTMLDivElement>) => void;
    handleDragStart: (meetingId: string | number, frames: number) => (e: React.DragEvent<HTMLDivElement>) => void;
    handleDrop: (i: number) => (e: React.DragEvent<HTMLDivElement>) => void;
}

export interface BodyFactoryProps {
    periodType: Period;
    resourcesWithFrames: ResourcesWithFrames;
    currentDate: DateTime;
    handleDragEnd: (e: React.DragEvent<HTMLDivElement>) => void;
    handleDragStart: (meetingId: string | number, frames: number) => (e: React.DragEvent<HTMLDivElement>) => void;
    handleDrop: (i: number) => (e: React.DragEvent<HTMLDivElement>) => void;
}

export interface SchedulerProps {
    currentDate: DateTime;
    periodType: Period;
    handleDateChange: (newDate: DateTime) => void;
    handlePeriodTypeChange: (newPeriod: Period) => void;
    gridTemplateColumnsValue: string;
    resourcesWithFrames: ResourcesWithFrames;
    handleDragEnd: (e: React.DragEvent<HTMLDivElement>) => void;
    handleDragStart: (meetingId: string | number, frames: number) => (e: React.DragEvent<HTMLDivElement>) => void;
    handleDrop: (i: number) => (e: React.DragEvent<HTMLDivElement>) => void;
}