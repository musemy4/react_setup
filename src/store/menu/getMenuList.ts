import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const REQUEST_URL = '/vurix-dms/api/v1';

const initialState: any = {
    code: undefined,
    response: {}
}

export const fetchMenuList = createAsyncThunk( // init시 호출
    'menu/fetchMenuList',
    async() => {
        try {
            const response = await axios.get(`${REQUEST_URL}/role/menuList`);
            if (response.status === 200) {
                console.log(response);
                return response.data;
            }
        } catch(error) {
            console.log(error);
        }
        return null;
    }
);

// http 전체 형태
const fetchMenuSlice = createSlice({
    name: 'fetchMenu',
    initialState,
    reducers: {
        resetMenulist: () => { // initialState 로
            return initialState;
        },
    },
    extraReducers: {
        [fetchMenuList.fulfilled.type]: (state, action) => {
            console.log(action);
            state.code = action.payload.code;
            state.response = action.payload.response;
        },
        // 이 방식의 extraReducer는 action의 type을 지정할수 있다(PayloadAction @redux/toolkit)
        // [fetchSetupProps.rejected.type]: (state, action: PayloadAction<{message: string; status: number}>) => {
        // [fetchSetupProps.rejected.type]: (state) => {
        //     state.loading = false; 
        // },
    }
});

export const {resetMenulist} = fetchMenuSlice.actions;
export default fetchMenuSlice.reducer;