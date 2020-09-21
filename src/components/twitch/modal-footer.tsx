import React, { FunctionComponent } from 'react';
import { TwitchButton, Props as TwitchButtonProps } from './button';

export interface Props {
  buttons?: TwitchButtonProps[];
}

/**
 * To be used inside `TwitchModal`
 */
export const TwitchModalFooter: FunctionComponent<Props> = ({ buttons }) => {
  const buttonElems =
    buttons &&
    buttons.map((props, i) => (
      <div key={i} className="tw-mg-l-1 tw-inline-flex">
        <TwitchButton {...props} />
      </div>
    ));

  return (
    <div className="tw-elevation-2">
      <div className="tw-align-items-center tw-flex tw-flex-row-reverse tw-justify-content-start tw-pd-x-3 tw-pd-y-2">
        <div
          className="tw-col-6 tw-justify-content-end"
          style={{ textAlign: 'right' }}
        >
          <div className="tw-flex tw-full-width tw-justify-content-end">
            {buttonElems}
          </div>
        </div>
      </div>
    </div>
  );
};
