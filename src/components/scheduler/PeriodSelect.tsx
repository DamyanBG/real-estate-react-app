import { PERIOD_TYPES } from "../../utils/enums";
import { MONTHS } from "../../utils/utils";

const customOptions = { weekday: "long", year: "numeric", month: "long", day: "numeric" };

const formatWeekBtnText = (dateObj) => {
    const weekNumber = dateObj.weekNumber;
    const year = dateObj.year;

    const suffies = ["th", "st", "nd", "rd"];
    const relevantDigits = weekNumber % 100;
    const suffix = relevantDigits >= 11 && relevantDigits <= 13 ? "th" : suffies[weekNumber % 10] || "th";

    return `${weekNumber}${suffix} Week of ${year}`;
};

const PeriodSelect = ({ selectedPeriod, periodType, handlePrevioustPeriodClick, handleNextPeriodClick }) => {
    const btnText =
        periodType === PERIOD_TYPES.day
            ? selectedPeriod.toLocaleString(customOptions)
            : periodType === PERIOD_TYPES.week
            ? formatWeekBtnText(selectedPeriod)
            : `${MONTHS[selectedPeriod.month - 1].text} ${selectedPeriod.year}`;

    return (
        <article>
            <button type="button" onClick={handlePrevioustPeriodClick}>
                &larr;
            </button>
            <span
                style={{
                    paddingLeft: "6px",
                    paddingRight: "6px",
                }}
            >
                {btnText}
            </span>
            <button type="button" onClick={handleNextPeriodClick}>
                &rarr;
            </button>
        </article>
    );
};

export default PeriodSelect;
