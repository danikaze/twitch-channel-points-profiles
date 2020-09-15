import React, { FunctionComponent, MouseEventHandler } from 'react';
import iconImg from '@img/icon96.png';
import { TwitchAvatar } from './avatar';

export interface Props {
  onClick?: MouseEventHandler<HTMLDivElement>;
}

export const TwitchDashboardTopButton: FunctionComponent<Props> = ({
  onClick,
}) => {
  return (
    <div className="tw-relative" onClick={onClick}>
      <div style={{ display: 'flex' }}>
        <button className="tw-interactive">
          <TwitchAvatar
            image={chrome.extension.getURL(iconImg)}
            alt={PACKAGE_NAME}
          />
        </button>
      </div>
    </div>
  );
};
