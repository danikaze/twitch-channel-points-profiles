import React, { FunctionComponent, ReactNode } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@src/utils/styles';
import { IconType, TwitchIcon } from './icon';

export interface Props {
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  children?: ReactNode;
  fullWidth?: boolean;
  type?: 'primary' | 'secondary' | 'icon' | 'destructive';
  icon?: IconType;
  ariaLabel?: string;
  size?: 'medium' | 'small';
  disabled?: boolean;
}

const useStyles = makeStyles({
  destructive: {
    display: 'inline-flex',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    verticalAlign: 'middle',
    overflow: 'hidden',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    userSelect: 'none',
    width: '100%',
    fontWeight: 600, // 'var(--font-weight-semibold)',
    borderRadius: 'var(--border-radius-medium)',
    fontSize: 'var(--button-text-default)',
    height: 'var(--button-size-default)',
    backgroundColor: 'var(--color-background-button-destructive-default)',
    color: 'var(--color-text-button-destructive)',
  },
});

export const TwitchButton: FunctionComponent<Props> = ({
  children,
  onClick,
  type,
  icon,
  ariaLabel,
  size,
  disabled,
}) => {
  const styles = useStyles();
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
    // size === 'medium' && ['tw-align-items-center', 'tw-align-middle'],
    `ScCoreButton-sc-1qn4ixc-0`,
    // `tw-border-bottom-left-radius-${size}`,
    // `tw-border-bottom-right-radius-${size}`,
    // `tw-border-top-left-radius-${size}`,
    // `tw-border-top-right-radius-${size}`,
    // 'tw-inline-flex',
    type === 'icon' && ['tw-button-icon', `tw-button-icon--${size}`],
    // 'tw-interactive',
    // 'tw-justify-content-center',
    // 'tw-overflow-hidden',
    // 'tw-relative',
    'tw-core-button',
    // `tw-core-button--${size}`,
    // disabled && 'tw-core-button--disabled',
    type === 'primary' &&
      'tw-core-button ScCoreButtonPrimary-sc-1qn4ixc-1 jeBpig',
    type === 'secondary' &&
      'tw-core-button ScCoreButtonSecondary-sc-1qn4ixc-2 kMLrvA',
    type === 'destructive' &&
      `${styles.destructive} ScCoreButtonDestructive-sc-1qn4ixc-4 hHDQZJ`,
  ]);

  const iconElem =
    type === 'icon' || !icon ? null : (
      <div className="tw-align-items-center tw-flex tw-mg-r-05">
        <TwitchIcon type={icon} size={size} />
      </div>
    );

  const labelElem =
    type === 'icon' ? (
      <IconLayout size={size}>{children}</IconLayout>
    ) : (
      <div className="tw-align-items-center tw-flex tw-flex-grow-0 tw-justify-content-start">
        {children}
      </div>
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
  'icon' | 'size' | 'children' | 'type'
>> = ({ size, children, icon, type }) => {
  if (size === 'small') return <>{children}</>;

  const classes = clsx([
    'ScCoreButtonLabel-lh1yxp-0',
    type === 'destructive' ? 'xsINH' : 'bUTtZU',
    'tw-core-button-label',
    icon && 'button-label--icon',
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
