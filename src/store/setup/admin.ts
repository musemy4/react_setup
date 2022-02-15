import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { VURIX_DMS } from '../../routes/common';


export interface IAdmin {
    type: undefined | 'create' | 'auth' | 'pw' 
    status: undefined | 'SUCCESS' | 'FAILURE' | 'DUPLICATE' | 'ERROR'
}


const initialState: IAdmin = {
    type: undefined,
    status: undefined
}

export const setupCreateID = createAsyncThunk( // init시 호출
    'admin/createAdminAccount',
    async() => {
        try {
            const response = await axios.post(`${VURIX_DMS}/auth/setupCreateID`);
            if (response.status === 200) {
                return 'SUCCESS';
            }
            return 'FAILURE';
        } catch(error: any) {
            console.log(error);
            if (error.response?.data.code === 500 && error.response?.data.message.indexOf('unique')) {
                return 'DUPLICATE';
            }
        }
        return 'FAILURE';
    }
);

export const setupResetRole = createAsyncThunk( // init시 호출
    'admin/setupResetRole',
    async() => {
        try {
            const response = await axios.put(`${VURIX_DMS}/auth/setupResetRole`);
            if (response.status === 200) {
                return 'SUCCESS';
            }
        } catch(error) {
            console.log(error);
        }
        return 'FAILURE';
    }
);

export const setupResetPw = createAsyncThunk( // init시 호출
    'admin/setupResetPw',
    async() => {
        try {
            const response = await axios.put(`${VURIX_DMS}/auth/setupResetPw`);
            if (response.status === 200) {
                return 'SUCCESS';
            }
        } catch(error) {
            console.log(error);
        }
        return 'FAILURE';
    }
);



const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        resetAdminStatus: () => { // initialState 로
            return initialState;
        },
    },
    extraReducers: (builder) => {
        // 1. setupCreateID
        builder.addCase(setupCreateID.fulfilled, (state, action) => { 
            state.type = 'create';
            state.status = action.payload;
        })
        .addCase(setupCreateID.rejected, (state) => {
            state.type = 'create';
            state.status = 'ERROR';
        })
        // 2.setupResetRole
        .addCase(setupResetRole.fulfilled, (state, action) => { 
            state.type = 'auth';
            state.status = action.payload;
        })
        .addCase(setupResetRole.rejected, (state) => {
            state.type = 'auth';
            state.status = 'ERROR';
        })
         // 3.setupResetPw
         .addCase(setupResetPw.fulfilled, (state, action) => {
            state.type = 'pw';
            state.status = action.payload;
        })
        .addCase(setupResetPw.rejected, (state) => {
            state.type = 'pw';
            state.status = 'ERROR';
        })
    },
});

export const {resetAdminStatus} = adminSlice.actions;
export default adminSlice.reducer;