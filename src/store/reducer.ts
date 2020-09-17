import { msgLog } from '@src/utils/logging';
import { Action } from './actions';
import { State } from './model';

export function reducer(state: State, action: Action): State {
  let newState = state;

  if (action.type === 'SET_CURRENT_PAGE') {
    newState = {
      ...state,
      currentPage: action.page,
    };
  }

  if (action.type === 'SET_CURRENT_REWARDS') {
    newState = {
      ...state,
      currentRewards: action.rewards,
    };
  }

  if (action.type === 'SET_CURRENT_REWARD_PROFILES') {
    newState = {
      ...state,
      channelPointsRewardsProfiles: action.profiles,
    };
  }

  msgLog(`reducer(${action.type})`, {
    action,
    state,
    newState,
  });
  return newState;
}
