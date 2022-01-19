import { applyMiddleware, combineReducers, createStore, Store } from 'redux'
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { History } from 'history'

// extension
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

// setup reducer
import adminReducer, { IAdmin } from "./setup/admin";
import loginReducer, { ILogin } from "./login";
import fetchSetupReducer from "./setup/fetchSetup";
import tmpSetupReducer from "./setup/tmpSetup";
import { ISetupBody } from '../components/menu/setup/setup_interface';

// menu reducer
import menuListReducer from './menu/getMenuList';


interface rootState {
   admin: IAdmin | undefined;
   login: ILogin | undefined;
   fetchSetup: ISetupBody | undefined;
   tmpSetup: ISetupBody | undefined;
}


const reducers = {
    admin: adminReducer,
    login: loginReducer,
    fetchSetup: fetchSetupReducer,
    tmpSetup: tmpSetupReducer,
    menuList: menuListReducer
};


export default function configureStore(history: History, initialState?: rootState): Store<any> {
    const middleware = [
      thunk,
      routerMiddleware(history)
    ];
  
    const rootReducer = combineReducers({
      ...reducers,
      router: connectRouter(history)
    });
  
    return createStore(
      rootReducer,
      initialState,
      composeWithDevTools(applyMiddleware(...middleware))
    );
  }