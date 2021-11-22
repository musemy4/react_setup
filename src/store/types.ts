import { 
    IMenu, 
    IEvent, 
    IFunc, 
    ISetup, 
} from '../components/setupView/setupSetting/setup_interface';
// } from '../components/setupView/setupSetting/setup_interface';

export interface IState {
    type: string;
    data: Array<any>;
}

export interface IAction {
    dataType: string;
    payload: Array<IMenu | IEvent | IFunc | ISetup>;
    type: string;
}

export interface IHttpAction {
    payload: {
        data: {
            code: number;
            message: string;
            responseTime:string;
            response: {
                eventInfo: Array<IEvent>;
                funcInfo: Array<IFunc>;
                menuInfo: Array<IMenu>;
                setupInfo: Array<ISetup>;
            }
        }
    };
    type: string;
}