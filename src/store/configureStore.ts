import { composeWithDevTools } from 'redux-devtools-extension';
import { applyMiddleware, combineReducers, createStore } from 'redux'
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { History } from 'history'
import thunk from 'redux-thunk';
import { reducers } from './index';

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