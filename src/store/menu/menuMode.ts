import { createSlice } from '@reduxjs/toolkit';
import { IMode } from '../../components/menu/menu/menu_interface';



const initialState: IMode = {
    mode: 'default',
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
const menuModeSlice = createSlice({
    name: 'fetchMenu',
    initialState,
    reducers: {
        resetMode: (state) => { // initialState 로
            state.mode = 'reset';
            return state;
        },
        defaultMode: () => {
            return initialState;
        },
        setMode: (state: IMode, action) => {
            state.mode = action.payload;
        },
    },
    extraReducers: {}
});

export const { resetMode, setMode, defaultMode } = menuModeSlice.actions;
export default menuModeSlice.reducer;