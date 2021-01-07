
export const LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS";
export const LOGIN_USER_FAILURE = "LOGIN_USER_FAILURE";
export const LOGOUT_USER = "LOGOUT_USER";
export const LOAD_USER = "LOAD_USER"

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

interface loadUser{
    type: typeof LOAD_USER,
    payload: any
}

export type UserActionTypes = loginUserSucess | loginUserFailure | logoutUser | loadUser