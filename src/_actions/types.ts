import { IMenu, IEvent, IFunc, ISetup } from '../_views/setupSettings/setup_interface';

export const ADMIN_CREATE_SUCCESS = 'ADMIN_CREATE_SUCCESS';
export const ADMIN_CREATE_FAILURE = 'ADMIN_CREATE_FAILURE';
export const ADMIN_CREATE_FAILURE_DUPLICATE = 'ADMIN_CREATE_FAILURE_DUPLICATE';
export const ADMIN_AUTH_RESET_SUCCESS = 'ADMIN_AUTH_RESET_SUCCESS';
export const ADMIN_AUTH_RESET_FAILURE = 'ADMIN_AUTH_RESET_FAILURE';
export const ADMIN_PW_RESET_SUCCESS = 'ADMIN_PW_RESET_SUCCESS';
export const ADMIN_PW_RESET_FAILURE = 'ADMIN_PW_RESET_FAILURE';
export const ADMIN_STATUS_RESET = 'ADMIN_STATUS_RESET';
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_FAILURE = 'USER_LOGIN_FAILURE';
export const USER_LOGIN_RESET = 'USER_LOGIN_RESET';
export const GET_SETUP_PROPS = 'GET_SETUP_PROPS';
export const GET_SETUP_PROPS_JSON = 'GET_SETUP_PROPS_JSON';
export const RESET_GET_SETUP_PROPS_STATUS = 'RESET_GUT_SETUP_PROPS_STATUS';
export const PUT_SETUP_PROPS = 'PUT_SETUP_PROPS';
export const RESET_PUT_SETUP_PROPS_STATUS = 'RESET_PUT_SETUP_PROPS_STATUS';
export const ADD_SETUP_DATA = 'ADD_SETUP_DATA';

export interface IAction {
    dataType: string;
    payload: Array<IMenu | IEvent | IFunc | ISetup>;
    type: string;
}

export interface IHttpAction {
    payload: {
        data: {
            code: number;
            message: string;
            responseTime:string;
            response: {
                eventInfo: Array<IEvent>;
                funcInfo: Array<IFunc>;
                menuInfo: Array<IMenu>;
                setupInfo: Array<ISetup>;
            }
        }
    };
    type: string;
}