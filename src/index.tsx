import * as React from 'react';
import { render } from 'react-dom';
import { App } from '@components/app';
import { msgLog, msgError } from '@utils/logging';
import { waitUntil } from './utils/wait-until';

function getContainer(): HTMLDivElement | undefined {
  try {
    let parent: HTMLElement;
    if (/dashboard/.test(location.host)) {
      parent = document.querySelector('.resize-detector')!.parentElement!
        .parentElement!;
    } else {
      parent = document.querySelector('.top-nav__menu')!
        .children[2]! as HTMLElement;
    }
    const container = document.createElement('div');
    container.id = PACKAGE_NAME;
    container.className =
      'tw-align-items-center tw-flex tw-full-height tw-justify-content-end tw-pd-r-1';
    parent.appendChild(container);

    return container;
  } catch (e) {}
}

(async function run() {
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
