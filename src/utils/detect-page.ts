export type PageType = 'channel-point-rewards' | 'view' | undefined;

export function detectPage(): PageType {
  const pathname = location.pathname;

  if (/community\/channel-points\/rewards$/.test(pathname)) {
    return 'channel-point-rewards';
  }

  if (/^\/[^/]+$/.test(pathname)) {
    return 'view';
  }
}
