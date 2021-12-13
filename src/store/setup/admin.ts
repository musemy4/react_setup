import { createSlice, createAsyncThunk, combineReducers } from '@reduxjs/toolkit';
import axios from 'axios';


const REQUEST_URL = '/vurix-dms/api/v1';
interface IAdmin {
    type: undefined | 'createID' | 'resetRole' | 'resetPw' 
    status: undefined | 'SUCCESS' | 'FAILURE' | 'DUPLICATE'
}

interface ILoginParams {
    id: string;
    pw: string;
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
            const state: any = {
                type: 'createID',
                status: undefined
            }

            if (response.status === 200) {
                state.status = 'SUCCESS';
                return state;
            }
            if (response.status === 500) {
                state.status = 'DUPLICATE';
                return state; // 500에러가 여기서 나는지
            }
        } catch(error) {
            console.log(error); // 여기서 나는지 관찰할것
            return 'FAILURE';
        }
        return undefined;
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
            console.log(error);
            return 'FAILURE';
        }
        return undefined;
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
            console.log(error);
            return 'FAILURE';
        }
        return undefined;
    }
);



const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        resetAdminStatus: state => { // initialState 로
            state.type = undefined;
            state.status = undefined;
        },
    },
    extraReducers: (builder) => {
        // 1. setupCreateID
        builder.addCase(setupCreateID.fulfilled, (state, action) => { // action.payload는 위의 axios에서 return된 값
            state.type = 'createID';
            state.status = action.payload;
        })
        .addCase(setupCreateID.pending, (state) => {
            console.log(state);
        })
        .addCase(setupCreateID.rejected, (state, action) => {
            state.type = 'createID';
            console.log(action);
            // state.status = action.payload;
        })
        // 2.setupResetRole
        .addCase(setupResetRole.fulfilled, (state, action) => { // action.payload는 위의 axios에서 return된 값
            state.type = 'resetRole';
            state.status = action.payload;
        })
        .addCase(setupResetRole.pending, (state) => {
            console.log(state);
        })
        .addCase(setupResetRole.rejected, (state, action) => {
            console.log(action);
            state.type = 'resetRole';
            // state.status = action.payload;
        })
         // 3.setupResetPw
         .addCase(setupResetPw.fulfilled, (state, action) => { // action.payload는 위의 axios에서 return된 값
            state.type = 'resetPw';
            state.status = action.payload;
        })
        .addCase(setupResetPw.pending, (state) => {
            console.log(state);
        })
        .addCase(setupResetPw.rejected, (state, action) => {
            state.type = 'resetPw';
            console.log(action);
            // state.status = action.payload;
        })
    },
});

export const {resetAdminStatus} = adminSlice.actions;
export default adminSlice.reducer;