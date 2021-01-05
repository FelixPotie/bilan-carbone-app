
export const LOGIN_ADMIN_SUCCESS = "LOGIN_ADMIN_SUCCESS";
export const LOGIN_ADMIN_FAILURE = "LOGIN_ADMIN_FAILURE";
export const LOGOUT_ADMIN = "LOGOUT_ADMIN";
export const LOAD_ADMIN = "LOAD_ADMIN"

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

export type AdminActionTypes = loginUAdminSucess | loginAdminFailure | logoutAdmin | loadAdmin