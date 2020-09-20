import React, { FunctionComponent } from 'react';

/**
 * To be used inside `TwitchModal`
 */
export const TwitchModalContent: FunctionComponent = ({ children }) => {
  return (
    <div className="tw-flex-grow-1 tw-overflow-auto tw-pd-x-2 tw-pd-y-1">
      {children}
      <div className="tw-mg-t-2" />
    </div>
  );
};
