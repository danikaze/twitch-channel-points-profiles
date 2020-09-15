import { ChannelPointsRewardsProfile } from '@components/channel-points-rewards';
import { msgLog } from './logging';

export interface Settings {
  version: string;
  channelPointRewardProfiles: ChannelPointsRewardsProfile[];
}

const defaultSettings: Settings = {
  version: PACKAGE_VERSION,
  channelPointRewardProfiles: [],
};

export async function saveSettings(settings: Settings): Promise<void> {
  return new Promise<void>((resolve) => {
    chrome.storage.sync.set({ settings }, () => {
      resolve();
      msgLog('Settings stored', settings);
    });
  });
}

export async function loadSettings(): Promise<Settings> {
  return new Promise((resolve) => {
    chrome.storage.sync.get('settings', async ({ settings }) => {
      if (settings) {
        msgLog('Settings loaded', settings);
        resolve(await upgradeSettings(settings));
      } else {
        msgLog('No settings found, using default ones', defaultSettings);
        resolve(defaultSettings);
      }
    });
  });
}

async function upgradeSettings(settings: Settings): Promise<Settings> {
  if (settings.version === PACKAGE_VERSION) {
    return settings;
  }
  msgLog(`Upgrading settings from ${settings.version} to ${PACKAGE_VERSION}`);

  // needed updates here

  // store update settings
  settings.version = PACKAGE_VERSION;
  await saveSettings(settings);

  return settings;
}
