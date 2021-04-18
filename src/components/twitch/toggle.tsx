import React, { FunctionComponent, createRef } from 'react';
import { getRandomId } from '@src/utils/get-random-id';
import { makeStyles } from '@src/utils/styles';
import clsx from 'clsx';

export interface Props {
  active?: boolean;
  onChange?: (active: boolean) => void;
}

const useStyles = makeStyles({
  container: {
    display: 'flex',
    position: 'relative',
    flexDirection: 'column',
    lineHeight: '2rem',
  },
  input: {
    position: 'absolute',
    opacity: 0,
  },
  label: {
    display: 'inline-block',
    position: 'relative',
    order: 0,
    width: '3.5rem',
    height: '2rem',
    content: '',
    cursor: 'pointer',
    verticalAlign: 'bottom',
    borderWidth: ' 2px',
    borderStyle: ' solid',
    borderRadius: ' 1rem',
    transitionProperty: 'background-color',
    transitionTimingFunction: 'ease',
    transitionDuration: 'var(--timing-short)',
    borderColor: ' var(--color-border-toggle)',
    backgroundColor: ' var(--color-background-toggle)',
    '&:hover': {
      borderColor: 'white',
    },
    '&::after': {
      content: '""',
      display: 'block',
      position: 'absolute',
      top: '0.2rem',
      bottom: '0.2rem',
      left: '0.2rem',
      width: '1.2rem',
      height: '1.2rem',
      transitionProperty: 'left',
      transitionTimingFunction: 'ease',
      transitionDuration: 'var(--timing-short)',
      borderRadius: 'var(--border-radius-rounded)',
      backgroundColor: 'var(--color-background-toggle-handle)',
    },
  },
  labelActive: {
    borderColor: 'var(--color-border-toggle-checked) !important',
    '&::before': {
      borderWidth: '0px 0px 2px 2px',
      borderStyle: 'solid',
      borderColor: 'var(--color-text-toggle-checked-icon)',
      display: 'block',
      position: 'absolute',
      top: '0.7rem',
      left: '0.8rem',
      width: '0.7rem',
      height: '0.3rem',
      transform: 'translate3d(-50%, -50%, 0px) rotate(-45deg)',
      content: '""',
    },
    '&::after': {
      content: '""',
      left: 'calc((100% - 1.2rem) - 0.2rem)',
      backgroundColor: 'var(--color-background-toggle-checked) !important',
    },
  },
  // label: {
  //   display: 'inline-block',
  //   position: 'relative',
  //   order: 0,
  //   width: '3.5rem',
  //   height: '2rem',
  //   content: '',
  //   cursor: 'pointer',
  //   verticalAlign: 'bottom',
  //   borderWidth: ' 2px',
  //   borderStyle: ' solid',
  //   borderRadius: ' 1rem',
  //   transitionProperty: 'background-color',
  //   transitionTimingFunction: 'ease',
  //   transitionDuration: 'var(--timing-short)',
  //   borderColor: ' var(--color-border-toggle)',
  //   backgroundColor: ' var(--color-background-toggle)',
  //   '&:checked': {
  //     borderColor: 'var(--color-border-toggle-checked)',
  //   },
  //   '&:checked::before': {
  //     borderWidth: '0px 0px 2px 2px',
  //     borderStyle: 'solid',
  //     borderColor: 'var(--color-text-toggle-checked-icon)',
  //     display: 'block',
  //     position: 'absolute',
  //     top: '0.7rem',
  //     left: '0.8rem',
  //     width: '0.7rem',
  //     height: '0.3rem',
  //     transform: 'translate3d(-50%, -50%, 0px) rotate(-45deg)',
  //     content: '',
  //   },
  //   '&:checked::after': {
  //     content: '',
  //     left: 'calc((100% - 1.2rem) - 0.2rem)',
  //     backgroundColor: 'var(--color-background-toggle-checked)',
  //   },
  //   '&::after': {
  //     content: '',
  //     display: 'block',
  //     position: 'absolute',
  //     top: '0.2rem',
  //     bottom: '0.2rem',
  //     left: '0.2rem',
  //     width: '1.2rem',
  //     height: '1.2rem',
  //     transitionProperty: 'left',
  //     transitionTimingFunction: 'ease',
  //     transitionDuration: 'var(--timing-short)',
  //     borderRadius: 'var(--border-radius-rounded)',
  //     backgroundColor: 'var(--color-background-toggle-handle)',
  //   },
  // },
});

export const TwitchToggle: FunctionComponent<Props> = ({
  active,
  onChange,
}) => {
  const styles = useStyles();
  const id = getRandomId();
  const inputRef = createRef<HTMLInputElement>();

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();
    onChange && onChange(inputRef.current!.checked);
  };

  const classesLabel = clsx(
    styles.label,
    active && styles.labelActive,
    'ScToggleButton-sc-796zbf-2',
    'ieSpRt',
    'tw-toggle__button'
  );

  return (
    <div
      className={`${styles.container} ScToggle-sc-796zbf-0 kCtfmS tw-toggle`}
    >
      <input
        className={`${styles.input} ScToggleInput-sc-796zbf-1 doVmsZ tw-toggle__input`}
        id={id}
        type="checkbox"
        data-a-target="tw-toggle"
        defaultChecked={active}
        ref={inputRef}
        onChange={changeHandler}
      />
      <label htmlFor={id} className={classesLabel} />
    </div>
  );
};
