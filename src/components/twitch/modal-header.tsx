import React, { FunctionComponent } from 'react';
import { useTranslation } from '@src/utils/i18n';
import { TwitchButton } from './button';
import { TwitchIcon } from './icon';
import { makeStyles } from '@src/utils/styles';

export interface Props {
  onClose: () => void;
}

const useStyles = makeStyles({
  title: {
    marginTop: '.9rem',
    marginLeft: '3rem',
  },
});

/**
 * To be used inside `TwitchModal`
 */
export const TwitchModalHeader: FunctionComponent<Props> = ({
  children,
  onClose,
}) => {
  const styles = useStyles();
  const { t } = useTranslation('twitch');

  return (
    <div className="tw-align-items-center tw-flex tw-modal-header tw-modal-header--md tw-pd-b-05 tw-pd-r-1 tw-pd-t-1 tw-relative">
      <div
        className={`${styles.title} ScModalHeaderTitle-sc-169x2gu-2 bPUPaA tw-modal-header__title tw-flex-grow-1 tw-modal-header__title tw-modal-header__title--md tw-visible`}
      >
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
