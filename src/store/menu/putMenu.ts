import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { IPutMenu } from '../../components/menu/menu/menu_interface';



const REQUEST_URL = '/vurix-dms/api/v1/role';



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
        ordering: 0,
        p_menu_code: '',
    }
}


export const postMenu = createAsyncThunk( // 메뉴 등록
    'menu/postMenu',
    async(params: string) => {
        try {
            const response = await axios.put(`${REQUEST_URL}/postMenu`, params);
            if (response.status === 200) {
                console.log(response);
                return response.data; // fulfilled
            }
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
            const response = await axios.get(`${REQUEST_URL}/putMenu/${params.menu_code}`, params);
            console.log(response);
            if (response.status === 200) {
                console.log(response);
                return response.data; // fulfilled
            }
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
            const response = await axios.get(`${REQUEST_URL}/deleteMenu/${menu_code}`);
            if (response.status === 200) {
                console.log(response);
                return response.data; // fulfilled
            }
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
            console.log(state, action);
        },
        [modiMenu.fulfilled.type]: (state, action) => {
            console.log(state, action);
        },

        [deleteMenu.fulfilled.type]: (state, action) => {
            console.log(state, action);
        },


    }
});

export const { getBeReadyPutMenu, resetPutMenu, setMenuInfoPart, setMenuPathPart } = putMenuSlice.actions;
export default putMenuSlice.reducer;