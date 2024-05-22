export enum PeriodTypeEnum {
    day = "day",
    week = "week",
    month = "month",
}

export type Period = PeriodTypeEnum.day | PeriodTypeEnum.month | PeriodTypeEnum.week;
