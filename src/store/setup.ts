import axios from 'axios';
import { Dispatch } from 'redux';
import _ from 'lodash';

// types
import { 
    IGetSetupGroup,
    IPutSetupGroup,
    IMenu, 
    IEvent, 
    IFunc, 
    ISetup, 
    ILayer 
} from '../components/setupView/setupSetting/setup_interface';

import { IAction, IHttpAction, IState } from './types'


export const GET_SETUP_PROPS = 'GET_SETUP_PROPS';
export const GET_SETUP_PROPS_JSON = 'GET_SETUP_PROPS_JSON';
export const PUT_SETUP_PROPS = 'PUT_SETUP_PROPS';
export const ADD_SETUP_DATA = 'ADD_SETUP_DATA';
export const RESET_GET_SETUP_PROPS_STATUS = 'RESET_GUT_SETUP_PROPS_STATUS';
export const RESET_PUT_SETUP_PROPS_STATUS = 'RESET_PUT_SETUP_PROPS_STATUS';

const REQUEST_URL = '/vurix-dms/api/v1';

// actions start 
export const getSetupProps = () => {
    return (dispatch: Dispatch) => {
        axios.get(`${REQUEST_URL}/role/getSetupProp`).then((response) => {
            dispatch({
                type: GET_SETUP_PROPS,
                payload: response
            });
        });
    }
}

export const getSetupPropsJson = (json: IGetSetupGroup) => {
    return (dispatch: Dispatch) => {
        dispatch({
            type: GET_SETUP_PROPS_JSON,
            payload: json
        });
    }
}

export const resetGetSetupStatus = () => {
    return (dispatch: Dispatch) => {
        dispatch({
            type: RESET_GET_SETUP_PROPS_STATUS
        });
    }
}

export const putSetupProps = (params: IPutSetupGroup) => {
    return (dispatch: Dispatch) => {
        axios.put(`${REQUEST_URL}/role/putSetupProp`, params).then((response) => {
            dispatch({
                type: PUT_SETUP_PROPS,
                payload: response
            });
        });
    }
}

export const resetPutSetupStatus = () => {
    return (dispatch: Dispatch) => {
        dispatch({
            type: RESET_PUT_SETUP_PROPS_STATUS
        });
    }
}

export const addSetupData = (setupData: Array<IMenu | IEvent | IFunc | ISetup | ILayer>, type: string) => {
    return (dispatch: Dispatch) => {
        dispatch({
            dataType: type,
            type: ADD_SETUP_DATA,
            payload: setupData
        });
    }
}
// actions end 

// reducer start
const getSetupPropsReducer = (state = null, action: IHttpAction) => {
    switch (action.type) {
        case GET_SETUP_PROPS :
            return action.payload.data;
        case GET_SETUP_PROPS_JSON :
            return {
                response: action.payload,
            };
        case RESET_GET_SETUP_PROPS_STATUS :
            return {};
        default :
            return state;
    }
};

const putSetupPropsReducer = (state = null, action: IHttpAction) => {
    switch (action.type) {
        case PUT_SETUP_PROPS :
            return action.payload.data;
        case RESET_PUT_SETUP_PROPS_STATUS :
            return {};
        default :
            return state;
    }
};

const returnSetupPropsReducer = (state: Array<IState> = [], action: IAction) => {
    switch (action.type) {
        case ADD_SETUP_DATA: {
            const findIdx = _.findIndex(state, { type: action.dataType });
            if (findIdx > -1) {
                const rejectState = _.reject({...state}, { type: action.dataType });
                return [...rejectState, {type: action.dataType, data: action.payload} ];
            }
            return [...state, { type: action.dataType, data: action.payload } ];
        }
        default :
            return state;
    }
};

export { getSetupPropsReducer, putSetupPropsReducer, returnSetupPropsReducer } ;

// reducer end