import { createStore, applyMiddleware, AnyAction } from 'redux';
import { reducer } from './reducers';
import thunk, { ThunkDispatch } from 'redux-thunk';
import Trend from '../types/trend';
import { items } from '../feed.json';

export interface State {
    trends: Trend[];
}

interface StoreExtension {
    dispatch: ThunkDispatch<State, void, AnyAction>;
}

const trends: any[] = items[0].includes;
const initialState = {
    trends: trends.map(({ title, thumbnail }: any) => ({ desc: title, img: thumbnail }) ),
};
const store = createStore<State, AnyAction, StoreExtension, void>(reducer, initialState, applyMiddleware(thunk));

export default store;
