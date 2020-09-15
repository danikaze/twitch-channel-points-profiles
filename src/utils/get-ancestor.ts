export function getAncestor<T = HTMLElement>(
  el: HTMLElement,
  callback: (e: HTMLElement) => boolean
): T | undefined {
  let e = el.parentElement;
  while (e) {
    if (callback(e)) return (e as unknown) as T;
    e = e.parentElement;
  }
}
