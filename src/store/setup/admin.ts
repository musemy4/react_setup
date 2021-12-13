import { createSlice, createAsyncThunk, combineReducers } from '@reduxjs/toolkit';
import axios from 'axios';


const REQUEST_URL = '/vurix-dms/api/v1';
export interface IAdmin {
    type: undefined | 'createID' | 'resetRole' | 'resetPw' 
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
            const response = await axios.post(`${REQUEST_URL}/auth/setupCreateID`);
            console.log(response);
            
            if (response.status === 200) {
                return 'SUCCESS';
            }
            if (response.status === 500) {
                return 'DUPLICATE';
            }
            return 'FAILURE';
        } catch(error) {
            console.log('login rejected::', error);
        }
        return 'FAILURE';
    }
);

export const setupResetRole = createAsyncThunk( // init시 호출
    'admin/setupResetRole',
    async() => {
        try {
            const response = await axios.put(`${REQUEST_URL}/auth/setupResetRole`);
            console.log(response);
            if (response.status === 200) {
                return 'SUCCESS';
            }
        } catch(error) {
            console.log('login rejected::', error);
        }
        return 'FAILURE';
    }
);

export const setupResetPw = createAsyncThunk( // init시 호출
    'admin/setupResetPw',
    async() => {
        try {
            const response = await axios.put(`${REQUEST_URL}/auth/setupResetPw`);
            console.log(response);
            if (response.status === 200) {
                return 'SUCCESS';
            }
        } catch(error) {
            console.log('login rejected::', error);
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
            state.status = action.payload;
        })
        .addCase(setupCreateID.pending, (state) => {
            console.log(state);
        })
        .addCase(setupCreateID.rejected, (state) => {
            state.type = 'createID';
            state.status = 'ERROR';
        })
        // 2.setupResetRole
        .addCase(setupResetRole.fulfilled, (state, action) => { 
            state.type = 'resetRole';
            state.status = action.payload;
        })
        .addCase(setupResetRole.pending, (state) => {
            console.log(state);
        })
        .addCase(setupResetRole.rejected, (state) => {
            state.type = 'resetRole';
            state.status = 'ERROR';
        })
         // 3.setupResetPw
         .addCase(setupResetPw.fulfilled, (state, action) => {
            state.type = 'resetPw';
            state.status = action.payload;
        })
        .addCase(setupResetPw.pending, (state) => {
            console.log(state);
        })
        .addCase(setupResetPw.rejected, (state) => {
            state.type = 'resetPw';
            state.status = 'ERROR';
        })
    },
});

export const {resetAdminStatus} = adminSlice.actions;
export default adminSlice.reducer;