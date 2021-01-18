import axios from 'axios';

const setAuthToken = (token : string) =>{
    if(token){
        axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
    } else {
        delete axios.defaults.headers.common;
    }
}

export default setAuthToken;