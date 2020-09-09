import * as React from 'react';
import { render } from 'react-dom';
import { App } from '@components/app';
import { msgLog, msgWarn, msgError, msgTable } from '@utils/logging';

const container = document.createElement('div');
container.id = PACKAGE_NAME;
document.body.appendChild(container);

const app = <App />;
render(app, container);

msgLog('Loaded');
msgWarn('Warn');
msgError('Error');
msgTable({
  // tslint:disable:object-literal-shorthand
  PACKAGE_NAME: PACKAGE_NAME,
  PACKAGE_VERSION: PACKAGE_VERSION,
  COMMIT_HASH: COMMIT_HASH,
  COMMIT_HASH_SHORT: COMMIT_HASH_SHORT,
  IS_PRODUCTION: IS_PRODUCTION,
});
