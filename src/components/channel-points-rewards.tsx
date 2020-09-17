import React, { FunctionComponent, useContext, useEffect } from 'react';
import { Portal } from '@material-ui/core';
import {
  getSettingsRowContainer,
  TwitchSettingsRow,
} from './twitch/settings-row';
import { ChannelPointRewardProfile } from './channel-point-reward-profile';
import { msgLog } from '@src/utils/logging';
import { TwitchButton } from './twitch/button';
import { AppContext } from './app-context';
import {
  addChanelPointRewardsListener,
  ChannelPointReward,
  getActiveRewardIds,
  removeChanelPointRewardsListener,
  setChannelPointRewards,
} from '@src/utils/channel-point-rewards';
import { Action } from '@src/store/actions';

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

  return (
    <Portal container={getPortalContainer()}>{render(props, dispatch)}</Portal>
  );
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

function render(
  { currentRewards, rewardsProfiles }: Props,
  dispatch: React.Dispatch<Action>
): JSX.Element {
  return (
    <TwitchSettingsRow title="Perfiles" noContainer={true}>
      {renderDescription()}
      {renderNewButton()}
      {renderProfiles(rewardsProfiles, currentRewards, dispatch)}
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
  currentRewards: ChannelPointReward[],
  dispatch: React.Dispatch<Action>
): JSX.Element[] {
  const activeRewardIds = getActiveRewardIds(currentRewards);

  const onDelete = (index: number) => {
    dispatch({
      index,
      type: 'REMOVE_REWARD_PROFILE',
    });
  };

  const onSelect = (index: number) => {
    setChannelPointRewards(profiles[index].rewardIds);
    dispatch({
      type: 'SET_CURRENT_REWARDS',
      rewards: currentRewards,
    });
  };

  const onUpdate = (index: number) => {
    dispatch({
      index,
      type: 'SET_REWARD_PROFILE_REWARDS',
      rewardIds: activeRewardIds,
    });
  };

  return profiles.map((profile, i) => {
    return (
      <ChannelPointRewardProfile
        key={i}
        index={i}
        name={profile.name}
        active={isProfileActive(profile, activeRewardIds)}
        onDelete={onDelete}
        onSelect={onSelect}
        onUpdate={onUpdate}
      />
    );
  });
}
