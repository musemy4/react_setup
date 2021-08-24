import loginReducer from './login';
import adminReducer from './admin';
import { getSetupPropsReducer, putSetupPropsReducer, returnSetupPropsReducer } from './setup';

export const reducers = {
    adminState: adminReducer,
    loginState: loginReducer,
    getSetupState: getSetupPropsReducer,
    putSetupState: putSetupPropsReducer,
    addSetupState: returnSetupPropsReducer,
};