import React, { FunctionComponent, RefObject } from 'react';
import { getRandomId } from '@src/utils/get-random-id';
import { makeStyles } from '@src/utils/styles';

export interface Props {
  label?: string;
  placeholder?: string;
  defaultValue?: string;
  inputRef?: RefObject<HTMLInputElement>;
  autoFocus?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const useStyles = makeStyles({
  input: {
    padding: '.5rem 1rem!important',
    fontSize: 'var(--font-size-6)!important',
    borderRadius: 'var(--border-radius-medium)!important',
    fontFamily: 'inherit',
    appearance: 'none',
    backgroundClip: 'padding-box',
    lineHeight: 1.5,
    transition:
      'box-shadow var(--timing-short) ease-in,border var(--timing-short) ease-in,background-color var(--timing-short) ease-in',
    borderStyle: 'solid',
    borderWidth: 'var(--border-width-input)',
    borderColor: 'var(--color-border-input)',
    color: 'var(--color-text-input)',
    backgroundColor: 'var(--color-background-input)',
    display: 'block',
    width: '100%',
    height: '3rem',
    '&:focus, &:focus:hover': {
      outline: 'none',
      borderColor: 'var(--color-border-input-focus)',
      backgroundColor: 'var(--color-background-input-focus)',
    },
    '&:hover': {
      outline: 'none',
      borderColor: 'var(--color-border-input-hover)',
      backgroundColor: 'var(--color-background-input-hover)',
    },
  },
});

const inputClasses = [
  'ScInputBase-sc-1wz0osy-0',
  'ScInput-m6vr9t-0',
  'hIgieY',
  'tw-border-bottom-left-radius-medium',
  'tw-border-bottom-right-radius-medium',
  'tw-border-top-left-radius-medium',
  'tw-border-top-right-radius-medium',
  'tw-font-size-6',
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
  const styles = useStyles();
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
            className={`${inputClasses} ${styles.input}`}
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
