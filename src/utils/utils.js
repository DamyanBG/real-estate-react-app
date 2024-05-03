export const createUserPostBody = (userInfo) => {
    return {
        first_name: userInfo.first_name,
        last_name: userInfo.last_name,
        email: userInfo.email,
        phone: userInfo.phone,
        password: userInfo.password,
    };
};
