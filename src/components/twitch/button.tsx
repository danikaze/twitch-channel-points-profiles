import React, { FunctionComponent, ReactNode, MouseEventHandler } from 'react';
import clsx from 'clsx';
import { IconType, TwitchIcon } from './icon';

export interface TwitchButtonProps {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children?: ReactNode;
  fullWidth?: boolean;
  type?: 'primary' | 'secondary' | 'icon';
  icon?: IconType;
}

export const TwitchButton: FunctionComponent<TwitchButtonProps> = ({
  children,
  onClick,
  fullWidth,
  type,
  icon,
}) => {
  const buttonClasses = clsx([
    'tw-align-items-center',
    'tw-align-middle',
    'tw-border-bottom-left-radius-medium',
    'tw-border-bottom-right-radius-medium',
    'tw-border-top-left-radius-medium',
    'tw-border-top-right-radius-medium',
    'tw-inline-flex',
    'tw-interactive',
    'tw-justify-content-center',
    'tw-overflow-hidden',
    'tw-relative',
    'tw-core-button',
    fullWidth && 'tw-full-width',
    (!type || type === 'primary') && 'tw-core-button tw-core-button--primary',
    type === 'secondary' && 'tw-core-button tw-core-button--secondary',
    type === 'icon' && 'tw-button-icon',
  ]);
  const div1Classes = clsx([
    'tw-align-items-center',
    'tw-core-button-label',
    icon && 'button-label--icon',
    'tw-flex',
    'tw-flex-grow-0',
  ]);

  const iconElem =
    type === 'icon' || !icon ? null : (
      <div className="tw-mg-r-05 tw-inline-flex tw-align-items-center">
        <TwitchIcon type={icon} />
      </div>
    );

  const labelElem =
    type === 'icon' ? (
      <span className="tw-button-icon__icon">
        <div style={{ width: '2rem', height: '2rem' }}>{children}</div>
      </span>
    ) : (
      <div className="tw-flex-grow-0">{children}</div>
    );

  return (
    <button onClick={onClick} className={buttonClasses}>
      <div className={div1Classes}>
        {iconElem}
        {labelElem}
      </div>
    </button>
  );
};
