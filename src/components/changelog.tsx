import { msgLog } from '@src/utils/logging';
import React, { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';

const changelogMd = CHANGELOG_MD.split('\n').filter(
  (line) => line.trim().length > 0
);

interface MinorVersion {
  version: string;
  changes: string[];
}

export const Changelog: FunctionComponent = () => {
  const { t } = useTranslation('appSettings');
  const versions = getVersions(changelogMd).map(renderVersion);

  return (
    <div className="tw-mg-b-2">
      <h3 className="tw-c-text-alt tw-font-size-4 tw-strong">
        {t('changelog')}
      </h3>
      {versions}
    </div>
  );
};

function renderVersion(version: MinorVersion, i: number): JSX.Element {
  const changes = version.changes.map((text, i) => (
    <p key={i} className="tw-c-text-alt-2 tw-font-size-6">
      - {text}
    </p>
  ));

  return (
    <div className="tw-mg-t-1" key={`${version.version}-${i}`}>
      <div className="tw-c-text-alt-2 tw-strong">{version.version}</div>
      {changes}
    </div>
  );
}

function getVersions(changelog: string[]): MinorVersion[] {
  const versions: MinorVersion[] = [];
  let currentVersion: MinorVersion;

  changelog.forEach((line) => {
    const versionMatch = /^#{3,4}\s*([0-9.]+\s*)$/.exec(line);
    if (versionMatch) {
      if (currentVersion) {
        versions.push(currentVersion);
      }
      currentVersion = {
        version: versionMatch[1],
        changes: [],
      };
    } else {
      currentVersion &&
        currentVersion.changes.push(line.replace(/^\s*-\s*/, ''));
    }
  });
  if (currentVersion!) {
    versions.push(currentVersion!);
  }

  return versions;
}
