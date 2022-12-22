import { call, put, retry, SagaReturnType, takeLatest } from 'redux-saga/effects';
import { sectionService } from 'services/SectionService';
import { setModalUpdateSection, updateVersionSectionFlow } from 'store/actions/versions/actionSectionVersion';
import { notifyAxiosHandler } from 'utils/NotifyAxiosHandler';

import { getActionType } from 'wiloke-react-core/utils';
import { handleCompareSettings, handleCompareString } from './utils';

function* handleFlow({ payload: { section } }: ReturnType<typeof updateVersionSectionFlow.request>) {
  yield put(setModalUpdateSection(section));
  try {
    if (section.parentCommandId) {
      const response: SagaReturnType<typeof sectionService.sections.getAtomSection> = yield retry(
        3,
        1000,
        sectionService.sections.getAtomSection,
        section.parentCommandId,
      );
      const {
        deletedSettings,
        newSettings,
        updatedSettings,
        deletedBlocks,
        newBlocks,
        updatedBlocks,
      }: SagaReturnType<typeof handleCompareSettings> = yield call(handleCompareSettings, section.data.schema, response.data.schema);

      const comparedLiquid: SagaReturnType<typeof handleCompareString> = yield call(handleCompareString, section.data.liquid, response.data.liquid);

      const comparedScss: SagaReturnType<typeof handleCompareString> = yield call(
        handleCompareString,
        section.data.scss ?? '',
        response.data.scss ?? '',
      );

      const comparedJs: SagaReturnType<typeof handleCompareString> = yield call(handleCompareString, section.data.js ?? '', response.data.js ?? '');

      const comparedJsHook: SagaReturnType<typeof handleCompareString> = yield call(
        handleCompareString,
        section.data.jsHook ?? '',
        response.data.jsHook ?? '',
      );

      yield put(
        updateVersionSectionFlow.success({
          deletedSettings,
          newSettings,
          updatedSettings,
          deletedBlocks,
          newBlocks,
          updatedBlocks,
          comparedJs,
          comparedJsHook,
          comparedLiquid,
          comparedScss,
        }),
      );
    } else {
      yield put(updateVersionSectionFlow.failure(undefined));
    }
  } catch (error) {
    console.log(error);
    notifyAxiosHandler.handleError(error as Error);
    yield put(updateVersionSectionFlow.failure(undefined));
  }
}

export function* watchUpdateVersionSectionFlow() {
  yield takeLatest(getActionType(updateVersionSectionFlow.request), handleFlow);
}
