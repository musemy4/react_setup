import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';



// types
import { 
    IGetSetupHttpBody,
    IGetSetupGroup,
    IPutSetupGroup,
    IMenu, 
    IEvent, 
    IFunc, 
    ISetup, 
    ILayer 
} from '../components/setupView/setupSetting/setup_setting_interface';

import { IAction, IHttpAction, IState } from './types'

const REQUEST_URL = '/vurix-dms/api/v1';


const initialFetchState: IGetSetupHttpBody = {
    code: undefined,
    message: undefined,
    response: {
        menuInfo: [],
        eventInfo: [],
        funcInfo: [],
        setupInfo: [],
        layerInfo: []
    },
    responseTime: undefined
};

const initialState: IGetSetupGroup = {
    menuInfo: [],
    eventInfo: [],
    funcInfo: [],
    setupInfo: [],
    layerInfo: []
}


export const fetchSetupProps: any = createAsyncThunk<any>(
    'setup/fetchSetupProps',
    async() => {
        try {
            const response = await fetch(REQUEST_URL);
            const data = await response.json();
            console.log('data:', data);
            return data;
        } catch (error) {
            console.log(error);
            return error;
        }
    },
);


export const setupSlice = createSlice({
    name: 'setup',
    initialState,
    reducers: {
        getSetupProps: (state, {payload}) => {
            console.log(state);
            console.log(payload);
        }
    },
    extraReducers: {

    }
});