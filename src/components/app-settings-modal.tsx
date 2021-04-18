import React, { FunctionComponent, useState } from 'react';
import { Action } from '@src/store';
import { useTranslation } from '@src/utils/i18n';
import { TwitchModal } from './twitch/modal';
import { TwitchModalFooter } from './twitch/modal-footer';
import { TwitchModalHeader } from './twitch/modal-header';
import { Props as TwitchButtonProps } from './twitch/button';
import { TwitchModalContent } from './twitch/modal-content';
import {
  AppSettings,
  areAppSettingsEqual,
  BoolAppSettings,
} from '@src/store/model';
import { TwitchToggle } from './twitch/toggle';
import { TwitchSection } from './twitch/section';
import { TwitchSectionRow } from './twitch/section-row';
import { Changelog } from './changelog';
import { getRewardsUrl } from '@src/utils/urls';

export interface Props {
  settings: AppSettings;
  dispatch: React.Dispatch<Action>;
  onClose: () => void;
}

const useAppSettings = (props: Props) => {
  const [isSaveDisabled, setSaveDisabled] = useState<boolean>(true);
  const [currentSettings, setCurrentSettings] = useState<AppSettings>({
    ...props.settings,
  });

  const checkSettingsChanges = () => {
    const equal = areAppSettingsEqual(props.settings, currentSettings);
    setSaveDisabled(equal);
  };

  const boolChange = (key: BoolAppSettings, value: boolean): void => {
    currentSettings[key] = value;
    setCurrentSettings(currentSettings);
    checkSettingsChanges();
  };

  const onSave = () => {
    props.onClose();
    props.dispatch({
      type: 'SET_APP_SETTINGS',
      settings: currentSettings,
      save: true,
    });
  };

  return {
    currentSettings,
    isSaveDisabled,
    boolChange,
    onSave,
    onClose: props.onClose,
  };
};

export const AppSettingsModal: FunctionComponent<Props> = (props) => {
  const {
    currentSettings,
    isSaveDisabled,
    boolChange,
    onSave,
    onClose,
  } = useAppSettings(props);
  const { t } = useTranslation('appSettings');

  const footerButtons: TwitchButtonProps[] = [
    {
      children: t('cancelButton'),
      type: 'secondary',
      onClick: onClose,
      ariaLabel: t('closeButtonAria'),
    },
    {
      children: t('saveButton'),
      type: 'primary',
      disabled: isSaveDisabled,
      onClick: onSave,
    },
  ];

  const rewardsShortcutUrl = getRewardsUrl();
  const rewardsShortcutLinkElem = rewardsShortcutUrl && (
    <div className="tw-mg-b-2">
      <div>
        <a href={rewardsShortcutUrl}>{t('rewardsShortcutLink')}</a>
      </div>
    </div>
  );

  return (
    <TwitchModal onClose={onClose}>
      {/* Dialog title */}
      <TwitchModalHeader onClose={onClose}>{t('modalTitle')}</TwitchModalHeader>

      {/* App Settings */}
      <TwitchModalContent>
        {rewardsShortcutLinkElem}

        {/* Channel Points Rewards */}
        <div className="tw-mg-b-2">
          <h3 className="tw-c-text-alt tw-font-size-4 tw-strong">
            {t('appSettingsSectionTitle')}
          </h3>
          <div className="tw-mg-t-1">
            <p className="tw-c-text-alt-2">
              {t('appSettingsSectionDescription')}
            </p>
          </div>
        </div>

        {/* Auto Claim Bonus */}
        <TwitchSection>
          <TwitchSectionRow
            title={t('autoCollectTitle')}
            description={t('autoCollectDescription')}
          >
            <TwitchToggle
              active={currentSettings.autoCollectChannelPoints}
              // tslint:disable-next-line:react-this-binding-issue
              onChange={boolChange.bind(undefined, 'autoCollectChannelPoints')}
            />
          </TwitchSectionRow>
        </TwitchSection>

        {/* Change Log */}
        <Changelog />
      </TwitchModalContent>
      <TwitchModalFooter buttons={footerButtons} />
    </TwitchModal>
  );
};
