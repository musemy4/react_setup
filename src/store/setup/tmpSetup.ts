import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// interface
import {
    IPutSetupBody,
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

export const putTmpSetupProps  = createAsyncThunk( // 수정
    'setup/putSetupProps',
    async(params: IPutSetupBody) => {
        try {
            const response = await axios.put(`${REQUEST_URL}/role/putSetupProp`, params);
            // {data: {…}, status: 200, statusText: 'OK', headers: {…}, config: {…},…}
            console.log(response);
            if (response.status === 200) return response.data; // put의 반환 내용은 별거없다
            return response.data; // fulfilled
        } catch(error) {
            console.log(error); // 모양이 어떤지..
            return error; // reject
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
        resetTmpSetupStatus: state => { // initialState 로
            state.code = undefined;
            state.response.menuInfo = [];
            state.response.eventInfo = [];
            state.response.funcInfo = [];
            state.response.setupInfo = [];
            state.response.layerInfo =[];
        },
    },
    extraReducers: (builder) => {
        builder.addCase(putTmpSetupProps.fulfilled, (state, action) => { // action.payload는 위의 axios에서 return된 값
            console.log(state);
            console.log(action.payload);
            state.code = 200;
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

export const { addTmpData, resetTmpSetupStatus } = tmpSetupSlice.actions;
export default tmpSetupSlice.reducer;