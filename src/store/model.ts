import { ChannelPointsRewardsProfile } from '@components/channel-points-rewards';
import { ChannelPointReward } from '@src/utils/channel-point-rewards';
import { PageType } from '@src/utils/detect-page';

export interface AppSettings {
  autoCollectChannelPoints: boolean;
}
export type BoolAppSettings = PickKeys<AppSettings, boolean>;

export interface State {
  appSettings: AppSettings;
  lang?: string;
  currentPage: PageType;
  currentRewards: ChannelPointReward[];
  channelPointsRewardsProfiles: ChannelPointsRewardsProfile[];
}

export const initialState: State = {
  appSettings: {
    autoCollectChannelPoints: true,
  },
  lang: undefined,
  currentPage: undefined,
  currentRewards: [],
  channelPointsRewardsProfiles: [],
};

export function areAppSettingsEqual(
  oldSettings: AppSettings,
  newSettings: AppSettings
): boolean {
  return (
    oldSettings.autoCollectChannelPoints ===
    newSettings.autoCollectChannelPoints
  );
}
