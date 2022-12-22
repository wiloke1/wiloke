import { notification } from 'antd';
import { put, retry, takeLatest } from 'redux-saga/effects';
import { changeThemeShopifyActivate } from 'services/ShopifyConnection/services/changeThemeShopifyActivate';
import { getThemeObjectNCss } from 'store/actions/liquid/actionLiquidVariables';
import { i18n } from 'translation';
import { notifyAxiosHandler } from 'utils/NotifyAxiosHandler';
import { getActionType } from 'wiloke-react-core/utils';
import { changeThemeShopifyActivate as actionChangeThemeShopifyActivate } from '../slice/actions';
import { setModalChangeThemeShopifyActivate, setVisibleModalMigration } from '../slice/sliceThemeDashboard';

export function* handleChangeThemeShopifyActivate({ payload }: ReturnType<typeof actionChangeThemeShopifyActivate.request>) {
  try {
    yield retry(3, 1000, changeThemeShopifyActivate, { themeId: payload.themeId });
    yield put(getThemeObjectNCss.request({ variant: 'Action chạy sau khi active theme khác ở client theme manager' }));
    yield put(actionChangeThemeShopifyActivate.success(undefined));
    yield put(setModalChangeThemeShopifyActivate(undefined));
    notification.success({
      message: i18n.t('general.congratulations'),
      description: i18n.t('general.your_item_updated', { text: i18n.t('general.theme'), textTransform: 'capitalize' }),
    });
    yield put(setVisibleModalMigration(false));
  } catch (error) {
    notifyAxiosHandler.handleError(error as Error);
    yield put(actionChangeThemeShopifyActivate.failure(undefined));
  }
}

export function* watchChangeThemeShopifyActivate() {
  yield takeLatest(getActionType(actionChangeThemeShopifyActivate.request), handleChangeThemeShopifyActivate);
}
