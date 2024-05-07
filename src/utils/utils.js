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
