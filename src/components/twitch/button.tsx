import React, { FunctionComponent, ReactNode } from 'react';
import clsx from 'clsx';
import { IconType, TwitchIcon } from './icon';

export interface Props {
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  children?: ReactNode;
  fullWidth?: boolean;
  type?: 'primary' | 'secondary' | 'icon';
  icon?: IconType;
  ariaLabel?: string;
  size?: 'medium' | 'small';
  disabled?: boolean;
}

export const TwitchButton: FunctionComponent<Props> = ({
  children,
  onClick,
  fullWidth,
  type,
  icon,
  ariaLabel,
  size,
  disabled,
}) => {
  const onClickHandler = (
    ev: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (disabled) {
      ev.stopPropagation();
      return;
    }
    onClick && onClick(ev);
  };

  const buttonClasses = clsx([
    size === 'medium' && ['tw-align-items-center', 'tw-align-middle'],
    `tw-border-bottom-left-radius-${size}`,
    `tw-border-bottom-right-radius-${size}`,
    `tw-border-top-left-radius-${size}`,
    `tw-border-top-right-radius-${size}`,
    'tw-inline-flex',
    type === 'icon' && ['tw-button-icon', `tw-button-icon--${size}`],
    'tw-interactive',
    'tw-justify-content-center',
    'tw-overflow-hidden',
    'tw-relative',
    'tw-core-button',
    `tw-core-button--${size}`,
    disabled && 'tw-core-button--disabled',
    fullWidth && 'tw-full-width',
    type === 'primary' && 'tw-core-button tw-core-button--primary',
    type === 'secondary' && 'tw-core-button tw-core-button--secondary',
  ]);

  const iconElem =
    type === 'icon' || !icon ? null : (
      <div className="tw-mg-r-05 tw-inline-flex tw-align-items-center">
        <TwitchIcon type={icon} size={size} />
      </div>
    );

  const labelElem =
    type === 'icon' ? (
      <IconLayout size={size}>{children}</IconLayout>
    ) : (
      <div className="tw-flex-grow-0">{children}</div>
    );

  return (
    <button
      onClick={onClickHandler}
      className={buttonClasses}
      aria-label={ariaLabel}
      disabled={disabled}
    >
      <ContentLayout icon={icon} size={size}>
        {iconElem}
        {labelElem}
      </ContentLayout>
    </button>
  );
};

TwitchButton.defaultProps = {
  fullWidth: false,
  type: 'primary',
  size: 'medium',
};

const ContentLayout: FunctionComponent<Pick<
  Props,
  'icon' | 'size' | 'children'
>> = ({ size, children, icon }) => {
  if (size === 'small') return <>{children}</>;

  const classes = clsx([
    'tw-align-items-center',
    'tw-core-button-label',
    icon && 'button-label--icon',
    'tw-flex',
    'tw-flex-grow-0',
  ]);

  return <div className={classes}>{children}</div>;
};

const IconLayout: FunctionComponent<Pick<Props, 'size' | 'children'>> = ({
  size,
  children,
}) => {
  if (size === 'small') {
    return (
      <span className="tw-button-icon__icon">
        <div style={{ width: '1.6rem', height: '1.6rem' }}>{children}</div>
      </span>
    );
  }

  return (
    <span className="tw-button-icon__icon">
      <div style={{ width: '2rem', height: '2rem' }}>{children}</div>
    </span>
  );
};
