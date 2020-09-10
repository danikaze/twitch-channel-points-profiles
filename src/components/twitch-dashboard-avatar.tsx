import React, { FunctionComponent, MouseEventHandler } from 'react';
import iconImg from '@img/icon96.png';

export interface Props {
  onClick?: MouseEventHandler<HTMLDivElement>;
}

export const TwitchDashboardAvatar: FunctionComponent<Props> = ({
  onClick,
}) => {
  return (
    <div className="tw-relative" onClick={onClick}>
      <div style={{ display: 'flex' }}>
        <button
          className="tw-interactive"
          data-a-target="user-menu-toggle"
          aria-expanded="false"
        >
          <TwitchAvatar />
        </button>
      </div>
    </div>
  );
};

const TwitchAvatar: FunctionComponent = () => {
  return (
    <figure
      aria-label="Avatar de usuario"
      className="tw-avatar tw-avatar--size-30"
    >
      <img
        className="tw-block tw-border-radius-rounded tw-image tw-image-avatar"
        alt="Avatar de usuario"
        src={chrome.extension.getURL(iconImg)}
      />
    </figure>
  );
};
