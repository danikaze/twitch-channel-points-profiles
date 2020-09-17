import React, { FunctionComponent, useContext, useEffect } from 'react';
import { Portal } from '@material-ui/core';
import {
  getSettingsRowContainer,
  TwitchSettingsRow,
} from './twitch/settings-row';
import { ChannelPointRewardProfile } from './channel-point-reward-profile';
import { msgLog } from '@src/utils/logging';
import { TwitchButton } from './twitch/button';
import { AppContext, ContextData } from './app-context';
import {
  addChanelPointRewardsListener,
  ChannelPointReward,
  getActiveRewardIds,
  removeChanelPointRewardsListener,
} from '@src/utils/channel-point-rewards';

export interface Props {
  currentRewards: ChannelPointReward[];
  rewardsProfiles: ChannelPointsRewardsProfile[];
}

export interface ChannelPointsRewardsProfile {
  name: string;
  rewardIds: string[];
}

function isProfileActive(
  profile: ChannelPointsRewardsProfile,
  rewards: string[]
): boolean {
  return (
    profile.rewardIds.sort().join(',').toLowerCase() ===
    rewards.sort().join(',').toLowerCase()
  );
}

export const ChannelPointsRewards: FunctionComponent<Props> = (props) => {
  const { dispatch } = useContext(AppContext);

  useEffect(() => {
    addChanelPointRewardsListener((rewards) => {
      dispatch({
        rewards,
        type: 'SET_CURRENT_REWARDS',
      });
    });

    return removeChanelPointRewardsListener;
  }, []);

  return <Portal container={getPortalContainer()}>{render(props)}</Portal>;
};

function getPortalContainer(): HTMLDivElement | null {
  const CONTAINER_ID = `${PACKAGE_NAME}-channel-profiles`;
  let container: HTMLDivElement | null;

  container = document.getElementById(CONTAINER_ID) as HTMLDivElement;
  if (container) return container;

  const parent = document.querySelector('.settings-row')?.parentElement;
  if (!parent) return null;

  container = getSettingsRowContainer();
  container.id = CONTAINER_ID;
  parent.children[0]?.insertAdjacentElement('afterend', container);

  return container;
}

function render({ currentRewards, rewardsProfiles }: Props): JSX.Element {
  const activeRewardIds = getActiveRewardIds(currentRewards);

  return (
    <TwitchSettingsRow title="Perfiles" noContainer={true}>
      {renderDescription()}
      {renderNewButton()}
      {renderProfiles(rewardsProfiles, activeRewardIds)}
    </TwitchSettingsRow>
  );
}

function renderDescription(): JSX.Element {
  return (
    <p className="tw-mg-b-05">
      Aquí puedes activar grupo de recompensas fácilmente basado en perfiles que
      puedes crear y gestionar.
    </p>
  );
}

function renderNewButton(): JSX.Element {
  const onClick = () => msgLog('new profile');

  return (
    <div className="tw-pd-t-05">
      <TwitchButton type="secondary" icon="add" onClick={onClick}>
        Crear nuevo perfil con las recompensas activas actualmente
      </TwitchButton>
    </div>
  );
}

function renderProfiles(
  profiles: ChannelPointsRewardsProfile[],
  activeRewardIds: string[]
): JSX.Element[] {
  return profiles.map((profile, i) => {
    const onDelete = (name: string) => msgLog(`delete ${name}`);
    const onSelect = (name: string) => msgLog(`select ${name}`);
    const onUpdate = (name: string) => msgLog(`update ${name}`);

    return (
      <ChannelPointRewardProfile
        key={i}
        name={profile.name}
        active={isProfileActive(profile, activeRewardIds)}
        onDelete={onDelete}
        onSelect={onSelect}
        onUpdate={onUpdate}
      />
    );
  });
}
