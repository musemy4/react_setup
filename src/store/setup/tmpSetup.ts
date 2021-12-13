import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

// interface
import {
    IPutSetupBody,
    ISetupBody
} from '../../components/menu/setup/setup_interface';

const REQUEST_URL = '/vurix-dms/api/v1';


const initialState: ISetupBody = {
    loading: false,
    response: {
        menuInfo: [],
        eventInfo: [],
        funcInfo: [],
        setupInfo: [],
        layerInfo: []
    }
}

export const putTmpSetupProps  = createAsyncThunk( // 수정
    'setup/putSetupProps',
    async(params: IPutSetupBody) => {
        try {
            const response = await axios.put(`${REQUEST_URL}/role/putSetupProp`, params);
            // {data: {…}, status: 200, statusText: 'OK', headers: {…}, config: {…},…}
            console.log(response);
            if (response.status === 200) return response.data; 
            return response.data; // fulfilled
        } catch(error) {
            console.log('put setup rejected::', error);
        }
    }
);

// http 전체 형태
const tmpSetupSlice = createSlice({
    name: 'tmpSetup',
    initialState,
    reducers: {
        addTmpData: (state, action) => {
            state.code = undefined;
            if (action.payload.type === 'MENU') {
                state.response.menuInfo = action.payload.data;
            } else if (action.payload.type === 'EVENT') {
                state.response.eventInfo = action.payload.data;
            } else if (action.payload.type === 'FUNC') {
                state.response.funcInfo = action.payload.data;
            } else if (action.payload.type === 'SETUP') {
                state.response.setupInfo = action.payload.data;
            } else if (action.payload.type === 'LAYER') {
                state.response.layerInfo = action.payload.data;
            }
        },
        resetTmpSetupStatus: () => { // initialState 로
            return initialState;
        },
    },
    extraReducers: {
        [putTmpSetupProps.fulfilled.type]: (state, action) => {
            state.code = action.payload.code;
            state.message = action.payload.message;
            state.response = action.payload.response;
            state.responseTime = action.payload.responseTime;
            state.loading = false; 
        },
        [putTmpSetupProps.pending.type]: (state) => {
            state.loading = true; 
        },
        [putTmpSetupProps.rejected.type]: (state, action: PayloadAction<{message: string; status: number}>) => {
            console.log(action);
            state.loading = false; 
        },
    }
});

export const { addTmpData, resetTmpSetupStatus } = tmpSetupSlice.actions;
export default tmpSetupSlice.reducer;