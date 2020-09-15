import React, { FunctionComponent } from 'react';
import { Portal } from '@material-ui/core';
import {
  getSettingsRowContainer,
  TwitchSettingsRow,
} from './twitch/settings-row';
import { ChannelPointRewardProfile } from './channel-point-reward-profile';
import { msgLog } from '@src/utils/logging';
import { TwitchButton } from './twitch/button';

export interface ChannelPointsRewardsProfile {
  name: string;
  rewardIds: string[];
}

export interface ChannelPointsRewardsProps {
  activeRewards: string[];
  profiles: ChannelPointsRewardsProfile[];
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

export const ChannelPointsRewards: FunctionComponent<ChannelPointsRewardsProps> = ({
  activeRewards,
  profiles,
}) => {
  const parent = document.querySelector('.settings-row')?.parentElement;
  if (!parent) return null;
  const container = getSettingsRowContainer();
  parent.children[0]?.insertAdjacentElement('afterend', container);

  return (
    <Portal container={container}>
      <TwitchSettingsRow title="Perfiles" noContainer={true}>
        {renderDescription()}
        {renderNewButton()}
        {renderProfiles(profiles, activeRewards)}
      </TwitchSettingsRow>
    </Portal>
  );
};

function renderDescription() {
  return (
    <p className="tw-mg-b-05">
      Aquí puedes activar grupo de recompensas fácilmente basado en perfiles que
      puedes crear y gestionar.
    </p>
  );
}

function renderNewButton() {
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
) {
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
