import React, { FunctionComponent, Fragment } from 'react';

export type IconType = 'add' | 'close' | 'arrowDown' | 'trash';

const SVG_PATH: { [key in IconType]: JSX.Element[] } = {
  add: [<path d="M9 11v5h2v-5h5V9h-5V4H9v5H4v2h5z" />],
  arrowDown: [<path d="M6.5 5.5L11 10l-4.5 4.5L8 16l6-6-6-6-1.5 1.5z" />],
  close: [
    <path d="M8.5 10L4 5.5 5.5 4 10 8.5 14.5 4 16 5.5 11.5 10l4.5 4.5-1.5 1.5-4.5-4.5L5.5 16 4 14.5 8.5 10z" />,
  ],
  trash: [
    <path d="M12 2H8v1H3v2h14V3h-5V2zM4 7v9a2 2 0 002 2h8a2 2 0 002-2V7h-2v9H6V7H4z" />,
    <path d="M11 7H9v7h2V7z" />,
  ],
};

export interface Props {
  type: IconType;
  size?: 'medium' | 'small';
}

export const TwitchIcon: FunctionComponent<Props> = ({ type, size }) => {
  const path = (SVG_PATH[type] as JSX.Element[]).map((p, i) => (
    <Fragment key={i}>{p}</Fragment>
  ));

  return (
    <Layout size={size}>
      <div className="ScAspectRatio-sc-1sw3lwy-1 dNNaBC tw-aspect">
        <div className="ScAspectSpacer-sc-1sw3lwy-0 gkBhyN" />
        <svg
          width="100%"
          height="100%"
          version="1.1"
          viewBox="0 0 20 20"
          x="0px"
          y="0px"
          className="ScIconSVG-sc-1bgeryd-1 cMQeyU"
        >
          <g>{path}</g>
        </svg>
      </div>
    </Layout>
  );
};

TwitchIcon.defaultProps = {
  size: 'medium',
};

const Layout: FunctionComponent<Pick<Props, 'size'>> = ({ size, children }) => {
  if (size === 'small') {
    return (
      <div className="ScIconLayout-sc-1bgeryd-0 kbOjdP tw-icon">{children}</div>
    );
  }

  return (
    <div className="tw-align-items-center tw-core-button-icon tw-inline-flex">
      <div className="ScIconLayout-sc-1bgeryd-0 cFCmuf tw-icon">{children}</div>
    </div>
  );
};
