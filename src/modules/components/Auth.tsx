import { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../../redux';
import { loadUser } from '../../redux/user/actions';
import setAuthToken from '../setAuthToken';


const mapState = (state: RootState) => {
    return {
        user: state.user
    }
}

const mapDispatch = (dispatch:any) => {
    return {
        loadUser : () => dispatch(loadUser()),
    }
}

const connector = connect(mapState, mapDispatch)
type PropsFromRedux = ConnectedProps<typeof connector>
type Props = PropsFromRedux

function Auth(props: Props) {
    useEffect(() => {
        const token =localStorage.getItem('token')
        if (token) {
          setAuthToken(token);
          props.loadUser();
        }
      }, []);
    return(
        <div></div>
    )
}



export default connector(Auth);