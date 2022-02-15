import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { VURIX_DMS } from '../../routes/common';


const initialState: any = {
    code: undefined,
    response: {}
}

export const getMenuList = createAsyncThunk( // init시 호출
    'menu/getMenuList',
    async() => {
        try {
            const response = await axios.get(`${VURIX_DMS}/role/menuList`);
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
const getMenuSlice = createSlice({
    name: 'getMenuList',
    initialState,
    reducers: {
        resetMenulist: () => { // initialState 로
            return initialState;
        },
    },
    extraReducers: {
        [getMenuList.fulfilled.type]: (state, action) => {
            state.code = action.payload.code;
            state.response = action.payload.response;
        },
        // 이 방식의 extraReducer는 action의 type을 지정할수 있다(PayloadAction @redux/toolkit)
        // [fetchMenuList.pending.type]: () => {
        //     console.log('pending:::');
        // },
    }
});

export const { resetMenulist } = getMenuSlice.actions;
export default getMenuSlice.reducer;