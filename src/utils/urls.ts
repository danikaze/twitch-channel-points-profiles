export function getRewardsUrl(): string | undefined {
  const match = /https:\/\/dashboard.twitch.tv\/u\/[^/]+/.exec(location.href);
  if (!match) return;
  return `${match}/viewer-rewards/channel-points/rewards`;
}
