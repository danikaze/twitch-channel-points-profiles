import React, { FunctionComponent, createRef } from 'react';
import { getRandomId } from '@src/utils/get-random-id';

export interface Props {
  active?: boolean;
  onChange?: (active: boolean) => void;
}

export const TwitchToggle: FunctionComponent<Props> = ({
  active,
  onChange,
}) => {
  const id = getRandomId();
  const inputRef = createRef<HTMLInputElement>();

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();
    onChange && onChange(inputRef.current!.checked);
  };

  return (
    <div className="tw-toggle">
      <input
        className="tw-toggle__input"
        id={id}
        type="checkbox"
        data-a-target="tw-toggle"
        defaultChecked={active}
        ref={inputRef}
        onChange={changeHandler}
      />
      <label htmlFor={id} className="tw-toggle__button" />
    </div>
  );
};
