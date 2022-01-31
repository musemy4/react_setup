import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { IPutMenu } from '../../components/menu/menu/menu_interface';



const REQUEST_URL = '/vurix-dms/api/v1/role';



const initialState: IPutMenu = {
    mode: 'default',
    menu: {
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
}


// /**
// 	 * 이벤트 코드 수정
// 	 * @param event_code
// 	 * @param params
// 	 */
//  putEventCode(event_code: string, params: any): Observable<any> {
//     const url = `${API_URL}/putEvent/${event_code}`;
//     return from(this.httpUtils.PUT(url, params));
// }

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

export const putMenu = createAsyncThunk( // 메뉴 삭제
    'menu/putMenu',
    async(menu_code: string, params: any) => {
        try {
            const response = await axios.get(`${REQUEST_URL}/putMenu/${menu_code}`, params);
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

export const deleteMenu = createAsyncThunk( // 메뉴 추가
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
        getReadyPutMenu: (state) => {
            return { ...state, mode: 'ready'}
        },
        resetPutMenu: () => {
            return initialState;
        },
    },
    extraReducers: {
        [postMenu.fulfilled.type]: (state, action) => {
            console.log(state, action);
        },
        [putMenu.fulfilled.type]: (state, action) => {
            console.log(state, action);
        },

        [deleteMenu.fulfilled.type]: (state, action) => {
            console.log(state, action);
        },


    }
});

export const { getReadyPutMenu, resetPutMenu } = putMenuSlice.actions;
export default putMenuSlice.reducer;