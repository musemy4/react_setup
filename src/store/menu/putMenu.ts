import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { IPutMenu } from '../../components/menu/menu/menu_interface';

import { VURIX_DMS } from '../../routes/common';




const initialState: IPutMenu = {
    mode: 'default',
    menu: {
        admin_auth_enable: false,
        download_enable: false,
        gis_enable: false,
        icon: '',
        menu_code: '',
        menu_id: '',
        menu_name: '',
        menu_page: '',
        ordering: -1,
        p_menu_code: '',
    }
}


export const postMenu = createAsyncThunk( // 메뉴 등록
    'menu/postMenu',
    async(params: any) => {
        console.log(params);
        try {
            const response = await axios.post(`${VURIX_DMS}/role/postMenu`, params);
            if (response.status === 200) {
                console.log(response);
                return 'successPost'; // fulfilled
            }
            return 'failurePost';
        } catch(error) {
            console.log(error);
        }
        return undefined;
    }
);

export const modiMenu = createAsyncThunk( // 메뉴 수정
    'menu/modiMenu',
    async(params: any) => {
        console.log(params);
        try {
            const response = await axios.put(`${VURIX_DMS}/role/putMenu/${params.menu_code}`, params);
            console.log(response);
            if (response.status === 200) {
                console.log(response);
                return 'successPut'; // fulfilled
            }
            return 'failurePut';
        } catch(error) {
            console.log(error);
        }
        return undefined;
    }
);

export const deleteMenu = createAsyncThunk( // 메뉴 삭제
    'menu/deleteMenu',
    async(menu_code: string) => {
        try {
            const response = await axios.delete(`${VURIX_DMS}/role/deleteMenu/${menu_code}`);
            if (response.status === 200) {
                console.log(response);
                return 'successDel'; // fulfilled
            } 
            return 'failureDel';
        } catch(error) {
            console.log(error);
        }
        return undefined;
    }
);



// http 전체 형태
const putMenuSlice = createSlice({
    name: 'putMenu',
    initialState,
    reducers: {
        getBeReadyPutMenu: (state) => {
            return { ...state, mode: 'beReady'}
        },
        setMenuInfoPart: (state, action) => {
            console.log(state);
            console.log(action);
            state.mode = 'readyInfo';
            state.menu = action.payload;
            return state;
        },
        setMenuPathPart: (state, action) => {
            console.log(state);
            state.mode = 'readyPath'
            state.menu.menu_page = action.payload;
            return state;
        },
        resetPutMenu: () => {
            return initialState;
        },
    },
    extraReducers: {
        [postMenu.fulfilled.type]: (state, action) => {
            state.mode = action.payload;
        },
        [modiMenu.fulfilled.type]: (state, action) => {
            state.mode = action.payload;
        },
        [deleteMenu.fulfilled.type]: (state, action) => {
            state.mode = action.payload;
        },


    }
});

export const { getBeReadyPutMenu, resetPutMenu, setMenuInfoPart, setMenuPathPart } = putMenuSlice.actions;
export default putMenuSlice.reducer;