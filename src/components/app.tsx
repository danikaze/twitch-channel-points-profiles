import React, {
  FunctionComponent,
  useEffect,
  MouseEventHandler,
  useReducer,
} from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { theme } from '@themes/theme';
import { TwitchDashboardTopButton } from './twitch/dashboard-top-button';
import { msgLog } from '@src/utils/logging';
import { getChannelPointRewards } from '@src/utils/channel-point-rewards';
import { ChannelPointsRewards } from './channel-points-rewards';
import { loadState } from '@src/utils/settings';
import { AppContext, ContextData } from './app-context';
import { detectPage } from '@src/utils/detect-page';
import { reducer, initialState } from '@src/store';
import { detectLang } from '@src/utils/detect-lang';

interface ExtendedAppData extends ContextData {
  onClick: MouseEventHandler<HTMLDivElement>;
}

function useApp(): ExtendedAppData {
  async function urlChangeHandler() {
    const page = detectPage();
    dispatch({ page, type: 'SET_CURRENT_PAGE' });

    if (page === 'channel-point-rewards') {
      const rewards = await getChannelPointRewards();
      dispatch({ rewards, type: 'SET_CURRENT_REWARDS' });
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    let oldhref = '';
    let oldLang: string | undefined = undefined;

    const hrefObserver = new MutationObserver((mutations) => {
      mutations.forEach(() => {
        const newLang = detectLang();
        if (newLang && oldLang !== newLang) {
          oldLang = newLang;
          dispatch({
            type: 'SET_LANG',
            lang: newLang!,
          });
        }

        if (oldhref !== document.location.href) {
          oldhref = document.location.href;
          urlChangeHandler();
        }
      });
    });

    hrefObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    loadState().then((storedState) => {
      dispatch({
        type: 'SET_CURRENT_REWARD_PROFILES',
        profiles: storedState.channelPointsRewardsProfiles,
      });
    });

    return () => {
      hrefObserver.disconnect();
    };
  }, []);

  return {
    state,
    dispatch,
    onClick: () => {
      msgLog('clicked');
    },
  };
}

export const App: FunctionComponent = () => {
  const { onClick, ...contextData } = useApp();

  return (
    <ThemeProvider theme={theme}>
      <AppContext.Provider value={contextData}>
        <TwitchDashboardTopButton onClick={onClick} />
        <AppContext.Consumer>{getContents}</AppContext.Consumer>
      </AppContext.Provider>
    </ThemeProvider>
  );
};

function getContents({ state }: ContextData) {
  if (state.currentPage === 'channel-point-rewards') {
    return (
      <ChannelPointsRewards
        currentRewards={state.currentRewards}
        rewardsProfiles={state.channelPointsRewardsProfiles}
      />
    );
  }
  return null;
}
