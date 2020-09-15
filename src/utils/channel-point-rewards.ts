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
  (await getChannelPointRewards()).forEach(({ name, checkbox }) => {
    checkbox.checked = rewardNames.includes(name!);
  });
}
