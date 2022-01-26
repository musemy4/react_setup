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

// export const fetchMenuList = createAsyncThunk( // init시 호출
//     'menu/fetchMenuList',
//     async() => {
//         try {
//             const response = await axios.get(`${REQUEST_URL}/role/menuList`);
//             if (response.status === 200) {
//                 return response.data;
//             }
//         } catch(error) {
//             console.log(error);
//         }
//         return undefined;
//     }
// );

// http 전체 형태
const menuSlice = createSlice({
    name: 'menuSlice',
    initialState,
    reducers: {
        resetMenu: () => { // initialState 로
            return initialState;
        },
        setMenu: (state: IMenu, action) => {
            console.log(state, action); 
            state = action.payload;
            return state;
        },
    },
    extraReducers: {
        // [fetchMenuList.fulfilled.type]: (state, action) => {
        //     state.code = action.payload.code;
        //     state.response = action.payload.response;
        // },
        // 이 방식의 extraReducer는 action의 type을 지정할수 있다(PayloadAction @redux/toolkit)
        // [fetchMenuList.pending.type]: () => {
        //     console.log('pending:::');
        // },
    }
});

export const { resetMenu, setMenu } = menuSlice.actions;
export default menuSlice.reducer;