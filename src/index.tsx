import * as React from 'react';
import { render } from 'react-dom';
import { App } from '@components/app';

const container = document.createElement('div');
container.id = PACKAGE_NAME;
document.body.appendChild(container);

const app = <App />;
render(app, container);

console.log({
  PACKAGE_NAME: PACKAGE_NAME,
  PACKAGE_VERSION: PACKAGE_VERSION,
  COMMIT_HASH: COMMIT_HASH,
  COMMIT_HASH_SHORT: COMMIT_HASH_SHORT,
  IS_PRODUCTION: IS_PRODUCTION,
});
