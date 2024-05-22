import { Period } from "./types";

export interface PeriodToggleBtnProps {
    periodType: Period;
    btnPeriodType: Period;
    onPeriodChange: (newPeriod: Period) => void;
}