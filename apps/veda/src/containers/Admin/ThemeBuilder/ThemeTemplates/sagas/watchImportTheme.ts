import { AxiosError } from 'axios';
import { handleWaitForSocketOfImportThemeAtomToClientServiceFulfill } from 'hooks/useSocket/useSocketForImportThemeAtomToClientService';
import { call, put, retry, select, takeLatest } from 'redux-saga/effects';
import { importThemeAtomToClientService } from 'services/ThemeService/Logic/importThemeAtomToClient';
import { socketOfImportThemeAtomClientServiceSelector } from 'store/selectors';
import { i18n } from 'translation';
import { ErrorData, notifyAxiosHandler } from 'utils/NotifyAxiosHandler';
import { getActionType } from 'wiloke-react-core/utils';
import { importThemeAtomToClient } from '../actions';

function* handleImport({ payload: { themeAtomCommandId, onFulfill } }: ReturnType<typeof importThemeAtomToClient.request>) {
  const { eventId }: ReturnType<typeof socketOfImportThemeAtomClientServiceSelector> = yield select(socketOfImportThemeAtomClientServiceSelector);
  try {
    if (eventId) {
      yield retry(3, 1000, importThemeAtomToClientService, {
        themeAtomCommandId,
        eventId,
        eventType: 'Import theme atom -> client service ngoài dashboard',
      });
      const statusImportTheme: SyncFulfillStatus = yield call(
        handleWaitForSocketOfImportThemeAtomToClientServiceFulfill,
        'Import theme atom -> client service ngoài dashboard',
      );
      if (statusImportTheme === 'success') {
        notifyAxiosHandler.handleSuccess(i18n.t('import_theme_atom_to_client_service.import_success'));
        yield put(importThemeAtomToClient.success({ themeAtomCommandId }));
        onFulfill?.();
      } else {
        yield put(importThemeAtomToClient.failure({ themeAtomCommandId }));
      }
    } else {
      throw new Error(i18n.t('import_theme_atom_to_client_service.error_unknown'));
    }
  } catch (error) {
    console.log('error', error);
    notifyAxiosHandler.handleError(error as AxiosError<ErrorData> | Error);
    yield put(importThemeAtomToClient.failure({ themeAtomCommandId }));
  }
}

export function* watchImportThemeAtomToClient() {
  yield takeLatest(getActionType(importThemeAtomToClient.request), handleImport);
}
