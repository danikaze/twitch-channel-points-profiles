import { ResourceLanguage } from 'i18next';

const locales: ResourceLanguage = {
  twitch: {
    modalCloseButtonAriaLabel: 'モーダルウィンドウを閉じる',
    modalConfirmationYes: 'はい',
    modalConfirmationNo: 'いいえ',
  },
  channelPointRewards: {
    sectionTitle: '報酬プロファイル',
    description:
      '報酬を簡単に変更できるように、こちらに報酬のプロファイルを作成や管理することができます。',
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