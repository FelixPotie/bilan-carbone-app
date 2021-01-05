import { Link } from '@material-ui/core';
import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../../redux';
import { logoutAdmin } from '../../redux/admin/actions';
import { logoutUser } from '../../redux/user/actions';


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
    return (props.label==="admin" && props.admin.isLoggedIn) ?(
        <Link
            color="inherit"
            variant="h6"
            underline="none"
            className={props.classesName}
            onClick={() => props.logoutAdmin()}
            href="/admin"
            >
            {'Se déconnecter'}
        </Link>
    ) : (props.label==="admin" && !props.admin.isLoggedIn) ?(
        <Link
            color="inherit"
            variant="h6"
            underline="none"
            className={props.classesName}
            href="/admin"
            >
            {'Se connecter'}
        </Link>
    ) : props.user.isLoggedIn ? (
        <Link
            color="inherit"
            variant="h6"
            underline="none"
            className={props.classesName}
            onClick={() => props.logoutUser()}
            href="/"
            >
            {'Se déconnecter'}
        </Link>
    ) : (
        <Link
            color="inherit"
            variant="h6"
            underline="none"
            className={props.classesName}
            href="/signin"
            >
            {'Se connecter'}
        </Link>
    )
}



export default connector(SignInOutButton);