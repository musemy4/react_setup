import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { History } from 'history'
import thunk from 'redux-thunk';
import { reducers } from '../_reducers';

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
    compose(applyMiddleware(...middleware))
  );
}