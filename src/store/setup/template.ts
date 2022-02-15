import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { TMS_DECISION } from '../../routes/common';

export interface ITemplate {
    type: undefined | 'generalData' | 'csaferData' 
    data: {
        total: number,
        success: number,
        duplicate: number,
        fail: number
    }
}


const initialState: ITemplate = {
    type: undefined,
    data: {
        total: 0,
        success: 0,
        duplicate: 0,
        fail: 0
    }
}

export const createGeneralData = createAsyncThunk( // init시 호출
    'template/createGeneralData',
    async() => {
        try {
            const response = await axios.post(`${TMS_DECISION}/analysis11410/execGeneralData`);
            if (response.status === 200) {
                return response;
            }
            return 'FAILURE'; // 여기 도달할일은 없다..
        } catch(error: any) {
            console.log(error);
        }
        return 'FAILURE';
    }
);

export const createCsaferData= createAsyncThunk( // init시 호출
    'template/createCsaferData',
    async() => {
        try {
            const response = await axios.post(`${TMS_DECISION}/analysis11410/execCsaferData`);
            if (response.status === 200) {
                return response;
            }
        } catch(error) {
            console.log(error);
        }
        return 'FAILURE';
    }
);

const templateSlice = createSlice({
    name: 'template',
    initialState,
    reducers: {
        resetTemplate: () => {
            return initialState;
        } 
    },
    extraReducers: {
        [createGeneralData.fulfilled.type]: (state, action) => {
            state.type = 'generalData';
            if(action.payload === 'FAILURE') {
                state.data.total = -1; 
            } else {
                state.data = action.payload.data.response;
            }
        },
        [createCsaferData.fulfilled.type]: (state, action) => {
            state.type = 'csaferData';
            if(action.payload === 'FAILURE') {
                state.data.total = -1; 
            } else {
                state.data = action.payload.data.response;
            }
        },
    },
});

export const { resetTemplate } = templateSlice.actions;
export default templateSlice.reducer;