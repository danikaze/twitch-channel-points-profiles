import { Portal } from '@material-ui/core';
import React, { FunctionComponent, useEffect } from 'react';

export interface Props {
  children?: React.ReactNode;
  onClose: () => void;
}

interface InternalProps extends Omit<Props, 'onClose'> {
  onClose: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

export const TwitchModal: FunctionComponent<Props> = (props) => {
  function onClose(event: React.MouseEvent<HTMLElement, MouseEvent>): void {
    event.stopPropagation();
    props.onClose();
  }

  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      event.stopPropagation();
      props.onClose();
    };

    document.addEventListener('keydown', listener);

    return () => document.removeEventListener('keydown', listener);
  });

  return (
    <Portal container={getModalContainer()}>
      <ModalBackdrop onClose={onClose}>{props.children}</ModalBackdrop>
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

const ModalBackdrop: FunctionComponent<InternalProps> = ({
  onClose,
  children,
}) => {
  const stopPropagation = (event: React.MouseEvent<HTMLElement, MouseEvent>) =>
    event.stopPropagation();

  return (
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
          <Modal>{children}</Modal>
        </div>
      </div>
    </div>
  );
};

const Modal: FunctionComponent = ({ children }) => {
  return (
    <div
      data-test-selector="modal-wrapper__content-test"
      className="modal-wrapper__content modal-wrapper__content--info tw-flex tw-flex-grow-0 tw-full-width tw-justify-content-center tw-relative"
    >
      <div
        role="dialog"
        aria-modal="true"
        className="tw-border-radius-large tw-c-background-base tw-elevation-5 tw-flex tw-flex-column tw-full-width tw-modal tw-modal--lg"
      >
        {children}
      </div>
    </div>
  );
};
