import React, {
  FunctionComponent,
  useEffect,
  useState,
  MouseEventHandler,
} from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { theme } from '@themes/theme';
import { TwitchDashboardTopButton } from './twitch/dashboard-top-button';
import { msgLog } from '@src/utils/logging';
import {
  getChannelPointRewards,
  ChannelPointReward,
} from '@src/utils/channel-point-rewards';
import { ChannelPointsRewards } from './channel-points-rewards';

type PageType = 'channel-point-rewards' | undefined;

interface AppData {
  currentPage: PageType;
  currentRewards: ChannelPointReward[];
  onClick: MouseEventHandler<HTMLDivElement>;
}

function useApp(): AppData {
  async function urlChangeHandler() {
    let page: PageType = undefined;
    if (/community\/channel-points\/rewards$/.test(location.pathname)) {
      page = 'channel-point-rewards';
      const rewards = await getChannelPointRewards();
      setCurrentRewards(rewards);
      msgLog('currentRewards', rewards);
    }

    msgLog('currentPage', page);
    setCurrentPage(page);
  }

  const [currentPage, setCurrentPage] = useState<PageType>();
  const [currentRewards, setCurrentRewards] = useState<ChannelPointReward[]>(
    []
  );

  useEffect(() => {
    let oldhref = '';
    const hrefObserver = new MutationObserver((mutations) => {
      mutations.forEach(() => {
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

    return () => {
      hrefObserver.disconnect();
    };
  }, []);

  return {
    currentPage,
    currentRewards,
    onClick: () => {
      msgLog('clicked');
    },
  };
}

export const App: FunctionComponent = () => {
  const { onClick, ...appData } = useApp();
  const contents = getContents(appData);

  return (
    <ThemeProvider theme={theme}>
      <TwitchDashboardTopButton onClick={onClick} />
      {contents}
    </ThemeProvider>
  );
};

function getContents(data: Omit<AppData, 'onClick'>) {
  if (data.currentPage === 'channel-point-rewards') {
    const profiles = [
      {
        name: 'Retro',
        rewardIds: [
          '¡Hidratación!',
          'Chat Solo emoticonos',
          'Sugerir encuesta',
          'Guiar raid',
          'Destacar mi mensaje',
        ],
      },
      {
        name: 'Elite Dangerous',
        rewardIds: [
          '¡Hidratación!',
          'Forzar un FSS Scan',
          'Chat Solo emoticonos',
          'Sugerir encuesta',
          'Súbete a mi nave',
          'Guiar raid',
          'Destacar mi mensaje',
          'Enviar un mensaje en modo Solo suscriptores',
          'Seleccionar un emoticono para desbloquearlo',
          'Modificar un emoticono',
          'Desbloquear un emoticono de suscriptor aleatorio',
        ],
      },
    ];

    return (
      <ChannelPointsRewards
        activeRewards={data.currentRewards.map((r) => r.name)}
        profiles={profiles}
      />
    );
  }
  return null;
}
