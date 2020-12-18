
export const LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS";
export const LOGIN_USER_FAILURE = "LOGIN_USER_FAILURE";
export const LOGOUT_USER = "LOGOUT_USER";

interface loginUserSucess {
    type: typeof LOGIN_USER_SUCCESS,
    payload: any
}

interface loginUserFailure {
    type: typeof LOGIN_USER_FAILURE,
    payload: any

}

interface logoutUser {
    type: typeof LOGOUT_USER
}

export type UserActionTypes = loginUserSucess | loginUserFailure | logoutUser