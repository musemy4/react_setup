import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
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
        resetMode: () => { // initialState 로
            return initialState;
        },
        setMode: (state, action) => {
            console.log(state, action); 
            state.mode = action.payload;
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

export const { resetMode, setMode } = menuModeSlice.actions;
export default menuModeSlice.reducer;