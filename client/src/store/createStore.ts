import { createStore, applyMiddleware, AnyAction, Middleware } from 'redux';
import { reducer } from './reducers';
import thunk, { ThunkDispatch } from 'redux-thunk';
import logger from 'redux-logger';
import Trend from '../types/trend';

export interface State {
    trends: Trend[];
    [name: string]: any;
}

export type Dispatch = ThunkDispatch<State, void, AnyAction>;

interface StoreExtension {
    dispatch: Dispatch;
}

const middlewares: Middleware[] = [thunk];

if (process.env.NODE_ENV === 'development') {
    middlewares.push(logger);
}

const store = createStore<State, AnyAction, StoreExtension, void>(reducer, applyMiddleware(...middlewares));

export default store;
