import { PERIOD_TYPES } from "@/utils/enums";
import PeriodSelect from "./PeriodSelect"
import SchedulerBody from "./SchedulerBody";
import SchedulerHeader from "./SchedulerHeader";
import { PeriodTypeEnum } from "@/types/types";
import { PeriodToggleBtn } from "@evolved/react-simple-scheduler"
import "./scheduler.css"

const Scheduler: React.FC = ({
    selectedPeriod,
    periodType,
    handlePrevioustPeriodClick,
    handleNextPeriodClick,
    handlePeriodTypeChange,
    gridTemplateColumnsValue,
    homesWithMeetings,
    handleDragEnd,
    handleDragStart,
    handleDragOver,
    handleDrop,
    handleCellClick,
}) => {
    
    return (
        <section
            style={{
                width: "100%",
                background: "#EDE8F5",
                border: "1px solid #333"
            }}
        >
            <h2>Scheduler</h2>
            <section>
                <article
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        padding: "12px 24px",
                    }}
                >
                    <PeriodSelect
                        selectedPeriod={selectedPeriod}
                        periodType={periodType}
                        handlePrevioustPeriodClick={handlePrevioustPeriodClick}
                        handleNextPeriodClick={handleNextPeriodClick}
                    />
                    <article
                        style={{
                            minWidth: "350px",
                            display: "flex",
                            justifyContent: "space-between",
                        }}  
                    >
                        {/* <button
                            type="button"
                            className={periodType === PERIOD_TYPES.day ? "activePerBtn" : "periodButton"}
                            onClick={() => handlePeriodTypeChange(PERIOD_TYPES.day)}
                        >
                            Day
                        </button> */}
                        <PeriodToggleBtn
                            periodType={periodType}
                            btnPeriodType={PeriodTypeEnum.day}
                            onPeriodChange={handlePeriodTypeChange}
                        />
                        <PeriodToggleBtn
                            periodType={periodType}
                            btnPeriodType={PeriodTypeEnum.week}
                            onPeriodChange={handlePeriodTypeChange}
                        />
                        <PeriodToggleBtn
                            periodType={periodType}
                            btnPeriodType={PeriodTypeEnum.month}
                            onPeriodChange={handlePeriodTypeChange}
                        />
                    </article>
                </article>
                <section 
                    className="schedulerWrapper"
                    style={{
                        display: "grid",
                        gridTemplateColumns: gridTemplateColumnsValue,
                        gridAutoRows: "24px",
                        overflowX: periodType === PERIOD_TYPES.month ? "scroll" : "auto"
                    }}
                >
                    <article style={{ textAlign: "center" }}>Homes</article>
                    <SchedulerHeader periodType={periodType} selectedPeriod={selectedPeriod} />
                    <SchedulerBody
                        periodType={periodType}
                        resourcesWithFrames={homesWithMeetings}
                        selectedPeriod={selectedPeriod}
                        handleDragEnd={handleDragEnd}
                        handleDragStart={handleDragStart}
                        handleDragOver={handleDragOver}
                        handleDrop={handleDrop}
                        handleCellClick={handleCellClick}
                    />
                </section>
            </section>
        </section>
    )
}

export default Scheduler;