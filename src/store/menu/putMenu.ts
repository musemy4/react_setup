import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { IMenu } from '../../components/menu/menu/menu_interface';



const initialState: IMenu = {
    admin_auth_enable: false,
    area_flag: false,
    download_enable: false,
    gis_enable: false,
    icon: '',
    menu_code: '',
    menu_id: '',
    menu_name: '',
    menu_page: '',
    ordering: 0,
    p_menu_code: '',
    reg_date: '',
    setup_flag: false,
    upd_date: '',
}


export const modifyMenu = createAsyncThunk( // 메뉴 수정
    'menu/modifyMenu',
    async() => {
        // try {
        //     const response = await axios.get(`${REQUEST_URL}/role/menuList`);
        //     if (response.status === 200) {
        //         return response.data;
        //     }
        // } catch(error) {
        //     console.log(error);
        // }
        return undefined;
    }
);

export const deleteMenu = createAsyncThunk( // 메뉴 삭제
    'menu/deleteMenu',
    async() => {
        // try {
        //     const response = await axios.get(`${REQUEST_URL}/role/menuList`);
        //     if (response.status === 200) {
        //         return response.data;
        //     }
        // } catch(error) {
        //     console.log(error);
        // }
        return undefined;
    }
);

export const addMenu = createAsyncThunk( // 메뉴 추가
    'menu/addMenu',
    async() => {
        // try {
        //     const response = await axios.get(`${REQUEST_URL}/role/menuList`);
        //     if (response.status === 200) {
        //         return response.data;
        //     }
        // } catch(error) {
        //     console.log(error);
        // }
        return undefined;
    }
);



// http 전체 형태
const putMenuSlice = createSlice({
    name: 'putMenu',
    initialState,
    reducers: {
        resetMode: (state) => { // initialState 로
            state.mode = 'reset';
            return state;
        },
        // defaultMode: () => {
        //     return initialState;
        // },
    },
    extraReducers: {}
});

// export const { resetMode, setMode, defaultMode } = putMenuSlice.actions;
export default putMenuSlice.reducer;