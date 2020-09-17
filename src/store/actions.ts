import { ChannelPointsRewardsProfile } from '@components/channel-points-rewards';
import { ChannelPointReward } from '@src/utils/channel-point-rewards';
import { PageType } from '@src/utils/detect-page';

export type Action =
  | SetCurrentPage
  | SetCurrentRewardsAction
  | SetCurrentRewardsProfiles
  | SetOneRewardProfileName
  | SetOneRewardProfileRewards
  | RemoveRewardProfile
  | AddRewardProfile;

interface BaseAction<T extends string> {
  type: T;
}

export interface SetCurrentPage extends BaseAction<'SET_CURRENT_PAGE'> {
  page: PageType;
}

export interface SetCurrentRewardsAction
  extends BaseAction<'SET_CURRENT_REWARDS'> {
  rewards: ChannelPointReward[];
}

export interface SetCurrentRewardsProfiles
  extends BaseAction<'SET_CURRENT_REWARD_PROFILES'> {
  profiles: ChannelPointsRewardsProfile[];
}

export interface SetOneRewardProfileName
  extends BaseAction<'SET_REWARD_PROFILE_NAME'> {
  index: number;
  name: string;
}

export interface SetOneRewardProfileRewards
  extends BaseAction<'SET_REWARD_PROFILE_REWARDS'> {
  index: number;
  rewardIds: string[];
}

export interface RemoveRewardProfile
  extends BaseAction<'REMOVE_REWARD_PROFILE'> {
  index: number;
}

export interface AddRewardProfile extends BaseAction<'ADD_REWARD_PROFILE'> {
  name: string;
  rewardIds: string[];
}
