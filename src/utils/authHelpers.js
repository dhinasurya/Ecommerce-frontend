let accessToken = null;

export const setAccessToken = (token) => {
    accessToken = token;
    localStorage.setItem("access_token", token);
};

export const getAccessToken = () => {
    if (!accessToken) {
        accessToken = localStorage.getItem("access_token");
    }
    return accessToken;
}

export const clearAuth = () => {
    accessToken = null;
    localStorage.removeItem("access_token");
};