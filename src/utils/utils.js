export const createUserPostBody = (userInfo) => {
    return {
        first_name: userInfo.first_name,
        last_name: userInfo.last_name,
        email: userInfo.email,
        phone_number: userInfo.phone_number,
        password: userInfo.password,
    };
};

export const combineMessages = (currentUserMessages, partnerMessages) => {
    const modifiedParterMessages = partnerMessages.map((m) => ({
        ...m,
        isCurrent: false,
    }));
    const modifiedCurrUserMessages = currentUserMessages.map((m) => ({
        ...m,
        isCurrent: true,
    }));
    const combinedMessages = modifiedCurrUserMessages.concat(
        modifiedParterMessages
    );
    return combinedMessages;
};

export const HOURS = [
    { text: "12AM", hour: 0 },
    { text: "1AM", hour: 1 },
    { text: "2AM", hour: 2 },
    { text: "3AM", hour: 3 },
    { text: "4AM", hour: 4 },
    { text: "5AM", hour: 5 },
    { text: "6AM", hour: 6 },
    { text: "7AM", hour: 7 },
    { text: "8AM", hour: 8 },
    { text: "9AM", hour: 9 },
    { text: "10AM", hour: 10 },
    { text: "11AM", hour: 11 },
    { text: "12PM", hour: 12 },
    { text: "1PM", hour: 13 },
    { text: "2PM", hour: 14 },
    { text: "3PM", hour: 15 },
    { text: "4PM", hour: 16 },
    { text: "5PM", hour: 17 },
    { text: "6PM", hour: 18 },
    { text: "7PM", hour: 19 },
    { text: "8PM", hour: 20 },
    { text: "9PM", hour: 21 },
    { text: "10PM", hour: 22 },
    { text: "11PM", hour: 23 },
];

export const WEEK_DAYS = [
    { text: "Monday", value: "Monday" },
    { text: "Tuesday", value: "Tuesday" },
    { text: "Wednesday", value: "Wednesday" },
    { text: "Thursday", value: "Thursday" },
    { text: "Friday", value: "Friday" },
    { text: "Saturday", value: "Saturday" },
    { text: "Sunday", value: "Sunday" },
]