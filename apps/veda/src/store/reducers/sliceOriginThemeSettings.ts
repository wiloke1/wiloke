import { CssVariables, LayoutSettings, ThemeGeneralSettings, ThemeTranslations, Vendor } from 'types/Result';
import { v4 } from 'uuid';
import { createDispatchAction, createSlice, handleAction } from 'wiloke-react-core/utils';

interface OriginThemeSettings {
  generalSettings: ThemeGeneralSettings;
  cssVariables: CssVariables;
  layoutSettings: LayoutSettings;
  globalScss: string;
  globalJs: string;
  globalTranslations: ThemeTranslations;
  vendors: Vendor[];
}

type Actions =
  | {
      type: 'setOriginThemeSettings';
      payload: OriginThemeSettings;
    }
  | {
      type: 'updateOriginThemeSettings';
      payload: Partial<OriginThemeSettings>;
    }
  | {
      type: 'setIsSavedTheme';
      payload: boolean;
    };

interface State {
  themeSettings: OriginThemeSettings;
  isSavedTheme: boolean;
}

/**
 * Nguyên do:
 * + Khi user bấm vào các xem theme khác (vd: theme2) thì tại saga getTheme, globalThemeSettings bị set lại theo các settings mới của theme2. Sau đó user không thấy thích theme mới này mà bấm back lại thì lúc này globalThemeSettings là settings của theme2
 *
 * Cách sửa:
 * + Khi gọi global mount thì set themeSetting đang được active vào originThemeSettings và themeSettings hiện tại
 * + Khi thay đổi globalThemeSettings ở ngoài dashboard thì originThemeSetting cũng phải thay đổi theo
 * + Sau khi user chọn theme khác và bấm save thì ta sẽ set themeSetting của theme2 vào globalThemeSettings + originThemeSettings và set 1 biến là isSavedTheme = true (mặc định là false)
 * + Khi này ở action backToPage ta chỉ cần check nếu isSavedTheme = true thì globalThemeSettings giữ nguyên, ngược lại ta sẽ set originThemeSettings vào globalThemeSettings
 */
export const sliceOriginThemeSettings = createSlice<State, Actions>({
  name: '@Global',
  initialState: {
    isSavedTheme: false,
    themeSettings: {
      cssVariables: {
        colors: [],
        fonts: [],
      },
      generalSettings: {
        preloaderEnable: false,
        preloaderVariant: 0,
        preloaderBackgroundColor: '',
        preloaderColor: '',
        preloaderLogo: '',
        favicon: '',
        label: '',
      },
      globalJs: '',
      globalScss: '',
      layoutSettings: {
        columnGapX: 0,
        columnGapY: 0,
        containerGap: 0,
        containerWidth: 0,
      },
      vendors: [
        {
          id: v4(),
          css: '',
          js: '',
        },
      ],
      globalTranslations: {
        en: '',
        fr: '',
        vi: '',
      },
    },
  },
  reducers: [
    handleAction('setIsSavedTheme', ({ state, action }) => {
      state.isSavedTheme = action.payload;
    }),
    handleAction('setOriginThemeSettings', ({ state, action }) => {
      return {
        ...state,
        themeSettings: action.payload,
      };
    }),
    handleAction('updateOriginThemeSettings', ({ state, action }) => {
      return {
        ...state,
        themeSettings: {
          ...state.themeSettings,
          ...action.payload,
        },
      };
    }),
  ],
});

export const { setIsSavedTheme, setOriginThemeSettings, updateOriginThemeSettings } = sliceOriginThemeSettings.actions;

export const useSetIsSavedTheme = createDispatchAction(setIsSavedTheme);
export const useSetOriginThemeSettings = createDispatchAction(setOriginThemeSettings);
export const useUpdateOriginThemeSettings = createDispatchAction(updateOriginThemeSettings);

export const originThemeSettingsSelector = (state: AppState) => state.global.originThemeSettings;
