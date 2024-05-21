const customOptions = { weekday: "long", year: "numeric", month: "long", day: "numeric" };

const PeriodSelect = ({ styles, selectedPeriod, handlePrevioustPeriodClick, handleNextPeriodClick }) => {
    return (
        <article>
            <button type="button" onClick={handlePrevioustPeriodClick}>
                &larr;
            </button>
            <span className={styles.periodText}>{selectedPeriod.toLocaleString(customOptions)}</span>
            <button type="button" onClick={handleNextPeriodClick}>
                &rarr;
            </button>
        </article>
    );
};

export default PeriodSelect;
