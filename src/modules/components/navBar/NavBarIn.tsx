import React from 'react';
import { useTranslation } from 'react-i18next';
import { connect, ConnectedProps } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../../../redux';


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
    const  {t} = useTranslation();
    
    return props.user.isLoggedIn ? (
        <Link
            className={props.classesLinks}
            to='/mobilites'
        >
            {t("MOBILITIES")}
        </Link>
    ) : (
        <div></div>
    )
}



export default connector(NavBarIn);