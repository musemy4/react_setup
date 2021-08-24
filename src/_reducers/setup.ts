import _ from 'lodash';
import { 
    GET_SETUP_PROPS, 
    GET_SETUP_PROPS_JSON, 
    RESET_GET_SETUP_PROPS_STATUS,
    PUT_SETUP_PROPS, 
    ADD_SETUP_DATA, 
    RESET_PUT_SETUP_PROPS_STATUS, 
    IAction, 
    IHttpAction 
} from '../_actions/types';

interface IState {
    type: string;
    data: Array<any>;
}

const getSetupPropsReducer = (state = null, action: IHttpAction) => {
    switch (action.type) {
        case GET_SETUP_PROPS :
            return action.payload.data;
        case GET_SETUP_PROPS_JSON :
            return {
                response: action.payload,
            };
        case RESET_GET_SETUP_PROPS_STATUS :
            return {};
        default :
            return state;
    }
};

const putSetupPropsReducer = (state = null, action: IHttpAction) => {
    switch (action.type) {
        case PUT_SETUP_PROPS :
            return action.payload.data;
        case RESET_PUT_SETUP_PROPS_STATUS :
            return {};
        default :
            return state;
    }
};

const returnSetupPropsReducer = (state: Array<IState> = [], action: IAction) => {
    switch (action.type) {
        case ADD_SETUP_DATA: {
            const findIdx = _.findIndex(state, { type: action.dataType });
            if (findIdx > -1) {
                const rejectState = _.reject({...state}, { type: action.dataType });
                return [...rejectState, {type: action.dataType, data: action.payload} ];
            }
            return [...state, { type: action.dataType, data: action.payload } ];
        }
        default :
            return state;
    }
};

export { getSetupPropsReducer, putSetupPropsReducer, returnSetupPropsReducer } ;