import { AdminAddon, DevAddon } from 'types/Addons';
import { v4 } from 'uuid';

export const useGetDefaultAddons = () => {
  const _newSectionId = `id_${v4()}`;

  const defaultAdminAddon: AdminAddon = {
    id: `id_${v4()}`,
    tagLine: 'Blank Addons for admin',
    label: 'Blank Addons',
    positionEnabled: true,
    sectionId: _newSectionId,
    isNew: true,
    canAddMulti: true,
    type: 'built-in',
    logo: '',
    image: undefined,
    commandId: '',
    detail: '',
    body: {
      id: _newSectionId,
      commandId: '',
      megaMenuCommandIds: [],
      category: {
        commandId: '',
        name: '',
        description: '',
      },
      enable: true,
      label: 'Blank Addons for admin',
      type: 'built-in-add-ons',
      addonIds: [],
      currentVersion: '0',
      syncedToServices: null,
      data: {
        liquid: '<div data-id="{{uniqueId}}">\n  <div class="container">\n    <edit-code />\n  </div>\n</div>',
        scss: '',
        settings: [],
        schema: {
          settings: [],
          blocks: [],
        },
      },
    },
    category: {
      commandId: '',
      name: '',
      description: '',
    },
    syncedToServices: null,
    authorName: '',
    currentVersion: '0',
    enable: true,
  };

  const defaultDevAddon: DevAddon = {
    id: `id_${v4()}`,
    enable: true,
    tagLine: 'Blank Addons for dev',
    label: 'Blank Addons',
    positionEnabled: true,
    sectionId: _newSectionId,
    isNew: true,
    canAddMulti: true,
    type: 'built-in',
    logo: '',
    image: undefined,
    commandId: '',
    parentCommandId: '',
    userId: 0,
    body: {
      commandId: '',
      status: 'draft',
      megaMenuCommandIds: [],
      id: _newSectionId,
      category: {
        commandId: '',
        name: '',
        description: 'other',
      },
      enable: true,
      label: 'Blank Addons for dev',
      type: 'built-in-add-ons',
      data: {
        liquid: '<div data-id="{{uniqueId}}">\n  <div class="container">\n    <edit-code />\n  </div>\n</div>',
        scss: '',
        settings: [],
        schema: {
          settings: [],
          blocks: [],
        },
      },
      changelog: '',
      userId: 0,
    },
    detail: '',
    category: {
      commandId: '',
      name: '',
      description: '',
    },
    changelog: '',
    status: 'draft',
    authorName: '',
  };

  return { defaultDevAddon, defaultAdminAddon };
};
