import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "./admin";
import loginReducer from "./login";
import { getSetupPropsReducer, putSetupPropsReducer, returnSetupPropsReducer } from "./setup";

// redux-toolkit
// 1. 별도의 combineReducers로 묶어줄 필요없이 reducer 필드에 넣어주면 된다
// 2. default로 redux devtool을 제공한다
export const store = configureStore({
    reducer: {
        adminState: adminReducer,
        loginState: loginReducer,
        getSetupState: getSetupPropsReducer,
        putSetupState: putSetupPropsReducer,
        addSetupState: returnSetupPropsReducer,
    }
})