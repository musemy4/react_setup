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
import templateReducer, { ITemplate } from './setup/template';

// menu reducer
import menuListReducer from './menu/getMenuList';
import menuModeReducer from './menu/menuMode';
import menuReducer from './menu/setMenu';
import putMenuReducer from './menu/putMenu';
import putOrdering from './menu/putOrdering';

// interface
import { ISetupBody } from '../components/menu/setup/setup_interface';
import { IMenu, IMode, IPutMenu, IPutOrdering } from '../components/menu/menu/menu_interface';

interface rootState {
   admin: IAdmin | undefined;
   login: ILogin | undefined;
   fetchSetup: ISetupBody | undefined;
   tmpSetup: ISetupBody | undefined;
   getMenuList: any | undefined;
   menuMode: IMode | undefined;
   menu: IMenu | undefined;
   putMenu: IPutMenu | undefined;
   template: ITemplate | undefined;
   putOrdering: IPutOrdering | undefined;
}


const reducers = {
    admin: adminReducer,
    login: loginReducer,
    fetchSetup: fetchSetupReducer,
    tmpSetup: tmpSetupReducer,
    getMenuList: menuListReducer,
    menuMode: menuModeReducer,
    menu: menuReducer,
    putMenu: putMenuReducer,
    template: templateReducer,
    putOrdering,
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