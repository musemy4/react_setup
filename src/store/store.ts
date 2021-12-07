import { applyMiddleware, combineReducers, createStore } from 'redux'
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { History } from 'history'

// extension
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

// setup reducer
import adminReducer from "./setup/admin";
import loginReducer from "./login";
import fetchSetupReducer from "./setup/fetchSetup";
import tmpSetupReducer from "./setup/tmpSetup";


const reducers = {
    admin: adminReducer,
    login: loginReducer,
    fetchSetup: fetchSetupReducer,
    tmpSetup: tmpSetupReducer
};


export default function configureStore(history: History) {
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
      composeWithDevTools(applyMiddleware(...middleware))
    );
  }