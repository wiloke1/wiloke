import ChooseImage from 'components/ChooseImage';
import Field from 'components/Field';
import MyModal from 'components/MyModal';
import TextInput from 'components/TextInput';
import ThemeSettingsWithSidebar from 'containers/BuilderPage/components/Settings/ThemeSettingsWithSidebar';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { globalThemeJsSelector } from 'store/global/globalThemeJs/slice';
import { globalThemeScssSelector } from 'store/global/globalThemeScss/slice';
import { themeVendorsSelector } from 'store/global/themeVendors/slice';
import { themeSettingsSelector } from 'store/selectors';
import { i18n } from 'translation';
import { PageType } from 'types/Page';
import { ThemeTranslations } from 'types/Result';
import { GridSmart, View } from 'wiloke-react-core';
import { useCreateThemeAtom } from '../store/actions/actionThemesAtom';
import { themesAtomSelector, useSetModalCreateThemeAtom } from '../store/reducers/sliceThemesAtom';
import { SelectPagesTemplate } from './SelectPagesTemplate';

const pageTypes: PageType[] = [
  'account',
  'activateAccount',
  'addresses',
  'article',
  'cart',
  'collection',
  'collections',
  'giftCard',
  'home',
  'login',
  'order',
  'page',
  'pageNotFound',
  'password',
  'product',
  'register',
  'resetPassword',
  'search',
];

interface State {
  name: string;
  pageIds: {
    blank: string;
    home: string;
    product: string;
    collection: string;
    article: string;
    cart: string;
    search: string;
    password: string;
    pageNotFound: string;
    account: string;
    activeAccount: string;
    address: string;
    collectionListing: string;
    giftCard: string;
    login: string;
    order: string;
    register: string;
    resetPassword: string;
  };
  imagePreview: string;
}
const initState: State = {
  imagePreview: '',
  name: '',
  pageIds: {
    article: '',
    blank: '',
    collection: '',
    home: '',
    product: '',
    cart: '',
    pageNotFound: '',
    password: '',
    search: '',
    account: '',
    activeAccount: '',
    address: '',
    collectionListing: '',
    giftCard: '',
    login: '',
    order: '',
    register: '',
    resetPassword: '',
  },
};

export const ModalCreateThemeAtom = () => {
  const [theme, setTheme] = useState<State>(initState);

  const { modalCreateThemeAtom, createStatus } = useSelector(themesAtomSelector);
  const themeSettings = useSelector(themeSettingsSelector);
  const globalJs = useSelector(globalThemeJsSelector);
  const globalScss = useSelector(globalThemeScssSelector);
  const vendors = useSelector(themeVendorsSelector);

  const setModalCreateThemeAtom = useSetModalCreateThemeAtom();
  const createThemeAtom = useCreateThemeAtom();

  const handleCreateTheme = () => {
    const ids = Object.values(theme.pageIds).filter(Boolean);
    createThemeAtom.request({
      featuredImage: theme.imagePreview,
      label: theme.name,
      pageCommandIds: ids,
      themeSettings: { ...themeSettings, globalTranslations: themeSettings.globalTranslations.translation as ThemeTranslations },
      globalJs,
      globalScss,
      vendors,
    });
  };

  useEffect(() => {
    setTheme(initState);
  }, [modalCreateThemeAtom]);

  if (!modalCreateThemeAtom) {
    return null;
  }
  return (
    <MyModal
      isVisible
      size="large"
      onCancel={() => setModalCreateThemeAtom(false)}
      headerText={`${i18n.t('general.create', { text: i18n.t('general.theme') })}`}
      onOk={handleCreateTheme}
      isLoading={createStatus === 'loading'}
    >
      <View row>
        <View columns={[5, 5, 5]}>
          <Field label={i18n.t('general.name')}>
            <TextInput
              block
              value={theme.name}
              onValueChange={val => {
                setTheme(prev => ({ ...prev, name: val }));
              }}
            />
          </Field>

          <Field label={`${i18n.t('general.preview', { text: i18n.t('general.image') })}`}>
            <ChooseImage
              mode="popup"
              value={{ src: theme.imagePreview, width: 0, height: 0 }}
              onChange={({ src }) => {
                setTheme(prev => ({ ...prev, imagePreview: src }));
              }}
            />
          </Field>
        </View>
        <View columns={[7, 7, 7]}>
          <GridSmart columnWidth={200}>
            {pageTypes.map(pageType => (
              <SelectPagesTemplate
                key={pageType}
                pageType={pageType}
                onChange={value =>
                  setTheme(state => ({
                    ...state,
                    pageIds: {
                      ...state.pageIds,
                      [pageType]: value,
                    },
                  }))
                }
              />
            ))}
          </GridSmart>
        </View>
      </View>
      <ThemeSettingsWithSidebar />
    </MyModal>
  );
};
