import { ChannelPointsRewardsProfile } from '@components/channel-points-rewards';
import { ChannelPointReward } from '@src/utils/channel-point-rewards';
import { PageType } from '@src/utils/detect-page';

export interface State {
  lang?: string;
  currentPage: PageType;
  currentRewards: ChannelPointReward[];
  channelPointsRewardsProfiles: ChannelPointsRewardsProfile[];
}

export const initialState: State = {
  lang: undefined,
  currentPage: undefined,
  currentRewards: [],
  channelPointsRewardsProfiles: [],
};
