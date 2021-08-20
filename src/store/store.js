import { createStore,applyMiddleware } from "redux";
import bigReducer from './reducers'
import {composeWithDevTools} from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga'
import saga from './saga/index'

const sagaMiddleware = createSagaMiddleware();
const store = createStore(bigReducer,composeWithDevTools(applyMiddleware(sagaMiddleware)))
sagaMiddleware.run(saga)
export default store;