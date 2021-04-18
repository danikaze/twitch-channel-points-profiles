import React, { FunctionComponent } from 'react';
import { useTranslation } from '@src/utils/i18n';
import { TwitchCard } from './twitch/card';
import { TwitchButton } from './twitch/button';
import { TwitchIcon } from './twitch/icon';
import { makeStyles } from '@src/utils/styles';

export interface Props {
  index: number;
  name: string;
  active: boolean;
  onSelect: (index: number) => void;
  onDelete: (index: number) => void;
  onUpdate: (index: number) => void;
  onRename: (index: number) => void;
}

const useStyles = makeStyles({
  name: {
    display: 'flex',
    flex: `0 0 58.3333%`,
  },
  actions: {
    display: 'flex',
    flex: `0 0 41.6667%`,
  },
});

export const ChannelPointRewardProfile: FunctionComponent<Props> = ({
  index,
  name,
  active,
  onSelect,
  onDelete,
  onUpdate,
  onRename,
}) => {
  const styles = useStyles();
  const { t } = useTranslation('channelPointRewards');
  const selectCallback = () => onSelect(index);
  const updateCallback = () => onUpdate(index);
  const deleteCallback = () => onDelete(index);
  const renameCallback = () => onRename(index);

  // tslint:disable: jsx-wrap-multiline
  const buttons = [
    <div key="edit" className="tw-mg-l-1">
      <TwitchButton type="secondary" onClick={renameCallback}>
        {t('editProfile')}
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
      <div key="select">
        <TwitchButton type="primary" onClick={selectCallback}>
          {t('selectProfile')}
        </TwitchButton>
      </div>,
      <div key="update" className="tw-mg-l-1">
        <TwitchButton type="secondary" onClick={updateCallback}>
          {t('updateProfile')}
        </TwitchButton>
      </div>
    );
  }
  // tslint:enable: jsx-wrap-multiline

  const nameContainerClasses =
    'tw-align-items-center tw-flex tw-full-height tw-mg-r-1 tw-pd-05';
  const h5Styles: React.CSSProperties | undefined = active
    ? { fontWeight: 'bold' }
    : undefined;

  return (
    <TwitchCard>
      <div className="ScGrid-zg6pp6-0 eeuESu tw-grid">
        <div className={`ScColumn-tzah5l-0 tw-col ${styles.name}`}>
          <div className={nameContainerClasses}>
            <h5 className="tw-ellipsis" style={h5Styles}>
              {name}
            </h5>
          </div>
        </div>
        <div
          className={`tw-col-6 tw-justify-content-end ${styles.actions}`}
          style={{ textAlign: 'right' }}
        >
          <div className="jYDmYT tw-flex tw-full-width tw-justify-content-end tw-pd-05">
            {buttons}
          </div>
        </div>
      </div>
    </TwitchCard>
  );
};
