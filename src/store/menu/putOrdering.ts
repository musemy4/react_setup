import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { IPutOrdering } from '../../components/menu/menu/menu_interface';

import { VURIX_DMS } from '../../routes/common';




const initialState: IPutOrdering = {
    mode: 'default',
}


export const putOrders = createAsyncThunk( // 메뉴 등록
    'menu/putOrdering',
    async(params: any) => {
        try {
            const response = await axios.put(`${VURIX_DMS}/role/putOrdering`, params);
            if (response.status === 200) {
                return 'success'; // fulfilled
            }
            return 'failure';
        } catch(error) {
            console.log(error);
        }
        return undefined;
    }
);




// http 전체 형태
const putOrderingSlice = createSlice({
    name: 'putOrdering',
    initialState,
    reducers: {
        beReadyPutOrdering: (state) => {
            return { ...state, mode: 'beReady'}
        },
       beDefault: () => {
           return initialState;
       }
    },
    extraReducers: {
        [putOrders.fulfilled.type]: (state, action) => {
            state.mode = action.payload;
        },
        [putOrders.fulfilled.type]: (state, action) => {
            state.mode = action.payload;
        },
        [putOrders.fulfilled.type]: (state, action) => {
            state.mode = action.payload;
        },


    }
});

export const { beReadyPutOrdering, beDefault } = putOrderingSlice.actions;
export default putOrderingSlice.reducer;