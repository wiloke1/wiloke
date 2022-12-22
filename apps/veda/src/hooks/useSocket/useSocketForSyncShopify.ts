import { notification } from 'antd';
import configureApp from 'configureApp';
import { MODAL_REPORT_AFTER_SYNC_ERROR } from 'containers/ModalReportAfterError/const';
import { ModalReportAfterError } from 'containers/ModalReportAfterError/ModalReportAfterError';
import useDelay from 'hooks/useDelay';
import { useEffect, useRef, useState } from 'react';
import { put, select, take } from 'redux-saga/effects';
import { Client, Subscription } from 'stompjs';
import { setStreamSocketOfSyncShopify, useSetEventIdOfSyncShopify, useSetStreamSocketOfSyncShopify } from 'store/global/socket/actions';
import { socketOfSyncShopifySelector } from 'store/selectors';
import { i18n } from 'translation';
import storage from 'utils/functions/storage';
import { getActionType } from 'wiloke-react-core/utils';
import { OnConnect, OnDisconnect } from './types';

let socketForSyncShopify: WebSocket | undefined;
let stompClientForSyncShopify: Client | undefined;

const createSocket = () => {
  socketForSyncShopify = undefined;
  stompClientForSyncShopify = undefined;
  socketForSyncShopify = new window.SockJS(`${configureApp.socketAPIForSyncShopify}/${configureApp.socketEndpoint}`);
  stompClientForSyncShopify = window.Stomp.over(socketForSyncShopify);
};

export interface SyncShopifyMessage {
  pageCommandId: string;
  message: string;
  step: 'PROCESSING' | 'SUCCESS' | 'END';
  status: 'SUCCESS' | 'ERROR';
  previewUrls?: string[] | null;
  /** Đặt như thế này để dễ kiểm soát (vì mỗi chỗ là 1 api khác nhau) */
  eventType:
    | 'Update shopifyPages ngoài dashboard/Từ "all" -> 1 vài => Unpublish tất cả'
    | 'Update shopifyPages ngoài dashboard'
    | 'Ghi file khi update page settings ngoài dashboard'
    | 'Ghi file khi update theme settings ngoài dashboard'
    | 'Ghi file khi save ở builder page / Ghi page'
    | 'Ghi file khi save ở builder page / Ghi global (sinh ra từ themeSettings)'
    | 'Ghi file khi save ở builder page / Ghi header footer'
    | 'Ghi file khi save ở builder page / Ghi addon enable position'
    | 'Ghi file khi save ở builder page / Ghi addon disable position'
    | 'Ghi file khi save ở builder page / Ghi các addon disable position vừa tạo xong vào file theme'
    | 'Publish | Unpublish page ngoài dashboard'
    | 'Delete ouput builder ngoài dashboard'
    | 'Ghi file atomic css khi save ở builder page'
    | 'Delete addon khi save ở builder'
    | 'Sync translation';
}

export interface MigrateThemeMessage {
  eventType: 'Migrate theme';
  oldThemeId: string;
  newThemeId: string;
  message: string;
  step: 'PROCESSING' | 'SUCCESS' | 'END';
  status: 'SUCCESS' | 'ERROR';
}

export type SocketMessage = SyncShopifyMessage | MigrateThemeMessage;

notification.config({
  maxCount: 4,
});

export const useSocketForSyncShopify = () => {
  const setEventIdOfSyncShopify = useSetEventIdOfSyncShopify();
  const [statusSocketConnection, setStatusSocketConnection] = useState<Status>(stompClientForSyncShopify?.connected ? 'success' : 'idle');
  const [delay, cancelDelay] = useDelay();
  const setStreamSocketOfSyncShopify = useSetStreamSocketOfSyncShopify();

  const subcriptionSyncShopifyFromVedaOutput = useRef<Subscription | undefined>(undefined);
  const subcriptionForMigrateVedaToAnotherTheme = useRef<Subscription | undefined>(undefined);

  const handleDisconnect_ = ({ cb }: OnDisconnect, isConnectAction: boolean) => {
    if (subcriptionSyncShopifyFromVedaOutput.current) {
      stompClientForSyncShopify?.unsubscribe(subcriptionSyncShopifyFromVedaOutput.current.id);
      subcriptionSyncShopifyFromVedaOutput.current = undefined;
    }
    if (subcriptionForMigrateVedaToAnotherTheme.current) {
      stompClientForSyncShopify?.unsubscribe(subcriptionForMigrateVedaToAnotherTheme.current.id);
      subcriptionForMigrateVedaToAnotherTheme.current = undefined;
    }
    if (!isConnectAction) {
      setStatusSocketConnection('idle');
    }
    cb?.();
  };

  const handleDisconnect = (callbacks: OnDisconnect, isConnectAction: boolean) => {
    if (stompClientForSyncShopify?.connected) {
      stompClientForSyncShopify?.disconnect(() => handleDisconnect_(callbacks, isConnectAction));
    } else {
      handleDisconnect_(callbacks, isConnectAction);
    }
  };

  const handleListenSocketOfSyncShopify = (data: SyncShopifyMessage) => {
    if (data.step.toUpperCase() === 'END' && data.status.toUpperCase() === 'ERROR') {
      setStreamSocketOfSyncShopify({ message: data, status: 'failure', eventType: data.eventType });
      notification.error({
        message: i18n.t('publish_shopify.sync_error'),
        description: data.message,
      });
      ModalReportAfterError.getActions(MODAL_REPORT_AFTER_SYNC_ERROR).report({
        cause: i18n.t('ModalReportAfterError.error_cause.sync_result_to_shopify'),
        description: data.message,
      });
    }
    if (data.step.toUpperCase() === 'END' && data.status.toUpperCase() === 'SUCCESS') {
      setStreamSocketOfSyncShopify({ message: data, status: 'success', eventType: data.eventType });
    }
  };

  const handleListenSocketOfMigrateTheme = (data: MigrateThemeMessage) => {
    if (data.step.toUpperCase() === 'END' && data.status.toUpperCase() === 'ERROR') {
      setStreamSocketOfSyncShopify({ message: data, status: 'failure', eventType: data.eventType });
      notification.error({
        message: i18n.t('migrate_theme.migrate_error'),
        description: data.message,
      });
      ModalReportAfterError.getActions(MODAL_REPORT_AFTER_SYNC_ERROR).report({
        cause: i18n.t('ModalReportAfterError.error_cause.migrate_theme'),
        description: data.message,
      });
    }
    if (data.step.toUpperCase() === 'END' && data.status.toUpperCase() === 'SUCCESS') {
      setStreamSocketOfSyncShopify({ message: data, status: 'success', eventType: data.eventType });
    }
    if (data.step.toUpperCase() === 'PROCESSING' && data.status.toUpperCase() === 'ERROR') {
      setStreamSocketOfSyncShopify({ message: data, status: 'failure', eventType: data.eventType });
      notification.error({
        message: i18n.t('migrate_theme.migrate_error'),
        description: data.message,
      });
    }
    if (data.step.toUpperCase() === 'PROCESSING' && data.status.toUpperCase() !== 'ERROR') {
      setStreamSocketOfSyncShopify({ message: data, status: 'loading', eventType: data.eventType });
      notification.info({
        message: i18n.t('migrate_theme.migrating'),
        description: data.message,
      });
    }
  };

  const handleError: Parameters<Client['connect']>[2] = async error => {
    await delay(500);
    setStatusSocketConnection('failure');
    ModalReportAfterError.getActions(MODAL_REPORT_AFTER_SYNC_ERROR).report({
      cause: i18n.t('ModalReportAfterError.error_cause.connect_socket'),
      description: typeof error === 'string' ? error : '',
    });
  };

  const handleSuccess: Parameters<Client['connect']>[1] = async frame => {
    if (frame && frame.headers['user-name']) {
      setStatusSocketConnection('success');
      setEventIdOfSyncShopify(frame.headers['user-name']);
      subcriptionSyncShopifyFromVedaOutput.current = stompClientForSyncShopify?.subscribe('/user/topic/private/shopify/sync', message => {
        const data: SyncShopifyMessage = JSON.parse(message.body);
        handleListenSocketOfSyncShopify(data);
      });
      subcriptionForMigrateVedaToAnotherTheme.current = stompClientForSyncShopify?.subscribe('/user/topic/private/theme/migration', message => {
        const data: MigrateThemeMessage = JSON.parse(message.body);
        handleListenSocketOfMigrateTheme(data);
      });
    } else {
      await handleError?.(i18n.t('ModalReportAfterError.error_description.socket_event_id'));
    }
  };

  const handleConnect_ = ({ onSuccess, onError }: OnConnect) => {
    if (storage.getItem('API_FAKE') === 'true') {
      setStatusSocketConnection('success');
      return;
    }
    // Nếu page "iframe" và "preview" hoặc socket trước đó đang connect và thành công ngay khi gọi function này thì không connect socket
    if (['/iframe', '/preview'].includes(window.location.pathname) || stompClientForSyncShopify?.connected) {
      setStatusSocketConnection('success');
      return;
    }
    createSocket();
    stompClientForSyncShopify?.connect(
      {},
      frame => {
        handleSuccess(frame);
        onSuccess?.();
      },
      error => {
        handleError(error);
        onError?.();
      },
    );
  };

  const handleConnect = (callbacks: OnConnect) => {
    setStatusSocketConnection('loading');
    if (statusSocketConnection === 'success') {
      handleDisconnect(
        {
          cb: () => handleConnect_(callbacks),
        },
        true,
      );
    } else {
      handleConnect_(callbacks);
    }
  };

  useEffect(() => {
    return () => {
      if (statusSocketConnection === 'success' || stompClientForSyncShopify?.connected) {
        handleDisconnect({}, false);
      }
      cancelDelay();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    statusSocketConnection,
    connect: handleConnect,
    disconnect: (callbacks: OnDisconnect) => handleDisconnect(callbacks, false),
  };
};

const fulfillStatus: SyncFulfillStatus[] = ['success', 'failure'];

/** Saga ĐỢI và lắng nghe socket sync shopify hoàn thành */
export function* handleWaitForSocketOfSyncShopifyFulfill(eventType: SocketMessage['eventType']) {
  const { streams }: ReturnType<typeof socketOfSyncShopifySelector> = yield select(socketOfSyncShopifySelector);
  /** NOTE: @tuong -> Trong file cũng có đoạn check tương tự -> Nếu thay đổi phải xem xét việc update cả những cái bên dưới */
  /** NOTE: @tuong -> function có sự liên quan đến "watchSyncToShopify.ts" -> Nếu thay đổi phải xem xét file đó */
  if (fulfillStatus.includes(streams[eventType].status as SyncFulfillStatus)) {
    /**
     * NOTE: Thay vì làm 1 flow để reset cờ trạng thái của socket thì cứ thành công hoặc thất bại sẽ reset luôn
     * Câu hỏi 1: Tại sao làm như vậy
     * Trả lời: Tại thời điểm comment này được viết mọi chuyện xảy ra như sau
      - Các api sync shopify đều sử dụng socket
      - Sync từng phần để đảm bảo rate limit và giảm thiểu rủi ro (sync thiếu cái A thì chết app, ...)
      - Tại từng chặng sync sẽ phải check trạng thái sync trước đó phải "SUCCESS" hoặc "FAILURE" thì mới được tiếp tục chặng tiếp theo
      - 1 "flow saga" để chịu trách nhiệm reset cờ trạng thái của các chặng khi chặng đó đã hoàn thành (tức "SUCCESS" hoặc "FAILURE")
      - Trước đó mọi thứ đều OK. Nhưng tại thời điểm comment này được viết nó xảy ra lỗi. Ngữ cảnh như sau:
        + Thực hiện xoá 1 page bất kì -> action đổi cờ trạng thái chặng sync "SUCCESS" hoặc "FAILURE" và action reset cờ trạng thái cùa chặng sync xảy ra gần như là đồng thời (chưa đến 1ms) -> Bằng 1 cách nào đó function này không được thực thi khi cờ trạng thái sync chuyển "SUCCESS" hoặc "FAILURE" mà chỉ nhận được cờ trạng thái "SẴN SÀNG" -> các api sync bị treo do chặng sync trước đó không thông báo là đã "SUCCESS" hoặc "FAILURE" -> LỖI CỰC KÌ NGHIỆM TRỌNG
        + @tuong đề nghị một cách sửa như sau:
          -> Bỏ '1 "flow saga" để chịu trách nhiệm reset cờ trạng thái của các chặng khi chặng đó đã hoàn thành (tức "SUCCESS" hoặc "FAILURE")'
          -> Thay vào đó đổi cờ trạng thái chặng sync ngay tại function này -> Điều này làm cho việc cờ trạng thái chặng sync chỉ phụ thuộc vào function này -> Mọi thứ đồng bộ -> Sẽ là OK
     */
    yield put(setStreamSocketOfSyncShopify({ message: undefined, status: 'idle', eventType }));
    return streams[eventType].status as SyncFulfillStatus;
  }
  while (true) {
    yield take(getActionType(setStreamSocketOfSyncShopify));
    const { streams }: ReturnType<typeof socketOfSyncShopifySelector> = yield select(socketOfSyncShopifySelector);
    if (fulfillStatus.includes(streams[eventType].status as SyncFulfillStatus)) {
      yield put(setStreamSocketOfSyncShopify({ message: undefined, status: 'idle', eventType }));
      return streams[eventType].status as SyncFulfillStatus;
    }
  }
}
