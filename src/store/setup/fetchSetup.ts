import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

// interface
import {
    ISetupBody
} from '../../components/menu/setup/setup_interface';

const REQUEST_URL = '/vurix-dms/api/v1';


const initialState: ISetupBody = {
    response: {
        menuInfo: [],
        eventInfo: [],
        funcInfo: [],
        setupInfo: [],
        layerInfo: []
    },
    loading: false
}

export const fetchSetupProps = createAsyncThunk( // init시 호출
    'setup/fetchSetupProps',
    async() => {
        try {
            const response = await axios.get(`${REQUEST_URL}/role/getSetupProp`);
            console.log(response);
            if (response.status === 200) {
                return response.data;
            }
        } catch(error) {
            console.log('login rejected::', error);
        }
        return null;
    }
);

// http 전체 형태
const fetchSetupSlice = createSlice({
    name: 'fetchSetup',
    initialState,
    reducers: {
        resetFetchSetupStatus: state => { // initialState 로
            return initialState;
        },
    },
    extraReducers: {
        [fetchSetupProps.fulfilled.type]: (state, action) => {
            state.code = action.payload.code;
            state.message = action.payload.message;
            state.response = action.payload.response;
            state.responseTime = action.payload.responseTime;
            state.loading = false; 
        },
        [fetchSetupProps.pending.type]: (state) => {
            state.loading = true; 
        },
        [fetchSetupProps.rejected.type]: (state, action: PayloadAction<{message: string; status: number}>) => {
            // 실패시 return 되는 action의 type을 정해줄수 있어 이방법으로 하겠다
            console.log(action);
            state.loading = false; 
        },
    }
});

export const {resetFetchSetupStatus} = fetchSetupSlice.actions;
export default fetchSetupSlice.reducer;