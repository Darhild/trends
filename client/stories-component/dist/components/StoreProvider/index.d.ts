import React, { FC, Dispatch } from 'react';
import { State, Action } from '../../services/reducer';
interface Store<S = State> {
    state: S;
    dispatch: Dispatch<Action>;
}
export declare const StoreContext: React.Context<Store<State> | undefined>;
export declare const StoreProvider: FC;
export declare const useStore: () => Store<State>;
export {};
