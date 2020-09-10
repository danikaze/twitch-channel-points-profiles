import React, { FunctionComponent } from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { theme } from '@themes/theme';
import { TwitchDashboardAvatar } from './twitch-dashboard-avatar';
import { msgLog } from '@src/utils/logging';

function useApp() {
  return {
    onClick: () => {
      msgLog('clicked');
    },
  };
}

export const App: FunctionComponent = () => {
  const { onClick } = useApp();

  return (
    <ThemeProvider theme={theme}>
      <TwitchDashboardAvatar onClick={onClick} />
    </ThemeProvider>
  );
};
