import { ResourceLanguage } from 'i18next';

const locales: ResourceLanguage = {
  twitch: {
    modalCloseButtonAriaLabel: 'Cerrar',
  },
  channelPointRewards: {
    sectionTitle: 'Perfiles',
    description:
      'Aquí puedes crear y gestionar perfiles para cambiar entre grupos de recompensas.',
    createNew: 'Crear nuevo perfil con las recompensas actuales',
    selectProfile: 'Activar',
    updateProfile: 'Actualizar',
    editProfile: 'Editar',
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
