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
  onRename: (index: number) => void;
}

export const ChannelPointRewardProfile: FunctionComponent<Props> = ({
  index,
  name,
  active,
  onSelect,
  onDelete,
  onUpdate,
  onRename,
}) => {
  const selectCallback = () => onSelect(index);
  const updateCallback = () => onUpdate(index);
  const deleteCallback = () => onDelete(index);
  const renameCallback = () => onRename(index);

  // tslint:disable: jsx-wrap-multiline
  const buttons = [
    <div key="rename" className="tw-mg-l-1">
      <TwitchButton type="secondary" onClick={renameCallback}>
        Renombrar
      </TwitchButton>
    </div>,
    <div key="delete" className="tw-mg-l-1 tw-inline-flex">
      <TwitchButton type="icon" onClick={deleteCallback}>
        <TwitchIcon type="trash" />
      </TwitchButton>
    </div>,
  ];

  if (!active) {
    buttons.unshift(
      <TwitchButton key="select" type="primary" onClick={selectCallback}>
        Activar
      </TwitchButton>,
      <div key="update" className="tw-mg-l-1">
        <TwitchButton type="secondary" onClick={updateCallback}>
          Actualizar
        </TwitchButton>
      </div>
    );
  }
  // tslint:enable: jsx-wrap-multiline

  const divClasses = 'tw-align-items-center tw-flex tw-full-height tw-pd-05';
  const h5Styles: React.CSSProperties | undefined = active
    ? { fontWeight: 'bold' }
    : undefined;

  return (
    <TwitchCard>
      <div className="tw-grid">
        <div className="tw-col-6">
          <div className={divClasses}>
            <h5 className="tw-ellipsis" style={h5Styles}>
              {name}
            </h5>
          </div>
        </div>
        <div
          className="tw-col-6 tw-justify-content-end"
          style={{ textAlign: 'right' }}
        >
          <div className="tw-flex tw-full-width tw-justify-content-end">
            {buttons}
          </div>
        </div>
      </div>
    </TwitchCard>
  );
};
