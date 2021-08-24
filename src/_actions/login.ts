import axios from 'axios';
import { Dispatch } from 'redux';
import { USER_LOGIN_SUCCESS, USER_LOGIN_FAILURE, USER_LOGIN_RESET } from './types';

const REQUEST_URL = '/vurix-dms/api/v1';

interface ILogin {
    id: string;
    pw: string;
}

export const postSetupLogin = (params: ILogin) => {
    return (dispatch: Dispatch) => {
        axios.post(`${REQUEST_URL}/auth/setupLogin`, params).then((response) => {
            if (response.status === 200) {
                dispatch({
                    type: USER_LOGIN_SUCCESS,
                    payload: response
                });
            }
            if (response.status === 250 || response.status === 260) {
                dispatch({
                    type: USER_LOGIN_FAILURE,
                    payload: response
                });
            }
      });
    }
}

export const resetSetupLogin = () => {
    return {
        type: USER_LOGIN_RESET
    };
}