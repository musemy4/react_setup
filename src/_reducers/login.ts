import { USER_LOGIN_SUCCESS, USER_LOGIN_FAILURE, USER_LOGIN_RESET, IAction } from '../_actions/types';

const loginReducer = (state = {}, action: IAction) => {
    switch (action.type) {
        case USER_LOGIN_SUCCESS :
            return { ...state, 'login': { status: 'SUCCESS' } };
        case USER_LOGIN_FAILURE :
            return { ...state, 'login': { status: 'FAILURE' } };
        case USER_LOGIN_RESET :
            return {};
        default :
            return state;
    }
};

export default loginReducer;