import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
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
    }
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
            console.log(error); // 여기서 나는지 관찰할것
            return error;
        }
        return undefined;
    }
);

// http 전체 형태
const fetchSetupSlice = createSlice({
    name: 'fetchSetup',
    initialState,
    reducers: {
        resetFetchSetupStatus: state => { // initialState 로
            state.code = -1;
            state.message = undefined;
            state.response = {menuInfo: [], eventInfo: [], funcInfo: [], setupInfo: [], layerInfo: []};
            state.responseTime = undefined; 
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchSetupProps.fulfilled, (state, action) => { // action.payload는 위의 axios에서 return된 값
            state.code = action.payload.code;
            state.message = action.payload.message;
            state.response = action.payload.response;
            state.responseTime = action.payload.responseTime;
        })
        // 잘못되었을때의 처리는 어떻게?
        // .addCase(fetchSetupProps.rejected, (state, action) => {
        //     state.code = action.payload.code;
        //     state.message = action.payload.message;
        //     state.response = action.payload.response;
        //     state.responseTime = action.payload.responseTime;
        // })
    },
});

export const {resetFetchSetupStatus} = fetchSetupSlice.actions;
export default fetchSetupSlice.reducer;