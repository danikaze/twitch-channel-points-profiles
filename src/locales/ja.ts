import { ResourceLanguage } from 'i18next';

const locales: ResourceLanguage = {
  twitch: {
    modalCloseButtonAriaLabel: 'モーダルウィンドウを閉じる',
    modalConfirmationYes: 'はい',
    modalConfirmationNo: 'いいえ',
  },
  appSettings: {
    rewardsShortcutLink: '報酬のページへ',
    modalTitle: 'Twitch Profiles',
    closeButtonAria: '保存せずに閉じる',
    appSettingsSectionTitle: 'アプリ設定',
    appSettingsSectionDescription: 'この画面でアプリの設定を編集できます。',
    autoCollectTitle: 'ボーナスを自動獲得',
    autoCollectDescription: 'クリックせずにボーナスポイントを獲得できます。',
    changelog: 'Change Log',
    cancelButton: 'キャンセル',
    saveButton: '保存',
  },
  channelPointRewards: {
    sectionTitle: '報酬プロファイル',
    description:
      '報酬を簡単に変更できるよう、こちらで報酬プロファイルの作成や管理をできます',
    createNew: '新たな報酬プロファイルを追加',
    selectProfile: '使う',
    updateProfile: '更新',
    editProfile: '編集',
    deleteConfirmationTitle: 'プロファイルを削除',
    deleteConfirmationMessage: 'この{{profileName}}を削除してもよろしいですか?',
  },
  channelPointRewardsEditModal: {
    newTitle: '新たな報酬プロファイル',
    editTitle: '報酬プロファイルを編集',
    profileNameLabel: 'プロファイル名',
    profileNamePlaceholder: '報酬のプロファイルに名前をつけましょう',
    closeButtonAria: '閉じる',
    cancelButton: 'キャンセル',
    saveButton: '保存',
  },
};

export default locales;
