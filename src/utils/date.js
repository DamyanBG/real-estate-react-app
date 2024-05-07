export const formatDateTime = (datetime) => {
    const date = new Date(datetime);
    const currentDate = new Date();

    if (
        date.getDate() === currentDate.getDate() &&
        date.getMonth() === currentDate.getMonth() &&
        date.getFullYear() === currentDate.getFullYear()
    ) {
        return date.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        });
    } else {
        const dateStr = date.toLocaleTimeString([], {
            month: "short",
            day: "numeric",
        });
        const timeStr = date.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        });
        return `${dateStr} ${timeStr}`;
    }
};

export const sortByDateTime = (a, b) => {
    const dateA = new Date(a.created_on)
    const dateB = new Date(b.created_on)

    return dateA - dateB
}