import React, { createRef, FunctionComponent, useState } from 'react';
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
  const [isSaveDisabled, setSaveDisabled] = useState<boolean>(true);
  const nameRef = createRef<HTMLInputElement>();
  const title = name
    ? 'Editar perfil de recompensas'
    : 'Nuevo perfil de recompensas';

  const saveHandler = () => {
    onSave(nameRef.current!.value);
  };

  const footerButtons: TwitchButtonProps[] = [
    { children: 'Cancelar', type: 'secondary', onClick: onCancel },
    {
      children: 'Guardar',
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
          label="Profile name"
          placeholder="Introduce un nombre para el perfil"
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
