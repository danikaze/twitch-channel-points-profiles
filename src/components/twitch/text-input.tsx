import React, { FunctionComponent, RefObject } from 'react';
import { getRandomId } from '@src/utils/get-random-id';

export interface Props {
  label?: string;
  placeholder?: string;
  defaultValue?: string;
  inputRef?: RefObject<HTMLInputElement>;
  autoFocus?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const inputClasses = [
  'tw-block',
  'tw-border-bottom-left-radius-medium',
  'tw-border-bottom-right-radius-medium',
  'tw-border-top-left-radius-medium',
  'tw-border-top-right-radius-medium',
  'tw-font-size-6',
  'tw-full-width',
  'tw-input',
  'tw-pd-l-1',
  'tw-pd-r-1',
  'tw-pd-y-05',
].join(' ');

export const TwitchTextInput: FunctionComponent<Props> = ({
  label,
  placeholder,
  defaultValue,
  inputRef,
  autoFocus,
  onChange,
}) => {
  const inputId = getRandomId();

  return (
    <div
      data-test-selector="name"
      className="tw-flex-grow-1 tw-font-size-6 tw-form-group tw-relative"
    >
      <div>
        {renderLabel(inputId, label)}
        <div className="tw-relative">
          <input
            id={inputId}
            type="text"
            className={inputClasses}
            placeholder={placeholder}
            defaultValue={defaultValue}
            autoCapitalize="off"
            autoCorrect="off"
            data-a-target="tw-input"
            ref={inputRef}
            autoFocus={autoFocus}
            onChange={onChange}
          />
        </div>
      </div>
    </div>
  );
};

function renderLabel(id: string, label?: string): JSX.Element | null {
  return !label ? null : (
    <div className="tw-mg-b-05">
      <label className="tw-form-label" htmlFor={id}>
        {label}
      </label>
    </div>
  );
}
