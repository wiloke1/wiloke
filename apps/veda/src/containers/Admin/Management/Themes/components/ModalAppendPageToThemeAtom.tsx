import ChooseImage from 'components/ChooseImage';
import Field from 'components/Field';
import MyModal from 'components/MyModal';
import TextInput from 'components/TextInput';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { i18n } from 'translation';
import { getPageOfThemeAtom } from 'services/ThemeService/Logic/getPageOfThemeAtom';
import { PageType } from 'types/Page';
import { notifyAxiosHandler } from 'utils/NotifyAxiosHandler';
import { GridSmart, View } from 'wiloke-react-core';
import { useAppendPageToThemeAtom } from '../store/actions/actionThemesAtom';
import { themesAtomSelector, useSetModalAppendPageToThemeAtom } from '../store/reducers/sliceThemesAtom';
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
  pageIds: Record<PageType, string>;
  imagePreview: string;
}
const initState: State = {
  imagePreview: '',
  name: '',
  pageIds: {
    article: '',
    collection: '',
    home: '',
    product: '',
    cart: '',
    pageNotFound: '',
    password: '',
    search: '',
    account: '',
    giftCard: '',
    login: '',
    order: '',
    register: '',
    resetPassword: '',
    activateAccount: '',
    addresses: '',
    collections: '',
    page: '',
  },
};

export const ModalAppendPageToThemeAtom = () => {
  const [theme, setTheme] = useState<State>(initState);
  const originSourceIds = useRef<string[]>([]);

  const [isLoading, setIsLoading] = useState(false);

  const { modalAppendPageToThemeAtom, appendPageToThemeAtomStatus } = useSelector(themesAtomSelector);

  const setModalAppendPageToThemeAtom = useSetModalAppendPageToThemeAtom();
  const appendPageToThemeAtom = useAppendPageToThemeAtom();

  const handleUpdateTheme = () => {
    const ids = Object.values(theme.pageIds).filter(Boolean);
    if (modalAppendPageToThemeAtom) {
      appendPageToThemeAtom.request({
        prevThemeData: modalAppendPageToThemeAtom,
        pageCommandIdsNeedImport: ids.filter(id => !originSourceIds.current.includes(id)),
        featuredImage: theme.imagePreview,
        label: theme.name,
      });
    }
  };

  const handleGetParentIds = async () => {
    if (modalAppendPageToThemeAtom) {
      originSourceIds.current = [];
      setTheme(initState);
      setIsLoading(true);
      try {
        const { pageCommandIds, label, featuredImage } = modalAppendPageToThemeAtom;
        const responses = await Promise.all(
          pageCommandIds.map(pageCommandId => {
            return getPageOfThemeAtom({ commandId: pageCommandId });
          }),
        );
        const pageIds = responses.reduce<State['pageIds']>((res, response) => {
          const { parentCommandId, type } = response;
          if (parentCommandId) {
            return { ...res, [type]: parentCommandId };
          }
          return res;
        }, initState.pageIds);

        originSourceIds.current = Object.values(pageIds).filter(Boolean);
        setTheme(state => ({
          ...state,
          name: label,
          imagePreview: featuredImage ?? '',
          pageIds,
        }));
      } catch (error) {
        const error_ = error as Error;
        notifyAxiosHandler.handleError(error_);
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    handleGetParentIds();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalAppendPageToThemeAtom]);

  if (!modalAppendPageToThemeAtom) {
    return null;
  }

  return (
    <MyModal
      isVisible
      size="large"
      onCancel={() => setModalAppendPageToThemeAtom(undefined)}
      headerText={`${i18n.t('general.update')} ${i18n.t('general.theme')}`}
      onOk={handleUpdateTheme}
      isLoading={appendPageToThemeAtomStatus === 'loading'}
    >
      <View row>
        <View columns={[5, 5, 5]}>
          <Field label={`${i18n.t('general.name')}`}>
            <TextInput
              block
              value={theme.name}
              onValueChange={val => {
                setTheme(prev => ({ ...prev, name: val }));
              }}
            />
          </Field>

          <Field label={`${i18n.t('general.preview')} ${i18n.t('general.image')}`}>
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
                isLoading={isLoading}
                disabled={originSourceIds.current.includes(theme.pageIds[pageType])}
                key={pageType}
                pageType={pageType}
                value={theme.pageIds[pageType]}
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
    </MyModal>
  );
};
