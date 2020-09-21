import React, { FunctionComponent } from 'react';
import { useTranslation } from '@src/utils/i18n';
import { TwitchButton } from './button';
import { TwitchIcon } from './icon';

export interface Props {
  onClose: () => void;
}

/**
 * To be used inside `TwitchModal`
 */
export const TwitchModalHeader: FunctionComponent<Props> = ({
  children,
  onClose,
}) => {
  const { t } = useTranslation('twitch');

  return (
    <div className="tw-align-items-center tw-flex tw-modal-header tw-modal-header--md tw-pd-b-05 tw-pd-r-1 tw-pd-t-1 tw-relative">
      <div className="tw-flex-grow-1 tw-modal-header__title tw-modal-header__title--md tw-visible">
        <h2
          id="modal-root-header"
          className="tw-font-size-3 tw-line-height-heading tw-semibold tw-title"
        >
          {children}
        </h2>
      </div>
      <div className="tw-align-self-start tw-mg-l-1 tw-modal-header__button">
        <TwitchButton
          onClick={onClose}
          type="icon"
          size="small"
          ariaLabel={t('modalCloseButtonAriaLabel')}
        >
          <TwitchIcon type="close" size="small" />
        </TwitchButton>
      </div>
    </div>
  );
};
