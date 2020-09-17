import React, { FunctionComponent } from 'react';
import { TwitchCard } from './twitch/card';
import { TwitchButton } from './twitch/button';
import { TwitchIcon } from './twitch/icon';

export interface Props {
  index: number;
  name: string;
  active: boolean;
  onSelect: (index: number) => void;
  onDelete: (index: number) => void;
  onUpdate: (index: number) => void;
}

export const ChannelPointRewardProfile: FunctionComponent<Props> = ({
  index,
  name,
  active,
  onSelect,
  onDelete,
  onUpdate,
}) => {
  const selectCallback = () => onSelect(index);
  const updateCallback = () => onUpdate(index);
  const deleteCallback = () => onDelete(index);
  const deleteButton = (
    <div className="tw-mg-l-1 tw-inline-flex">
      <TwitchButton type="icon" onClick={deleteCallback}>
        <TwitchIcon type="trash" />
      </TwitchButton>
    </div>
  );

  const actionButtons = active ? (
    deleteButton
  ) : (
    <>
      <div className="tw-flex tw-full-width tw-justify-content-end">
        <TwitchButton type="secondary" onClick={updateCallback}>
          Actualizar
        </TwitchButton>
        <div className="tw-mg-l-1">
          <TwitchButton type="secondary" onClick={selectCallback}>
            Activar
          </TwitchButton>
        </div>
        {deleteButton}
      </div>
    </>
  );

  const divClasses = 'tw-align-items-center tw-flex tw-full-height tw-pd-05';
  const h5Styles: React.CSSProperties | undefined = active
    ? { fontWeight: 'bold' }
    : undefined;

  return (
    <TwitchCard>
      <div className="tw-grid">
        <div className="tw-col-8">
          <div className={divClasses}>
            <h5 className="tw-ellipsis" style={h5Styles}>
              {name}
            </h5>
          </div>
        </div>
        <div
          className="tw-col-4 tw-justify-content-end"
          style={{ textAlign: 'right' }}
        >
          {actionButtons}
        </div>
      </div>
    </TwitchCard>
  );
};
