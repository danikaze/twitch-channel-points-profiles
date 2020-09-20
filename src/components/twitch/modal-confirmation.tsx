import React, { FunctionComponent } from 'react';
import { useTranslation } from '@src/utils/i18n';
import { TwitchModalBackdrop } from './modal/modal-backdrop';
import { TwitchButton } from './button';
import { TwitchIcon } from './icon';

export interface Props {
  title: string;
  onYes: () => void;
  onClose: () => void;
}

export const TwitchModalConfirmation: FunctionComponent<Props> = ({
  title,
  children,
  onYes,
  onClose,
}) => {
  function onCancel(event?: React.MouseEvent<HTMLElement, MouseEvent>): void {
    event?.stopPropagation();
    onClose();
  }

  const { t } = useTranslation('twitch');

  return (
    <TwitchModalBackdrop onClose={onCancel}>
      <div className="tw-c-background-base tw-pd-2 vm-edit-cancel-modal">
        <div>
          <h3 className="tw-font-size-3 tw-line-height-heading tw-semibold tw-title">
            {title}
          </h3>
          <div className="tw-pd-y-1">{children}</div>
          <div className="tw-align-content-end tw-align-items-end tw-flex tw-justify-content-end tw-pd-1">
            <div>
              <TwitchButton onClick={onYes} type="destructive">
                {t('modalConfirmationYes')}
              </TwitchButton>
            </div>
            <div className="tw-mg-l-1">
              <TwitchButton onClick={onCancel} type="secondary">
                {t('modalConfirmationNo')}
              </TwitchButton>
            </div>
          </div>
        </div>
        <div className="modal__close-button modal__close-button--inset">
          <TwitchButton
            onClick={onCancel}
            type="icon"
            ariaLabel={t('modalCloseButtonAriaLabel')}
          >
            <TwitchIcon type="close" />
          </TwitchButton>
        </div>
      </div>
    </TwitchModalBackdrop>
  );
};
