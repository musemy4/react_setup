import adminReducer from "./admin";
import loginReducer from "./login";
import { getSetupPropsReducer, putSetupPropsReducer, returnSetupPropsReducer } from "./setup";

export const reducers = {
    adminState: adminReducer,
    loginState: loginReducer,
    getSetupState: getSetupPropsReducer,
    putSetupState: putSetupPropsReducer,
    addSetupState: returnSetupPropsReducer,
};