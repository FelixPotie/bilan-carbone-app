import { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../../redux';
// import { fetchUsers } from '../../redux/user/actions';

// const mapState = (state: RootState) => {
//     return {
//         userData: state.user
//     }
// }

// const mapDispatch = (dispatch:any) => {
//     return {
//         fetchUsers: () => dispatch(fetchUsers())
//     }
// }

// const connector = connect(mapState, mapDispatch)
// type PropsFromRedux = ConnectedProps<typeof connector>
// type Props = PropsFromRedux

function UserContainer(/*props: Props*/) {
    // useEffect(()=> {
    //     props.fetchUsers()
    // }, [])
    // return props.userData.loading ? (
    //     <h2>Loading</h2>
    // ) : props.userData.error ? (
    //     <h2>{props.userData.error}</h2>
    // ) : (
    //     <div>
    //         <h2>User List</h2>
    //         <div>
    //             {props.userData && props.userData.users.map((user:any) => <p>{user.name}</p>)}
    //         </div>
    //     </div>
    // )
    return(
        <div></div>
    )
}



// export default connector(UserContainer);
export default UserContainer;