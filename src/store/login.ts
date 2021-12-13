import { createSlice, createAsyncThunk, combineReducers } from '@reduxjs/toolkit';
import axios from 'axios';

const REQUEST_URL = '/vurix-dms/api/v1';
interface ILogin {
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


export const postLogin = createAsyncThunk( // init시 호출
    'setup/postLogin',
    async(params: ILoginParams) => {
        try {
            const response = await axios.post(`${REQUEST_URL}/auth/setupLogin`, params);
            console.log(response);
            // data.code === 200 어쩌구 저쩌구에 따라 return값 다르게 처리가능
            if (response.status === 200) {
                return 'SUCCESS';
            }
            if (response.status === 250 || response.status === 260) {
                return 'FAILURE';
            }// action.payload : http의 모양일것 => IAddSetupData 형태로 바꿔야함
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
        resetUserLogin: state => { // initialState 로
            return initialState;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(postLogin.fulfilled, (state, action) => { // action.payload는 위의 axios에서 return된 값
            state.loading = false;
            state.status = action.payload;
        })
        .addCase(postLogin.pending, (state) => {
            state.loading = true;
        })
        .addCase(postLogin.rejected, (state, action) => {
            state.loading= false;
        })
    },
});

export const {resetUserLogin} = loginSlice.actions;
export default loginSlice.reducer;