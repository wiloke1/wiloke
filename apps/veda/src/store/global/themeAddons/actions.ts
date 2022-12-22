import { ThemeAddon } from 'types/Addons';
import { PageSection } from 'types/Sections';
import { createAsyncAction } from 'wiloke-react-core/utils';

export interface AddMultiAddonsAction {
  type: 'addMultiAddons';
  payload: {
    addons: ThemeAddon[];
  };
}

export interface UpdateAddonAction {
  type: 'updateAddon';
  payload: {
    section: PageSection;
  };
}

export interface UpdateActiveAddons {
  type: 'updateActiveAddons';
  payload: {
    addons: ThemeAddon;
  };
}

export interface DuplicateAddon {
  type: 'duplicateAddon';
  payload: {
    addonsSectionId: string;
    newId: string;
  };
}

export interface DeleteAddon {
  type: 'deleteAddon';
  payload: {
    addonsSectionId: string;
    addonCommandId: string;
    addonId: string;
  };
}

export interface SetThemeAddon {
  type: 'setThemeAddon';
  payload: {
    addon: ThemeAddon;
  };
}

export interface SetActiveAddon {
  type: 'setActiveAddon';
  payload: {
    addon: ThemeAddon | undefined;
  };
}

export const getThemeAddons = createAsyncAction([
  '@Global/getThemeAddons/request',
  '@Global/getThemeAddons/success',
  '@Global/getThemeAddons/failure',
])<undefined, { addons: ThemeAddon[] }, undefined>();

export const updateThemeAddonsToPage = createAsyncAction([
  '@Global/updateAddonsToPage/request',
  '@Global/updateAddonsToPage/success',
  '@Global/updateAddonsToPage/failure',
])<{ addons: ThemeAddon[] }, { addons: ThemeAddon[] }, undefined>();
