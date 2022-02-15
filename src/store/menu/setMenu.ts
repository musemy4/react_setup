import { createSlice } from '@reduxjs/toolkit';
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
    ordering: -1,
    p_menu_code: '',
    reg_date: '',
    setup_flag: false,
    upd_date: ''
}



// http 전체 형태
const menuSlice = createSlice({
    name: 'menuSlice',
    initialState,
    reducers: {
        resetMenu: () => { // initialState 로
            return initialState;
        },
        setMenu: (state: IMenu, action) => {
            state = action.payload;
            return state;
        },
    },
    extraReducers: {}
});

export const { resetMenu, setMenu } = menuSlice.actions;
export default menuSlice.reducer;