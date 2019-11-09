import * as redux from 'redux';
import { State } from '../store/createStore';

interface Reducer extends redux.Reducer {
    (state: State, action: redux.AnyAction): State;
}

export const reducer: Reducer = (state: State, action: redux.AnyAction) =>
    state;
