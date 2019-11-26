import React, { FC, Dispatch, createContext, useContext, useReducer } from 'react';

import { reducer, initialState, State, Action } from '../../services/reducer';

interface Store<S = State> {
  state: S;
  dispatch: Dispatch<Action>;
}

export const StoreContext = createContext<Store | undefined>(undefined);

export const StoreProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};
export const useStore = () => useContext(StoreContext) as Store;
