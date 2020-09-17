import { getAncestor } from './get-ancestor';
import { waitUntil, WaitUntilOptions } from './wait-until';

export interface ChannelPointReward {
  id: string;
  name: string;
  enabled: boolean;
  checkbox: HTMLInputElement;
}

export async function getChannelPointRewards(
  options?: Partial<WaitUntilOptions>
): Promise<ChannelPointReward[]> {
  return await waitUntil(() => {
    const rewards = parseChannelPointRewards();
    return rewards && rewards.length ? rewards : undefined;
  }, options);
}

function parseChannelPointRewards(): ChannelPointReward[] | undefined {
  try {
    const rewards: ChannelPointReward[] = Array.from(
      document.querySelectorAll<HTMLInputElement>('input[type="checkbox"]')
    ).map((cb) => {
      const row = getAncestor(cb, (e) => e.classList.contains('tw-grid'));
      const name = row?.querySelector('h5')?.innerText;
      const idElem = getAncestor(
        cb,
        (e) => (e.dataset.rewardId || e.dataset.rewardType) !== undefined
      )!;
      const id = idElem.dataset.rewardId || idElem.dataset.rewardType;

      return {
        id: id!,
        name: name || '',
        enabled: cb.checked,
        checkbox: cb,
      };
    });

    return rewards;
  } catch (e) {
    return;
  }
}

export async function setChannelPointRewards(
  rewardNames: string[]
): Promise<void> {
  const rewards = parseChannelPointRewards();
  if (!rewards) return;

  rewards.forEach(({ id, checkbox }) => {
    // only click it if it needs to change (XOR)
    if ((checkbox.checked ? 1 : 0) ^ (rewardNames.includes(id) ? 1 : 0)) {
      checkbox.click();
    }
  });
}

let lastActiveRewards: string | undefined = undefined;
let mutationObserver: MutationObserver | undefined;

export async function addChanelPointRewardsListener(
  onChange: (rewards: ChannelPointReward[]) => void
): Promise<void> {
  removeChanelPointRewardsListener();
  mutationObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (!(mutation.target instanceof HTMLInputElement)) return;
      const rewards = parseChannelPointRewards();
      if (!rewards) return;

      const activeRewards = getActiveRewardIds(rewards);
      const activeRewardsString = activeRewards.join(',');

      if (activeRewardsString === lastActiveRewards) return;
      onChange(rewards);
      lastActiveRewards = activeRewardsString;
    });
  });
  mutationObserver!.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
  });
}

export function removeChanelPointRewardsListener(): void {
  if (!mutationObserver) return;
  mutationObserver.disconnect();
  mutationObserver = undefined;
}

export function getActiveRewardIds(rewards: ChannelPointReward[]): string[] {
  return rewards.filter((reward) => reward.enabled).map((reward) => reward.id);
}
