import { put, select, takeLeading } from '@redux-saga/core/effects';
import { getGlobalObjectFake } from 'store/actions/liquid/actionLiquidVariables';
import { pageDataSelector } from 'store/selectors';
import { getLocale } from 'translation';
import { Page } from 'types/Page';
import getPageInfo from 'utils/functions/getInfo';
import { getShopName } from 'utils/functions/getUserInfo';
import { Request } from 'utils/LiquidSyntaxToTwig';
import { notifyAxiosHandler } from 'utils/NotifyAxiosHandler';
import { getActionType } from 'wiloke-react-core/utils';

type TypeAndHandleOfPage = Pick<Page, 'type'> & Pick<Exclude<Page['shopifyRepresentPage'], undefined>, 'handle'>;

export const getPathOfPage = ({ type, handle }: TypeAndHandleOfPage) => {
  const BLOG_HANDLE = 'BLOG_HANDLE';
  const ENUMS: Record<Page['type'], string> = {
    account: `account/login`,
    activateAccount: `account/activate`, // FIXME: K chắc chắn chính xác
    addresses: `account/addresses`,
    article: `blogs/${BLOG_HANDLE}/${handle}`,
    cart: 'cart',
    collection: `collecions/${handle}`,
    collections: `collections`,
    giftCard: 'gift_cards',
    home: '',
    login: 'account/login',
    order: 'account',
    page: `pages/${handle}`,
    pageNotFound: '404',
    password: 'password',
    product: `products/${handle}`,
    register: 'account/register',
    resetPassword: 'account/password', // FIXME: K chắc chắn chính xác
    search: '/search',
  };
  return ENUMS[type];
};
const isOtherPage = ({ type, handle }: TypeAndHandleOfPage) => type === 'home' && !!handle;

const getPageTypeOfRequestObject = ({ type }: Pick<Page, 'type'>): Exclude<Request, null>['page_type'] | null => {
  const ENUMS: Record<Page['type'], Exclude<Request, null>['page_type']> = {
    account: 'customers/account',
    activateAccount: 'customers/activate_account',
    addresses: 'customers/addresses',
    article: 'article',
    cart: 'cart',
    collection: 'collection',
    collections: 'list-collections',
    giftCard: 'gift_card',
    home: 'index',
    login: 'customers/login',
    order: 'customers/order',
    page: 'page',
    pageNotFound: '404',
    password: 'password',
    product: 'product',
    register: 'customers/register',
    resetPassword: 'customers/reset_password',
    search: 'search',
  };
  return ENUMS[type];
};

export function* handleGetGlobalObjectFake(_: ReturnType<typeof getGlobalObjectFake.request>) {
  const { shopifyRepresentPage, type, label }: ReturnType<typeof pageDataSelector> = yield select(pageDataSelector);
  const handle = shopifyRepresentPage?.handle ?? '';

  try {
    // NOTE: @tuong -> Những cái này có thể tự fake -> section_object bắt buộc phải fake ở handleGetTwigScope vì mỗi section object sẽ khác nhau -> có hay không việc đưa mấy cái fake này sang bên handleGetTwigScope ????
    yield put(
      getGlobalObjectFake.success({
        canonical_url: `${getPageInfo('shop', window.location.search)}/${getPathOfPage({ type, handle })}`,
        page_title: label,
        page_description: isOtherPage({ type, handle }) ? 'Page Description Here' : '',
        request: {
          design_mode: true,
          host: getPageInfo('shop', window.location.search),
          locale: {
            name: getLocale(),
            iso_code: getLocale(),
            endonym_name: null,
            primary: null,
            root_url: '/',
          },
          origin: getShopName(),
          path: `/${getPathOfPage({ type, handle })}`,
          page_type: getPageTypeOfRequestObject({ type }),
        },
        template: {
          directory: null,
          suffix: null,
          name: getPageTypeOfRequestObject({ type }),
        },
      }),
    );
  } catch (error) {
    notifyAxiosHandler.handleError(error as Error);
    yield put(getGlobalObjectFake.failure(undefined));
  }
}

export function* watchGetGlobalObjectFake() {
  yield takeLeading(getActionType(getGlobalObjectFake.request), handleGetGlobalObjectFake);
}
