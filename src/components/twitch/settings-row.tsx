import React, { FunctionComponent, ReactNode } from 'react';

interface TwitchSettingsRowProps {
  title: string;
  noContainer?: boolean;
  children?: ReactNode;
}

const CONTAINER_CLASS = 'settings-row tw-full-width tw-pd-2';

export function getSettingsRowContainer(): HTMLDivElement {
  const container = document.createElement('div');
  container.className = CONTAINER_CLASS;

  return container;
}

export const TwitchSettingsRow: FunctionComponent<TwitchSettingsRowProps> = ({
  title,
  children,
  noContainer,
}) => {
  // tslint:disable:max-line-length
  const content = (
    <div className="tw-flex-grow-1 tw-font-size-6 tw-form-group tw-relative">
      <div className="tw-flex tw-flex-nowrap">
        <div className="ScFormGroupLabel-sc-18zen7a-0 jTtlBn tw-flex-shrink-0 tw-form-group__label-container tw-pd-r-2">
          <div className="tw-mg-b-05">
            <label className="ScFormLabel-sc-1oiqww5-0 glvLeV tw-form-label">
              {title}
            </label>
          </div>
        </div>
        <div className="tw-flex-grow-1">{children}</div>
      </div>
    </div>
  );

  return noContainer ? (
    content
  ) : (
    <div className={CONTAINER_CLASS}>{content}</div>
  );
};
