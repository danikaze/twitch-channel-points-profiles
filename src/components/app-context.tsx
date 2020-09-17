import React from 'react';
import { Action, initialState, State } from '@src/store';

export interface ContextData {
  dispatch: React.Dispatch<Action>;
  state: State;
}

export const AppContext = React.createContext<ContextData>({
  dispatch: () => {},
  state: initialState,
});

AppContext.displayName = 'AppContext';
