export const LOGIN_ADMIN_SUCCESS = "LOGIN_ADMIN_SUCCESS";
export const LOGIN_ADMIN_FAILURE = "LOGIN_ADMIN_FAILURE";
export const LOGOUT_ADMIN = "LOGOUT_ADMIN";
export const LOAD_ADMIN = "LOAD_ADMIN";
export const GET_ADMINS_SUCCESS = "GET_ADMINS_SUCCESS";
export const GET_ADMINS_FAILURE = "GET_ADMINS_FAILURE";
export const ADD_ADMIN_SUCCESS = "ADD_ADMIN_SUCCESS";
export const ADD_ADMIN_FAILURE = "ADD_ADMIN_FAILURE";
export const DELETE_ADMIN_SUCCESS = "DELETE_ADMIN_SUCCESS";
export const DELETE_ADMIN_FAILURE = "DELETE_ADMIN_FAILURE";

interface loginUAdminSucess {
    type: typeof LOGIN_ADMIN_SUCCESS,
    payload: any
}

interface loginAdminFailure {
    type: typeof LOGIN_ADMIN_FAILURE,
    payload: any

}

interface logoutAdmin {
    type: typeof LOGOUT_ADMIN
}

interface loadAdmin{
    type: typeof LOAD_ADMIN,
    payload: any
}

interface getAdminsSuccess{
    type: typeof GET_ADMINS_SUCCESS,
    payload: any
}

interface getAdminsFailure{
    type: typeof GET_ADMINS_FAILURE,
    payload: any
}

interface addAdminSuccess {
    type: typeof ADD_ADMIN_SUCCESS,
}

interface addAdminFailure {
    type: typeof ADD_ADMIN_FAILURE,
    payload: any
}

interface deleteAdminSuccess {
    type: typeof DELETE_ADMIN_SUCCESS,
    payload: any
}

interface deleteAdminFailure {
    type: typeof DELETE_ADMIN_FAILURE,
    payload: any
}

export type AdminActionTypes = loginUAdminSucess | loginAdminFailure | logoutAdmin | loadAdmin | getAdminsSuccess | getAdminsFailure | addAdminSuccess | addAdminFailure | deleteAdminSuccess | deleteAdminFailure