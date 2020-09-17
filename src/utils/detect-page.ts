export type PageType = 'channel-point-rewards' | undefined;

export function detectPage() {
  const pathname = location.pathname;
  let page: PageType = undefined;

  if (/community\/channel-points\/rewards$/.test(pathname)) {
    page = 'channel-point-rewards';
  }

  return page;
}
