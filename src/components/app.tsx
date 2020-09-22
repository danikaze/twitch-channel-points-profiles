import React, {
  FunctionComponent,
  useEffect,
  MouseEventHandler,
  useReducer,
  useState,
} from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { theme } from '@themes/theme';
import { TwitchDashboardTopButton } from './twitch/dashboard-top-button';
import { getChannelPointRewards } from '@src/utils/channel-point-rewards';
import { ChannelPointsRewards } from './channel-points-rewards';
import { loadState } from '@src/utils/settings';
import { AppContext, ContextData } from './app-context';
import { detectPage } from '@src/utils/detect-page';
import { reducer, initialState } from '@src/store';
import { detectLang } from '@src/utils/detect-lang';
import { AppSettingsModal } from './app-settings-modal';
import { startAutoClaim, stopAutoClaim } from '@src/utils/auto-claim';

interface ExtendedAppData extends ContextData {
  isAppSettingsModalOpen: boolean;
  closeSettingsModal: () => void;
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

  function checkAutoClaiming() {
    if (!state) return;

    if (
      state.currentPage === 'view' &&
      state.appSettings.autoCollectChannelPoints
    ) {
      startAutoClaim();
    } else {
      stopAutoClaim();
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);
  const [isAppSettingsModalOpen, setAppSettingsModalOpen] = useState<boolean>(
    false
  );
  const closeSettingsModal = () => setAppSettingsModalOpen(false);

  checkAutoClaiming();

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
        type: 'SET_APP_SETTINGS',
        settings: storedState.appSettings,
        save: false,
      });
      dispatch({
        type: 'SET_CURRENT_REWARD_PROFILES',
        profiles: storedState.channelPointsRewardsProfiles,
      });
    });

    return () => {
      hrefObserver.disconnect();
      stopAutoClaim();
    };
  }, []);

  return {
    state,
    dispatch,
    isAppSettingsModalOpen,
    closeSettingsModal,
    onClick: () => {
      setAppSettingsModalOpen(true);
    },
  };
}

export const App: FunctionComponent = () => {
  const {
    onClick,
    isAppSettingsModalOpen,
    closeSettingsModal,
    ...contextData // tslint:disable-line:trailing-comma
  } = useApp();

  return (
    <ThemeProvider theme={theme}>
      <AppContext.Provider value={contextData}>
        <TwitchDashboardTopButton onClick={onClick} />
        <AppContext.Consumer>
          {getContents(isAppSettingsModalOpen, closeSettingsModal)}
        </AppContext.Consumer>
      </AppContext.Provider>
    </ThemeProvider>
  );
};

const getContents = (
  isAppSettingsModalOpen: boolean,
  closeSettingsModal: () => void
) => ({ state, dispatch }: ContextData): JSX.Element[] => {
  const contents: JSX.Element[] = [];

  if (isAppSettingsModalOpen) {
    contents.push(
      <AppSettingsModal
        key="app-settings"
        settings={state.appSettings}
        dispatch={dispatch}
        onClose={closeSettingsModal}
      />
    );
  }

  if (state.currentPage === 'channel-point-rewards') {
    contents.push(
      <ChannelPointsRewards
        key="page-contents"
        currentRewards={state.currentRewards}
        rewardsProfiles={state.channelPointsRewardsProfiles}
      />
    );
  }

  return contents;
};
