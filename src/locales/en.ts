import { ResourceLanguage } from 'i18next';

const locales: ResourceLanguage = {
  twitch: {
    modalCloseButtonAriaLabel: 'Close',
    modalConfirmationYes: 'Yes',
    modalConfirmationNo: 'No',
  },
  channelPointRewards: {
    sectionTitle: 'Profiles',
    description:
      'Create and manage profiles to easily switch between channel point rewards configurations.',
    createNew: 'Create a new profile with the current rewards',
    selectProfile: 'Select',
    updateProfile: 'Update',
    editProfile: 'Edit',
    deleteConfirmationTitle: 'Delete profile',
    deleteConfirmationMessage:
      'Are you sure you want to delete the profile {{profileName}}?',
  },
  channelPointRewardsEditModal: {
    newTitle: 'Create a new Reward Profile',
    editTitle: 'Edit Reward Profile',
    profileNameLabel: 'Profile name',
    profileNamePlaceholder: 'Give your profile a name',
    closeButtonAria: 'Close',
    cancelButton: 'Cancel',
    saveButton: 'Save',
  },
};

export default locales;
