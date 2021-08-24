import { 
    ADMIN_CREATE_SUCCESS, 
    ADMIN_CREATE_FAILURE,
    ADMIN_CREATE_FAILURE_DUPLICATE,
    ADMIN_AUTH_RESET_SUCCESS, 
    ADMIN_AUTH_RESET_FAILURE,
    ADMIN_PW_RESET_SUCCESS ,
    ADMIN_PW_RESET_FAILURE,
    ADMIN_STATUS_RESET,
    IAction
}  from '../_actions/types';

const adminReducer = (state = {}, action: IAction) => {
    switch (action.type) {
        case ADMIN_CREATE_SUCCESS :
            return { ...state, 'admin': { type: 'create', status: 'SUCCESS' } };
        case ADMIN_CREATE_FAILURE :
            return { ...state, 'admin': { type: 'create', status: 'FAILURE' } };
        case ADMIN_CREATE_FAILURE_DUPLICATE :
            return { ...state, 'admin': { type: 'create', status: 'DUPLICATE' } };
        case ADMIN_AUTH_RESET_SUCCESS :
            return { ...state, 'admin': { type: 'auth', status: 'SUCCESS' } };
        case ADMIN_AUTH_RESET_FAILURE :
            return { ...state, 'admin': { type: 'auth', status: 'FAILURE' } };
        case ADMIN_PW_RESET_SUCCESS :
            return { ...state, 'admin': { type: 'pw', status: 'SUCCESS' } };
        case ADMIN_PW_RESET_FAILURE :
            return { ...state, 'admin': { type: 'pw', status: 'FAILURE' } };
        case ADMIN_STATUS_RESET :
            return { ...state, 'admin': {} }
        default :
            return state;
    }
};

export default adminReducer;