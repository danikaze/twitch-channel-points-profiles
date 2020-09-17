import { State } from '@src/store';
import { msgLog, msgWarn } from './logging';

export type StorableState = Pick<State, 'channelPointsRewardsProfiles'>;
export interface Settings extends StorableState {
  version: string;
}

const defaultSettings: Settings = {
  version: PACKAGE_VERSION,
  channelPointsRewardsProfiles: [
    {
      name: 'Basic',
      rewardIds: [
        'SEND_HIGHLIGHTED_MESSAGE',
        'SINGLE_MESSAGE_BYPASS_SUB_MODE',
        'CHOSEN_SUB_EMOTE_UNLOCK',
        'CHOSEN_MODIFIED_SUB_EMOTE_UNLOCK',
        'RANDOM_SUB_EMOTE_UNLOCK',
      ],
    },
  ],
};

export async function saveState(state: State): Promise<void> {
  const settings: Settings = {
    version: PACKAGE_VERSION,
    channelPointsRewardsProfiles: state.channelPointsRewardsProfiles,
  };

  return saveSettings(settings);
}

export async function loadState(): Promise<
  Pick<State, 'channelPointsRewardsProfiles'>
> {
  const settings = await loadSettings();

  return {
    channelPointsRewardsProfiles: settings.channelPointsRewardsProfiles,
  };
}

async function saveSettings(settings: Settings): Promise<void> {
  return new Promise<void>((resolve) => {
    const strSettings = JSON.stringify(settings);
    chrome.storage.sync.set({ settings: strSettings }, () => {
      resolve();
      msgLog('Settings stored', settings);
    });
  });
}

async function loadSettings(): Promise<Settings> {
  return new Promise((resolve) => {
    chrome.storage.sync.get(['settings'], async ({ settings }) => {
      try {
        if (settings) {
          const json = JSON.parse(settings) as Settings;
          msgLog('Settings loaded', json);
          resolve(await upgradeSettings(json));
        } else {
          msgLog('No settings found, using default ones', defaultSettings);
          resolve(defaultSettings);
        }
      } catch (e) {
        msgWarn(
          'Error parsing the settings, using default ones',
          defaultSettings
        );
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
