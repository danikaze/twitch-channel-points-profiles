import React, { FunctionComponent } from 'react';

export const TwitchCard: FunctionComponent = ({ children }) => {
  return (
    <div className="tw-border-radius-small tw-c-background-alt tw-elevation-1 tw-mg-y-1 tw-pd-x-1 tw-pd-y-1">
      {children}
    </div>
  );
};
