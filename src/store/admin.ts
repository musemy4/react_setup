import axios, { AxiosError } from 'axios';
import { Dispatch } from 'redux';

import { IAction } from './types'

export const ADMIN_CREATE_SUCCESS = 'ADMIN_CREATE_SUCCESS';
export const ADMIN_CREATE_FAILURE = 'ADMIN_CREATE_FAILURE';
export const ADMIN_CREATE_FAILURE_DUPLICATE = 'ADMIN_CREATE_FAILURE_DUPLICATE';
export const ADMIN_AUTH_RESET_SUCCESS = 'ADMIN_AUTH_RESET_SUCCESS';
export const ADMIN_AUTH_RESET_FAILURE = 'ADMIN_AUTH_RESET_FAILURE';
export const ADMIN_PW_RESET_SUCCESS = 'ADMIN_PW_RESET_SUCCESS';
export const ADMIN_PW_RESET_FAILURE = 'ADMIN_PW_RESET_FAILURE';
export const ADMIN_STATUS_RESET = 'ADMIN_STATUS_RESET';

const REQUEST_URL = '/vurix-dms/api/v1';

// action start 
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
    return {
        type: ADMIN_STATUS_RESET
    }
}
// action end

// reducer start
const adminReducer = (state = {}, action: IAction) => {
    switch (action.type) {
        case ADMIN_CREATE_SUCCESS :
            return { ...state, 'admin': { type: 'create', status: 'SUCCESS' } };
        case ADMIN_CREATE_FAILURE :
            return { ...state, 'admin': { type: 'create', status: 'FAILURE' } };
        case ADMIN_CREATE_FAILURE_DUPLICATE :
            return { ...state, 'admin': { type: 'create', status: 'DUPLICATE' } };
        case ADMIN_AUTH_RESET_SUCCESS :
            return { ...state, 'admin': { type: 'auth', status: 'SUCCESS' } };
        case ADMIN_AUTH_RESET_FAILURE :
            return { ...state, 'admin': { type: 'auth', status: 'FAILURE' } };
        case ADMIN_PW_RESET_SUCCESS :
            return { ...state, 'admin': { type: 'pw', status: 'SUCCESS' } };
        case ADMIN_PW_RESET_FAILURE :
            return { ...state, 'admin': { type: 'pw', status: 'FAILURE' } };
        case ADMIN_STATUS_RESET :
            return { ...state, 'admin': {} }
        default :
            return state;
    }
};

export default adminReducer;
// reducer end