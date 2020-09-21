import React, { FunctionComponent, useEffect } from 'react';
import { TwitchModalBackdrop } from './modal/modal-backdrop';

export interface Props {
  children?: React.ReactNode;
  onClose: () => void;
}

export const TwitchModal: FunctionComponent<Props> = (props) => {
  function onClose(event?: React.MouseEvent<HTMLElement, MouseEvent>): void {
    event?.stopPropagation();
    props.onClose();
  }

  return (
    <TwitchModalBackdrop onClose={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        className="tw-border-radius-large tw-c-background-base tw-elevation-5 tw-flex tw-flex-column tw-full-width tw-modal tw-modal--lg"
      >
        {props.children}
      </div>
    </TwitchModalBackdrop>
  );
};
