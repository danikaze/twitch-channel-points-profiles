import * as React from 'react';
import { render } from 'react-dom';
import { App } from '@components/app';
import { msgLog, msgError } from '@utils/logging';
import { waitUntil } from './utils/wait-until';

function getContainer(): HTMLDivElement | undefined {
  try {
    const parent = document.querySelector('.resize-detector')!.parentElement!
      .parentElement!;
    const container = document.createElement('div');
    container.id = PACKAGE_NAME;
    container.className =
      'tw-align-items-center tw-flex tw-full-height tw-justify-content-end tw-pd-r-1';
    parent.appendChild(container);

    return container;
  } catch (e) {}
}

(async function run() {
  if (!location.href.includes('dashboard')) return;

  let container: HTMLDivElement | undefined;
  try {
    container = await waitUntil(getContainer);
  } catch (e) {
    msgError(`Can't find the container`);
    return;
  }

  const app = <App />;
  render(app, container);

  msgLog('Loaded');
})();
