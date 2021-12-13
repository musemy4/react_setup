import { createSlice, createAsyncThunk, combineReducers } from '@reduxjs/toolkit';
import axios from 'axios';

const REQUEST_URL = '/vurix-dms/api/v1';
export interface ILogin {
    loading: boolean;
    status: undefined | 'SUCCESS' | 'FAILURE'
}

interface ILoginParams {
    id: string;
    pw: string;
}

const initialState: ILogin = {
    loading: false,
    status: undefined
}

export const postLogin = createAsyncThunk(
    'setup/postLogin',
    async(params: ILoginParams) => {
        try {
            const response = await axios.post(`${REQUEST_URL}/auth/setupLogin`, params);
            console.log(response);
            if (response.status === 200) {
                return 'SUCCESS';
            }
            if (response.status === 250 || response.status === 260) {
                return 'FAILURE';
            }
            return 'FAILURE';
        } catch(error) {
            console.log('login rejected::', error);
        }
        return 'FAILURE';
    }
);

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        resetUserLogin: () => {
            return initialState;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(postLogin.fulfilled, (state, action) => {
            state.loading = false;
            state.status = action.payload;
        })
        .addCase(postLogin.pending, (state) => {
            state.loading = true;
        })
        .addCase(postLogin.rejected, (state) => {
            state.loading= false;
        })
    },
});

export const {resetUserLogin} = loginSlice.actions;
export default loginSlice.reducer;