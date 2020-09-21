import React, { FunctionComponent } from 'react';

export const TwitchSection: FunctionComponent = ({ children }) => {
  const classes = [
    'tw-border-b',
    'tw-border-bottom-left-radius-medium',
    'tw-border-bottom-right-radius-medium',
    'tw-border-l',
    'tw-border-r',
    'tw-border-t',
    'tw-border-top-left-radius-medium',
    'tw-border-top-right-radius-medium',
    'tw-c-background-base',
    'tw-mg-b-4',
  ].join(' ');

  return <div className={classes}>{children}</div>;
};
