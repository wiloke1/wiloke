import { PageId } from 'types/Page';
import { PageGeneralSettings } from 'types/Result';
import getPageInfo from 'utils/functions/getInfo';
import { createDispatchAction, createSlice, handleAction } from 'wiloke-react-core/utils';

interface GeneralSettingsAction {
  type: 'setGeneralSettingsPage';
  payload: {
    settings: Partial<PageGeneralSettings>;
    pageId?: string | undefined;
  };
}
export type GeneralSettingsState = Record<PageId, PageGeneralSettings>;

export const defaultGeneralSettings: PageGeneralSettings = {
  label: '',
  headerFooterEnabled: false,
  handle: '',
  metaTitle: '',
  metaDescription: '',
  socialShareImage: '',
  lazyload: false,
};

export const defaultPageGeneralSettings: GeneralSettingsState = {};

export const sliceGeneralSettings = createSlice<GeneralSettingsState, GeneralSettingsAction>({
  name: '@Global',
  initialState: defaultPageGeneralSettings,
  reducers: [
    handleAction('setGeneralSettingsPage', ({ state, action }) => {
      const pageId = action.payload.pageId ?? getPageInfo('id');
      const settings = state[pageId] ?? defaultGeneralSettings;
      const { label, headerFooterEnabled, metaDescription, metaTitle, handle, socialShareImage, lazyload } = action.payload.settings;

      return {
        ...state,
        [pageId]: {
          ...settings,
          ...(label !== undefined ? { label } : {}),
          ...(headerFooterEnabled !== undefined ? { headerFooterEnabled } : {}),
          ...(metaDescription !== undefined ? { metaDescription } : {}),
          ...(metaTitle !== undefined ? { metaTitle } : {}),
          ...(handle !== undefined ? { handle } : {}),
          ...(socialShareImage !== undefined ? { socialShareImage } : {}),
          ...(lazyload !== undefined ? { lazyload } : {}),
        },
      };
    }),
  ],
});

export const { setGeneralSettingsPage } = sliceGeneralSettings.actions;
export const useSetGeneralSettingsPage = createDispatchAction(setGeneralSettingsPage);
