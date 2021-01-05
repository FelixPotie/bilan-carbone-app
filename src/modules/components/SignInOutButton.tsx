import { Link } from '@material-ui/core';
import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../../redux';
import { logoutUser } from '../../redux/user/actions';


const mapState = (state: RootState, ownProps: any) => {
    return {
        user: state.user,
        classes: ownProps.classes
    }
}

const mapDispatch = (dispatch:any) => {
    return {
        logoutUser : () => dispatch(logoutUser()),
    }
}

const connector = connect(mapState, mapDispatch)
type PropsFromRedux = ConnectedProps<typeof connector>
type Props = PropsFromRedux

function SignInOutButton(props: Props) {
    return props.user.isLoggedIn ? (
        <Link
            color="inherit"
            variant="h6"
            underline="none"
            className={props.classes.rightLink}
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
            className={props.classes.rightLink}
            href="/signin"
            >
            {'Se connecter'}
        </Link>
    )
}



export default connector(SignInOutButton);