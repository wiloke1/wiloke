import { MODAL_REPORT_AFTER_SYNC_ERROR } from 'containers/ModalReportAfterError/const';
import { ModalReportAfterError } from 'containers/ModalReportAfterError/ModalReportAfterError';
import { handleWaitForSocketOfSyncShopifyFulfill } from 'hooks/useSocket/useSocketForSyncShopify';
import { call, put, retry, SagaReturnType, select, takeLatest } from 'redux-saga/effects';
import { shopifyConnectionService } from 'services/ShopifyConnection';
import { socketOfSyncShopifySelector } from 'store/selectors';
import { i18n } from 'translation';
import { notifyAxiosHandler } from 'utils/NotifyAxiosHandler';
import { getActionType } from 'wiloke-react-core/utils';
import { migrateThemeShopify } from '../slice/actions';
import { setModalChangeThemeShopifyActivate } from '../slice/sliceThemeDashboard';
import { handleChangeThemeShopifyActivate } from './watchChangeThemeActivateShopify';

function* handleMigrateThemeShopiy({ payload }: ReturnType<typeof migrateThemeShopify.request>) {
  const { targetThemeId, onFulfill, forceActive } = payload;
  const { eventId }: ReturnType<typeof socketOfSyncShopifySelector> = yield select(socketOfSyncShopifySelector);
  try {
    if (eventId) {
      yield retry(3, 1000, shopifyConnectionService.migrateThemeShopify, {
        newThemeId: targetThemeId,
        eventId,
        eventType: 'Migrate theme',
      });

      const statusMigrateTheme: SagaReturnType<typeof handleWaitForSocketOfSyncShopifyFulfill> = yield call(
        handleWaitForSocketOfSyncShopifyFulfill,
        'Migrate theme',
      );

      if (statusMigrateTheme === 'success') {
        notifyAxiosHandler.handleSuccess(i18n.t('migrate_theme.migrate_success'));
        yield put(migrateThemeShopify.success(undefined));
        yield put(setModalChangeThemeShopifyActivate({ themeId: targetThemeId }));
        if (forceActive) {
          yield call(handleChangeThemeShopifyActivate, {
            type: '@Dashboard/changeThemeShopifyActivate/request',
            payload: { themeId: targetThemeId },
          });
        }
      } else {
        yield put(migrateThemeShopify.failure(undefined));
      }
    } else {
      throw new Error(i18n.t('migrate_theme.error_unknown'));
    }
  } catch (error) {
    notifyAxiosHandler.handleError(error as Error);
    yield put(migrateThemeShopify.failure(undefined));
    ModalReportAfterError.getActions(MODAL_REPORT_AFTER_SYNC_ERROR).report({
      cause: i18n.t('ModalReportAfterError.error_cause.migrate_theme'),
      description: error instanceof Error ? error.message : '',
    });
  } finally {
    onFulfill();
    try {
      yield retry(3, 1000, shopifyConnectionService.cleanAfterSync);
    } catch {}
  }
}

export function* watchMigrateThemeShopify() {
  yield takeLatest(getActionType(migrateThemeShopify.request), handleMigrateThemeShopiy);
}
