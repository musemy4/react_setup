import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// interface
import {
    ISetupBody
} from '../../components/menu/setup/setup_interface';

const REQUEST_URL = '/vurix-dms/api/v1';


const initialState: ISetupBody = {
    code: undefined,
    response: {
        menuInfo: [],
        eventInfo: [],
        funcInfo: [],
        setupInfo: [],
        layerInfo: []
    }
}

export const fetchSetupProps = createAsyncThunk( // init시 호출
    'setup/fetchSetupProps',
    async() => {
        try {
            const response = await axios.get(`${REQUEST_URL}/role/getSetupProp`);
            if (response.status === 200) {
                return response.data;
            }
        } catch(error) {
            console.log(error);
        }
        return null;
    }
);

// http 전체 형태
const fetchSetupSlice = createSlice({
    name: 'fetchSetup',
    initialState,
    reducers: {
        resetFetchSetupStatus: () => { // initialState 로
            return initialState;
        },
        afterPutSetup: (state) => {
            state.code = -1;
        }
    },
    extraReducers: {
        [fetchSetupProps.fulfilled.type]: (state, action) => {
            state.code = action.payload.code;
            state.message = action.payload.message;
            state.response = action.payload.response;
            state.responseTime = action.payload.responseTime;
        },
        // 이 방식의 extraReducer는 action의 type을 지정할수 있다(PayloadAction @redux/toolkit)
        // [fetchSetupProps.rejected.type]: (state, action: PayloadAction<{message: string; status: number}>) => {
        // [fetchSetupProps.rejected.type]: (state) => {
        //     state.loading = false; 
        // },
    }
});

export const {resetFetchSetupStatus, afterPutSetup} = fetchSetupSlice.actions;
export default fetchSetupSlice.reducer;