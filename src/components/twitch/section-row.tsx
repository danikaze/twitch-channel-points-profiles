import React, { FunctionComponent } from 'react';

export interface Props {
  title: string;
  description?: string;
}

export const TwitchSectionRow: FunctionComponent<Props> = ({
  title,
  children,
  description,
}) => {
  const cl1 = 'tw-flex-grow-1 tw-font-size-6 tw-form-group tw-relative';
  const cl2 = 'tw-flex-shrink-0 tw-form-group__label-container tw-pd-r-2';

  return (
    <div className="settings-row tw-full-width tw-pd-0">
      <div className="settings-row tw-full-width tw-pd-2">
        <div className={cl1}>
          <div className="tw-flex tw-flex-nowrap">
            <div className={cl2}>
              <div className="tw-mg-b-05">
                <label
                  className="tw-form-label"
                  htmlFor="a7aeda0c987dcc623722a3de64669392"
                >
                  {title}
                </label>
              </div>
            </div>
            <div className="tw-flex-grow-1">
              <div>{children}</div>
              {renderDescription(description)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function renderDescription(text?: string): JSX.Element | null {
  if (!text) return null;

  return (
    <div className="tw-mg-t-1">
      <p data-a-target="profile-username-description" className="tw-c-text-alt">
        {text}
      </p>
    </div>
  );
}
