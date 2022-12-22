import { AxiosError } from 'axios';
import { put, retry, select, takeLatest } from 'redux-saga/effects';
import { getPagesPublish } from 'services/PageService/Logic/getProductsPublish';
import { loadMorePagesPublish } from 'services/PageService/Logic/loadMoreProductsPublish';
import { pageBuilderSelector } from 'store/selectors';
import { PageType } from 'types/Page';
import { ErrorData } from 'utils/NotifyAxiosHandler';
import { getActionType } from 'wiloke-react-core/utils';
import { getTemplatesPage, loadMorePageTemplate } from '../reducers/actions';

function* handleGet({ payload: { pageType } }: ReturnType<typeof getTemplatesPage.request>) {
  try {
    const response: Awaited<ReturnType<typeof getPagesPublish>> = yield retry(3, 1000, getPagesPublish, {
      pageType: pageType === 'all' ? undefined : (pageType as PageType),
    });
    yield put(
      getTemplatesPage.success({
        data: response.info,
        hasNextPage: response.info.length > 0 ? true : false,
      }),
    );
  } catch (error) {
    const _error = error as AxiosError<ErrorData> | Error;
    yield put(getTemplatesPage.failure({ message: _error.message }));
  }
}

export function* watchGetTemplatesPage() {
  yield takeLatest(getActionType(getTemplatesPage.request), handleGet);
}

function* handleLoadMore({ payload: { pageType } }: ReturnType<typeof loadMorePageTemplate.request>) {
  try {
    const {
      allTemplates: { data },
    }: ReturnType<typeof pageBuilderSelector.templates> = yield select(pageBuilderSelector.templates);
    const lastCursor = data[data.length - 1].commandId;
    const response: Awaited<ReturnType<typeof loadMorePagesPublish>> = yield retry(3, 1000, loadMorePagesPublish, {
      cursor: lastCursor,
      pageType: pageType === 'all' ? undefined : (pageType as PageType),
    });

    yield put(
      loadMorePageTemplate.success({
        data: response.info,
        hasNextPage: response.info.length > 0 ? true : false,
      }),
    );
  } catch (error) {
    yield put(loadMorePageTemplate.failure({ message: (error as AxiosError<ErrorData>).response?.data.message ?? '' } ?? (error as Error).message));
  }
}

export function* watchLoadMoreTemplatePage() {
  yield takeLatest(getActionType(loadMorePageTemplate.request), handleLoadMore);
}
