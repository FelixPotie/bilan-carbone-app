import { Link } from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../../../redux';
import { logoutAdmin } from '../../../redux/admin/actions';
import { logoutUser } from '../../../redux/user/actions';


const mapState = (state: RootState, ownProps: any) => {
    return {
        user: state.user,
        classesLinks: ownProps.classesLinks
    }
}

const connector = connect(mapState)
type PropsFromRedux = ConnectedProps<typeof connector>
type Props = PropsFromRedux

function NavBarIn(props: Props) {
    const  {t, i18n} = useTranslation();
    
    return props.user.isLoggedIn ? (
        <Link
            color="inherit"
            variant="h6"
            underline="none"
            className={props.classesLinks}
            href="/mobilites"
        >
            {t("MOBILITIES")}
        </Link>
    ) : (
        <div></div>
    )
}



export default connector(NavBarIn);