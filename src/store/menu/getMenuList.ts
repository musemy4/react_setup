import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { responseInterceptor } from 'http-proxy-middleware';


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
                return response.data;
            }
        } catch(error) {
            console.log(error);
        }
        return undefined;
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
            state.code = action.payload.code;
            state.response = action.payload.response;
        },
        // 이 방식의 extraReducer는 action의 type을 지정할수 있다(PayloadAction @redux/toolkit)
        // [fetchMenuList.pending.type]: () => {
        //     console.log('pending:::');
        // },
    }
});

export const { resetMenulist } = fetchMenuSlice.actions;
export default fetchMenuSlice.reducer;