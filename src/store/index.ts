import { State as ModelState, initialState } from './model';
import { Action as AppAction } from './actions';

export type State = ModelState;
export type Action = AppAction;
export { reducer } from './reducer';
export { initialState };
