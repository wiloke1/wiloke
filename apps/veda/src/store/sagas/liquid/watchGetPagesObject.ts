import { put, retry, takeEvery } from '@redux-saga/core/effects';
import { uniq } from 'ramda';
import { select } from 'redux-saga/effects';
import { liquidVariables } from 'services/LiquidVariables';
import { getPagesObject, setSlugsRequest } from 'store/actions/liquid/actionLiquidVariables';
import { liquidVariablesSelector, pageDataSelector } from 'store/selectors';
import { notifyAxiosHandler } from 'utils/NotifyAxiosHandler';
import { getActionType } from 'wiloke-react-core/utils';

/** NOTE: Nếu update function này thì xem xét việc update PageLiquidVariable tại src/types/Page.ts để code có thể clean hơn */
export function* handleGetPagesObject({ payload }: ReturnType<typeof getPagesObject.request>) {
  const liquidVariablesSelectors: ReturnType<typeof liquidVariablesSelector> = yield select(liquidVariablesSelector);
  const { shopifyRepresentPage, type, label }: ReturnType<typeof pageDataSelector> = yield select(pageDataSelector);
  const { pageSlugsLoaded, pageSlugsLoading, data } = liquidVariablesSelectors;
  const { pages } = data;
  const handle = shopifyRepresentPage?.handle;
  const isOtherPage = type === 'page' && !!handle;
  const pageSlugs: string[] =
    payload.slugs ?? (isOtherPage ? [handle] : []).concat().filter(slug => !pageSlugsLoaded.includes(slug) && !pageSlugsLoading.includes(slug));
  const pageSlugsUniq = uniq(pageSlugs);

  if (!pageSlugsUniq.length) {
    yield put(
      getPagesObject.success({
        pages,
        page: isOtherPage ? pages[handle] : null,
      }),
    );
    payload.onSuccess?.({
      pages,
      page: isOtherPage ? pages[handle] : null,
    });
    return;
  }
  // Đánh dấu các slug đang trạng thái loading
  yield put(setSlugsRequest.request({ pages: pageSlugsUniq }));

  try {
    const pagesResponse: Awaited<ReturnType<typeof liquidVariables.getPagesObject>> = yield retry(3, 1000, liquidVariables.getPagesObject, {
      shopifyRepresentPage: shopifyRepresentPage,
      type,
      label,
      slugs: pageSlugsUniq,
    });
    yield put(
      getPagesObject.success({
        pages: pagesResponse,
        page: isOtherPage ? pagesResponse[handle] ?? pages[handle] : null,
      }),
    );
    // Đánh dấu những slug đã được load
    yield put(setSlugsRequest.success({ pages: pageSlugsUniq }));
    payload.onSuccess?.({
      pages: pagesResponse,
      page: isOtherPage ? pagesResponse[handle] ?? pages[handle] : null,
    });
  } catch (error) {
    yield put(getPagesObject.failure(undefined));
    payload.onFailure?.();
    if (notifyAxiosHandler.isAxiosError(error)) {
      // Đánh dấu những slug load bị lỗi
      yield put(setSlugsRequest.failure({ pages: pageSlugsUniq }));
    } else {
      yield put(setSlugsRequest.otherException({ pages: pageSlugsUniq }));
      notifyAxiosHandler.handleError(error as Error);
    }
  }
}

export function* watchGetPagesObject() {
  yield takeEvery(getActionType(getPagesObject.request), handleGetPagesObject);
}
