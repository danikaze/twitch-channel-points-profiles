import { ResourceLanguage } from 'i18next';

const locales: ResourceLanguage = {
  twitch: {
    modalCloseButtonAriaLabel: 'Cerrar',
    modalConfirmationYes: 'Sí',
    modalConfirmationNo: 'No',
  },
  appSettings: {
    modalTitle: 'Twitch Profiles',
    closeButtonAria: 'Cerrar',
    appSettingsSectionTitle: 'Ajustes de la aplicación',
    appSettingsSectionDescription:
      'Aquí puedes cambiar otras opciones globales de este plugin',
    autoCollectTitle: 'Auto Colección',
    autoCollectDescription:
      'Colecciona puntos de canal extra automáticamente cuando estés viendo otros streams',
    cancelButton: 'Cancelar',
    saveButton: 'Guardar',
  },
  channelPointRewards: {
    sectionTitle: 'Perfiles',
    description:
      'Aquí puedes crear y gestionar perfiles para cambiar entre grupos de recompensas.',
    createNew: 'Crear nuevo perfil con las recompensas actuales',
    selectProfile: 'Activar',
    updateProfile: 'Actualizar',
    editProfile: 'Editar',
    deleteConfirmationTitle: 'Eliminar Perfil',
    deleteConfirmationMessage:
      '¿Seguro que quieres eliminar el perfil {{profileName}}?',
  },
  channelPointRewardsEditModal: {
    newTitle: 'Nuevo Perfil de Recompensas',
    editTitle: 'Editar Perfil de Recompensas',
    profileNameLabel: 'Nombre del perfil',
    profileNamePlaceholder: 'Introduce un nombre para el perfil',
    closeButtonAria: 'Cerrar',
    cancelButton: 'Cancelar',
    saveButton: 'Guardar',
  },
};

export default locales;
