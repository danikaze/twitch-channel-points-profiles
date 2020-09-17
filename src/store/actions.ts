import { ChannelPointsRewardsProfile } from '@components/channel-points-rewards';
import { ChannelPointReward } from '@src/utils/channel-point-rewards';
import { PageType } from '@src/utils/detect-page';

export type Action =
  | SetCurrentPage
  | SetCurrentRewardsAction
  | SetCurrentRewardsProfiles;

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
