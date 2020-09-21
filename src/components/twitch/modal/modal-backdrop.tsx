import React, { FunctionComponent, useEffect } from 'react';
import { Portal } from '@material-ui/core';

export interface Props {
  children: React.ReactNode;
  onClose: (event?: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

/**
 * Internally used by Modal and ModalConfirmation
 */
export const TwitchModalBackdrop: FunctionComponent<Props> = ({
  onClose,
  children,
}) => {
  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      event.stopPropagation();
      onClose();
    };

    document.addEventListener('keydown', listener);

    return () => document.removeEventListener('keydown', listener);
  });

  const stopPropagation = (event: React.MouseEvent<HTMLElement, MouseEvent>) =>
    event.stopPropagation();

  return (
    <Portal container={getModalContainer()}>
      <div
        onClick={onClose}
        className="ReactModal__Overlay ReactModal__Overlay--after-open modal__backdrop js-modal-backdrop"
      >
        <div
          onClick={stopPropagation}
          className="ReactModal__Content ReactModal__Content--after-open modal__content"
          tabIndex={-1}
          role="dialog"
          aria-label="Modal"
          aria-labelledby="modal-root-header"
          aria-describedby="modal-description-id"
        >
          <div
            data-test-selector="modal-wrapper__backdrop-test"
            className="modal-wrapper__backdrop modal-wrapper__backdrop--info tw-align-items-start tw-flex tw-full-height tw-full-width tw-justify-content-center"
          >
            <div
              data-test-selector="modal-wrapper__content-test"
              className="modal-wrapper__content modal-wrapper__content--info tw-flex tw-flex-grow-0 tw-full-width tw-justify-content-center tw-relative"
            >
              {children}
            </div>
          </div>
        </div>
      </div>
    </Portal>
  );
};

function getModalContainer(): HTMLDivElement {
  let portalElem = document.getElementsByClassName(
    'ReactModalPortal'
  )[0] as HTMLDivElement;

  if (!portalElem) {
    portalElem = document.createElement('div');
    portalElem.className = 'ReactModalPortal';
    document.body.appendChild(portalElem);
  }

  return portalElem;
}
