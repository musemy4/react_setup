import axios from 'axios';

import { 
    IAction, 
} from './types';

export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_FAILURE = 'USER_LOGIN_FAILURE';
export const USER_LOGIN_RESET = 'USER_LOGIN_RESET';

const REQUEST_URL = '/vurix-dms/api/v1';

// type
interface ILogin {
    id: string;
    pw: string;
}

// action start
export const postSetupLogin = (params: ILogin) => {
    axios.post(`${REQUEST_URL}/auth/setupLogin`, params).then((response) => {
        if (response.status === 200) {
            return {
                type: USER_LOGIN_SUCCESS,
                payload: response
            }
        }
        // 200 나머지는 login_failure
        return {
            type: USER_LOGIN_FAILURE,
            payload: response
        }
    });
}

export const resetSetupLogin = () => {
    return {
        type: USER_LOGIN_RESET
    };
}
// action end

// reducer start
const loginReducer = (state = {}, action: IAction) => {
    switch (action.type) {
        case USER_LOGIN_SUCCESS :
            return { ...state, 'login': { status: 'SUCCESS' } };
        case USER_LOGIN_FAILURE :
            return { ...state, 'login': { status: 'FAILURE' } };
        case USER_LOGIN_RESET :
            return {};
        default :
            return state;
    }
};
// reducer end


export default loginReducer;