import { msgLog } from '@src/utils/logging';
import { saveState } from '@src/utils/settings';
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

  if (action.type === 'SET_REWARD_PROFILE_NAME') {
    newState = {
      ...state,
      channelPointsRewardsProfiles: [...state.channelPointsRewardsProfiles],
    };
    newState.channelPointsRewardsProfiles[action.index].name = action.name;
    saveState(newState);
  }

  if (action.type === 'SET_REWARD_PROFILE_REWARDS') {
    newState = {
      ...state,
      channelPointsRewardsProfiles: [...state.channelPointsRewardsProfiles],
    };
    newState.channelPointsRewardsProfiles[action.index].rewardIds =
      action.rewardIds;

    saveState(newState);
  }

  if (action.type === 'REMOVE_REWARD_PROFILE') {
    newState = {
      ...state,
      channelPointsRewardsProfiles: [...state.channelPointsRewardsProfiles],
    };
    newState.channelPointsRewardsProfiles.splice(action.index, 1);
    saveState(newState);
  }

  if (action.type === 'ADD_REWARD_PROFILE') {
    newState = {
      ...state,
      channelPointsRewardsProfiles: [
        {
          name: action.name,
          rewardIds: action.rewardIds,
        },
        ...state.channelPointsRewardsProfiles,
      ],
    };
    saveState(newState);
  }

  msgLog(`reducer(${action.type})`, {
    action,
    state,
    newState,
  });
  return newState;
}
