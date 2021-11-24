import adminReducer from "./admin";
import loginReducer from "./login";
import { getSetupPropsReducer, putSetupPropsReducer, returnSetupPropsReducer } from "./setup";

import {
    IGetSetupHttpBody,
    IPutSetupHttpBody,
    IAddSetupData
} from '../components/setupView/setupSetting/setup_setting_interface'

export interface ISetupState {
    adminState: {
        [key: string] : {
            type: string;
            status: string;
         }   
    };
    getSetupState: IGetSetupHttpBody;
    putSetupState: IPutSetupHttpBody;
    addSetupState: Array<IAddSetupData>;
}

export interface ILoginState {
    loginState : {
        login: {
            status: string;
        }
    }
}


export const reducers = {
    adminState: adminReducer,
    loginState: loginReducer,
    getSetupState: getSetupPropsReducer,
    putSetupState: putSetupPropsReducer,
    addSetupState: returnSetupPropsReducer,
};  