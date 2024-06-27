/* this code snippit was copied from the
'Moments' walkthroguh project */

import jwtDecode from "jwt-decode";

export const setTokenTimestamp = (data) => {
    const refreshTokenTimeStamp = jwtDecode(data?.refresh_token).exp;
    console.log("Refresh token timestamp: ", refreshTokenTimeStamp);
    localStorage.setItem("refreshTokenTimestamp", refreshTokenTimeStamp)
};

export const shouldRefreshToken = () => {
    if (localStorage.refreshTokenTimeStamp) {
        return parseInt(localStorage.refreshTokenTimeStamp) > Math.floor(Date.now() / 1000);
    }

    return false;
};

export const removeTokenTimestamp = () => {
    localStorage.removeItem('refreshTokenTimeStamp')
};