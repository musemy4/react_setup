import axios from 'axios';
import { Dispatch } from 'redux';
import { GET_SETUP_PROPS, GET_SETUP_PROPS_JSON, PUT_SETUP_PROPS, ADD_SETUP_DATA, RESET_GET_SETUP_PROPS_STATUS, RESET_PUT_SETUP_PROPS_STATUS } from './types';
import { IMenu, IEvent, IFunc, ISetup, ILayer, IGetSetupGroup, IPutSetupGroup } from '../_views/setupSettings/setup_interface';

const REQUEST_URL = '/vurix-dms/api/v1';

export const getSetupProps = () => {
    return (dispatch: Dispatch) => {
        axios.get(`${REQUEST_URL}/role/getSetupProp`).then((response) => {
            console.log('0.getSetupProps::');
            console.log(response); // 전체를 걍다 넘김
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
    console.log(setupData);
    return (dispatch: Dispatch) => {
        dispatch({
            dataType: type,
            type: ADD_SETUP_DATA,
            payload: setupData
        });
    }
}