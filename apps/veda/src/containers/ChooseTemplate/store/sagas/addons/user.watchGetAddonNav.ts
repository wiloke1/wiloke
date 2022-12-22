import { createUserAddonsCategory, getAddonsNav } from 'containers/ChooseTemplate/store/actions';
import { put, retry, select, takeLatest } from 'redux-saga/effects';
import { addonService } from 'services/AddonService';
import { SectionCategoryForFrontend } from 'services/SectionService/types';
import { addonSelector } from 'store/selectors';
import { notifyAxiosHandler } from 'utils/NotifyAxiosHandler';
import { getActionType } from 'wiloke-react-core/utils';
import { setUserAddonsCategory } from '../../reducers/addons/user.sliceAddonCategory';

function* handleGet(_: ReturnType<typeof getAddonsNav.request>) {
  try {
    const { addonsNav, getNavStatus }: ReturnType<typeof addonSelector.userAddonsCategory> = yield select(addonSelector.userAddonsCategory);
    if (getNavStatus === 'success') {
      yield put(getAddonsNav.success({ data: addonsNav }));
    } else {
      const response: Awaited<ReturnType<typeof addonService.categories.getCategoriesOfProduct>> = yield retry(
        3,
        1000,
        addonService.categories.getCategoriesOfProduct,
      );

      const _dataResponse = response.sort((a, b) => {
        if (a.title < b.title) {
          return -1;
        }
        if (a.title > b.title) {
          return 1;
        }
        return 0;
      });

      yield put(getAddonsNav.success({ data: _dataResponse }));

      const checkExist = Array.isArray(_dataResponse) && _dataResponse.length > 0;

      let firstItem: SectionCategoryForFrontend = {
        commandId: '',
        title: '',
        slug: '',
        quantity: '',
      };

      if (checkExist) {
        firstItem = _dataResponse[0];
      }

      yield put(
        setUserAddonsCategory({
          id: firstItem.commandId,
          slug: firstItem.slug,
          addonQuantityOfCategory: Number(firstItem.quantity ?? 0),
        }),
      );
    }
  } catch (error) {
    yield put(getAddonsNav.failure(undefined));
  }
}

export function* watchGetAddonNav() {
  yield takeLatest(getActionType(getAddonsNav.request), handleGet);
}

function* createUserCate({ payload: { description, name } }: ReturnType<typeof createUserAddonsCategory.request>) {
  try {
    const response: Awaited<ReturnType<typeof addonService.categories.createCategoryOfProduct>> = yield retry(
      3,
      1000,
      addonService.categories.createCategoryOfProduct,
      { description, name },
    );
    yield put(
      createUserAddonsCategory.success({
        commandId: response.info.commandId,
        slug: response.info.name,
        title: response.info.description,
        quantity: '',
      }),
    );
    notifyAxiosHandler.handleSuccess(response.message);
  } catch {
    yield put(createUserAddonsCategory.failure(undefined));
  }
}

export function* watchCreateUserAddonCategory() {
  yield takeLatest(getActionType(createUserAddonsCategory.request), createUserCate);
}
