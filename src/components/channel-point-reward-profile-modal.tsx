import React, { createRef, FunctionComponent, useState } from 'react';
import { useTranslation } from '@src/utils/i18n';
import { Props as TwitchButtonProps } from './twitch/button';
import { TwitchModal } from './twitch/modal';
import { TwitchModalContent } from './twitch/modal-content';
import { TwitchModalFooter } from './twitch/modal-footer';
import { TwitchModalHeader } from './twitch/modal-header';
import { TwitchTextInput } from './twitch/text-input';

export interface Props {
  name?: string;
  onSave: (name: string) => void;
  onCancel: () => void;
}

export const ChannelPointRewardProfileModal: FunctionComponent<Props> = ({
  name,
  onSave,
  onCancel,
}) => {
  const { t } = useTranslation('channelPointRewardsEditModal');
  const [isSaveDisabled, setSaveDisabled] = useState<boolean>(true);
  const nameRef = createRef<HTMLInputElement>();
  const title = name ? t('newTitle') : t('editTitle');

  const saveHandler = () => {
    onSave(nameRef.current!.value);
  };

  const footerButtons: TwitchButtonProps[] = [
    { children: t('cancelButton'), type: 'secondary', onClick: onCancel },
    {
      children: t('saveButton'),
      type: 'primary',
      disabled: isSaveDisabled,
      onClick: saveHandler,
    },
  ];

  const onChange: (event: React.ChangeEvent<HTMLInputElement>) => void = () => {
    const value = nameRef.current!.value;
    setSaveDisabled(!value || value === name);
  };

  return (
    <TwitchModal onClose={onCancel}>
      <TwitchModalHeader onClose={onCancel}>{title}</TwitchModalHeader>
      <TwitchModalContent>
        <TwitchTextInput
          label={t('profileNameLabel')}
          placeholder={t('profileNamePlaceholder')}
          defaultValue={name}
          inputRef={nameRef}
          autoFocus={true}
          onChange={onChange}
        />
      </TwitchModalContent>
      <TwitchModalFooter buttons={footerButtons} />
    </TwitchModal>
  );
};
