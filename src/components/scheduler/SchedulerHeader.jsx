import { PERIOD_TYPES } from "../../utils/enums";
import { HOURS, WEEK_DAYS } from "../../utils/utils";

const HoursHeader = () =>
    HOURS.map((hour) => (
        <article key={`id-${hour.text}`} style={{ textAlign: "center" }}>
            {hour.text}
        </article>
    ));

const WeekDaysHeader = () =>
    WEEK_DAYS.map((weekDay) => (
        <article key={`id-${weekDay.text}`} style={{ textAlign: "center" }}>
            {weekDay.text}
        </article>
    ));

const SchedulerHeader = ({ periodType }) => {
    if (periodType === PERIOD_TYPES.day) {
        return <HoursHeader />;
    }
    if (periodType === PERIOD_TYPES.week) {
        return <WeekDaysHeader />;
    }
    if (periodType === PERIOD_TYPES.day) {
        return HOURS.map((hour) => (
            <article key={`id-${hour.text}`} style={{ textAlign: "center" }}>
                {hour.text}
            </article>
        ));
    }
};

export default SchedulerHeader;
