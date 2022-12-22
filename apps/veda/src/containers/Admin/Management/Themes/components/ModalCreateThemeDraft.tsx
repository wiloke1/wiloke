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
import { useCreateThemeDraft } from '../store/actions/actionThemesDraft';
import { themesDraftSelector, useSetModalCreateThemeDraft } from '../store/reducers/sliceThemesDraft';
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

export const ModalCreateThemeDraft = () => {
  const [theme, setTheme] = useState<State>(initState);

  const { modalCreateThemeDraft, createStatus } = useSelector(themesDraftSelector);
  const themeSettings = useSelector(themeSettingsSelector);
  const globalJs = useSelector(globalThemeJsSelector);
  const globalScss = useSelector(globalThemeScssSelector);
  const vendors = useSelector(themeVendorsSelector);

  const setModalCreateThemeDraft = useSetModalCreateThemeDraft();
  const createThemeDraft = useCreateThemeDraft();

  const handleCreateTheme = () => {
    const ids = Object.values(theme.pageIds).filter(Boolean);
    createThemeDraft.request({
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
  }, [modalCreateThemeDraft]);

  if (!modalCreateThemeDraft) {
    return null;
  }
  return (
    <MyModal
      isVisible
      size="large"
      onCancel={() => setModalCreateThemeDraft(false)}
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
              value={{ src: theme.imagePreview, height: 0, width: 0 }}
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
