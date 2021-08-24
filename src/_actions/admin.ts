import axios, { AxiosError } from 'axios';
import { Dispatch } from 'redux';
import { 
    ADMIN_CREATE_SUCCESS, 
    ADMIN_CREATE_FAILURE,
    ADMIN_CREATE_FAILURE_DUPLICATE,
    ADMIN_AUTH_RESET_SUCCESS, 
    ADMIN_AUTH_RESET_FAILURE,
    ADMIN_PW_RESET_SUCCESS ,
    ADMIN_PW_RESET_FAILURE,
    ADMIN_STATUS_RESET
} from './types';

const REQUEST_URL = '/vurix-dms/api/v1';

export const setupCreateID = () => {
    return (dispatch: Dispatch) => {
        axios.post(`${REQUEST_URL}/auth/setupCreateID`).then((response) => {
            dispatch({
                type: ADMIN_CREATE_SUCCESS,
                payload: response
            });
        }).catch((error: AxiosError) => {
            // ID 중복
            if (error.response?.data.code === 500 
                    && error.response?.data.message.indexOf('unique')) {
                        dispatch({
                            type: ADMIN_CREATE_FAILURE_DUPLICATE,
                            payload: error
                        });
            } else {
                dispatch({
                    type: ADMIN_CREATE_FAILURE,
                    payload: error
                });
            }
            
        });
    }
}

export const setupResetRole = () => {
    return (dispatch: Dispatch) => {
        axios.put(`${REQUEST_URL}/auth/setupResetRole`).then((response) => {
            dispatch({
                type: ADMIN_AUTH_RESET_SUCCESS,
                payload: response
            });
        }).catch((error: Error) => {
            dispatch({
                type: ADMIN_AUTH_RESET_FAILURE,
                payload: error
            });
        });
    }
}

export const setupResetPw = () => {
    return (dispatch: Dispatch) => {
        axios.put(`${REQUEST_URL}/auth/setupResetPw`).then((response) => {
            dispatch({
                type: ADMIN_PW_RESET_SUCCESS,
                payload: response
            });
        }).catch((error: Error) => {
            dispatch({
                type: ADMIN_PW_RESET_FAILURE,
                payload: error
            });
        });
    }
}

export const resetAdminStatus = () => {
    return (dispatch: Dispatch) => {
        dispatch({
            type: ADMIN_STATUS_RESET
        });
    }
}