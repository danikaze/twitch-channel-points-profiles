import { msgLog } from './logging';

let autoClaimHandler: number | undefined;

export function startAutoClaim(): void {
  if (autoClaimHandler) return;
  msgLog('Starting auto claim');
  autoClaimHandler = window.setInterval(poll, AUTO_CLAIM_POLL_INTERVAL);
}

export function stopAutoClaim(): void {
  if (!autoClaimHandler) return;

  msgLog('Stopping auto claim');
  window.clearInterval(autoClaimHandler);
  autoClaimHandler = undefined;
}

function poll(): void {
  const icon = document.querySelector<HTMLElement>('.claimable-bonus__icon');
  if (icon) {
    msgLog('Auto claiming bonus channel points');
    icon.click();
  }
}
