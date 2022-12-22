import { AxiosError } from 'axios';
import { setMyCoupon, setVisibleModalCampaign } from 'containers/Admin/PlanManagement/store/sliceCoupon';
import { delay, put, retry, SagaReturnType, takeLatest } from 'redux-saga/effects';
import { authService } from 'services/AuthService';
import { getCampaignService } from 'services/UserService/Logic/getCampaign';
import { ErrorData, notifyAxiosHandler } from 'utils/NotifyAxiosHandler';
import { getActionType } from 'wiloke-react-core/utils';
import { VerifyUserRequest, verifyUser } from '../slice';

function* handleVerify({ payload: { callback } }: VerifyUserRequest) {
  try {
    const response: SagaReturnType<typeof authService.getUserInfo> = yield retry(3, 500, authService.getUserInfo);
    const dataSuccess = response.info;
    yield put(verifyUser.success(dataSuccess));
    yield delay(100);
    callback?.();

    // nếu response có plan và plage === free thì request lên api campaign
    if (dataSuccess.plan !== undefined && dataSuccess.plan.planHandle === 'free') {
      const myCampaignResponse: SagaReturnType<typeof getCampaignService> = yield retry(3, 1000, getCampaignService);
      if (myCampaignResponse.info) {
        yield put(setMyCoupon(myCampaignResponse.info));
        yield put(setVisibleModalCampaign(true));
      }
    }
  } catch (_error) {
    yield put(verifyUser.failure(undefined));
    notifyAxiosHandler.handleError(_error as AxiosError<ErrorData> | Error);
  }
}

export function* watchVerifyUser() {
  yield takeLatest(getActionType(verifyUser.request), handleVerify);
}
