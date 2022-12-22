import { call, put, retry, SagaReturnType, takeLatest } from 'redux-saga/effects';
import { addonService } from 'services/AddonService';
import { setModalUpdateAddon, updateVersionAddonFlow } from 'store/actions/versions/actionSectionVersion';
import { notifyAxiosHandler } from 'utils/NotifyAxiosHandler';
import { getActionType } from 'wiloke-react-core/utils';
import { handleCompareSettings, handleCompareString } from './utils';

function* handleFlow({ payload: { addon } }: ReturnType<typeof updateVersionAddonFlow.request>) {
  yield put(setModalUpdateAddon(addon));

  try {
    if (addon.parentCommandId) {
      const response: SagaReturnType<typeof addonService.addons.getAtom> = yield retry(3, 1000, addonService.addons.getAtom, addon.parentCommandId);
      const responseSuccess: typeof response = {
        ...response,
        sectionId: addon.id,
        body: {
          ...response.body,
          id: addon.id,
        },
      };

      const {
        deletedBlocks,
        deletedSettings,
        newBlocks,
        newSettings,
        updatedBlocks,
        updatedSettings,
      }: SagaReturnType<typeof handleCompareSettings> = yield call(handleCompareSettings, addon.body.data.schema, responseSuccess.body.data.schema);

      const comparedLiquid: SagaReturnType<typeof handleCompareString> = yield call(
        handleCompareString,
        addon.body.data.liquid,
        responseSuccess.body.data.liquid,
      );

      const comparedScss: SagaReturnType<typeof handleCompareString> = yield call(
        handleCompareString,
        addon.body.data.scss ?? '',
        responseSuccess.body.data.scss ?? '',
      );

      const comparedJs: SagaReturnType<typeof handleCompareString> = yield call(
        handleCompareString,
        addon.body.data.js ?? '',
        responseSuccess.body.data.js ?? '',
      );

      const comparedJsHook: SagaReturnType<typeof handleCompareString> = yield call(
        handleCompareString,
        addon.body.data.jsHook ?? '',
        responseSuccess.body.data.jsHook ?? '',
      );

      yield put(
        updateVersionAddonFlow.success({
          deletedBlocks,
          deletedSettings,
          newBlocks,
          newSettings,
          updatedBlocks,
          updatedSettings,
          comparedJs,
          comparedJsHook,
          comparedLiquid,
          comparedScss,
        }),
      );
    } else {
      yield put(updateVersionAddonFlow.failure(undefined));
    }
  } catch (error) {
    console.log(error);
    notifyAxiosHandler.handleError(error as Error);
    yield put(updateVersionAddonFlow.failure(undefined));
  }
}

export function* watchUpdateVersionAddonFlow() {
  yield takeLatest(getActionType(updateVersionAddonFlow.request), handleFlow);
}
