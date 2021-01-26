import React from 'react';
import { useTranslation } from 'react-i18next';
import { connect, ConnectedProps } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../../../redux';
import { logoutAdmin } from '../../../redux/admin/actions';
import { logoutUser } from '../../../redux/user/actions';


const mapState = (state: RootState, ownProps: any) => {
    return {
        user: state.user,
        classesName: ownProps.classesName,
        label: ownProps.label,
        admin: state.admin
    }
}

const mapDispatch = (dispatch:any) => {
    return {
        logoutUser : () => dispatch(logoutUser()),
        logoutAdmin : () => dispatch(logoutAdmin())
    }
}

const connector = connect(mapState, mapDispatch)
type PropsFromRedux = ConnectedProps<typeof connector>
type Props = PropsFromRedux

function SignInOutButton(props: Props) {
    const  {t} = useTranslation();

    return (props.label==="admin" && props.admin.isLoggedIn) ?(
        <Link
            className={props.classesName}
            onClick={() => props.logoutAdmin()}
            to='/admin'
            >
            {t("SIGNOUT")}
        </Link>
    ) : (props.label==="admin" && !props.admin.isLoggedIn) ?(
        <Link
            className={props.classesName}
            to='/admin'
            >
            {t("SIGNIN")}
        </Link>
    ) : props.user.isLoggedIn ? (
        <Link
            className={props.classesName}
            onClick={() => props.logoutUser()}
            to='/'
            >
            {t("SIGNOUT")}

        </Link>
    ) : (
        <Link
            className={props.classesName}
            to='/signin'
            >
            {t("SIGNIN")}
        </Link>
    )
}



export default connector(SignInOutButton);