import { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../../redux';
import { loadAdmin } from '../../redux/admin/actions';
import { loadUser } from '../../redux/user/actions';
import setAuthToken from '../../utils/setAuthToken';


const mapState = (state: RootState, ownProps: any) => {
    return {
        label: ownProps.label,
        user: state.user,
        admin: state.admin
    }
}

const mapDispatch = (dispatch:any) => {
    return {
        loadUser : () => dispatch(loadUser()),
        loadAdmin : () => dispatch(loadAdmin())
    }
}

const connector = connect(mapState, mapDispatch)
type PropsFromRedux = ConnectedProps<typeof connector>
type Props = PropsFromRedux

function Auth(props: Props) {
    useEffect(() => {
        window.scrollTo(0, 0);
        if(props.label==="admin"){
            const token =localStorage.getItem('admintoken')
            if (token) {
                setAuthToken(token);
                props.loadAdmin();
            }
        } else {
            const token =localStorage.getItem('token')
            if (token) {
                setAuthToken(token);
                props.loadUser();
            }
        }
      }, []);
    return(
        <div></div>
    )
}



export default connector(Auth);