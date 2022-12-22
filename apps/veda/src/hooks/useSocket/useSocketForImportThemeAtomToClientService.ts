import { notification } from 'antd';
import configureApp from 'configureApp';
import { MODAL_REPORT_AFTER_IMPORT_THEME_ERROR } from 'containers/ModalReportAfterError/const';
import { ModalReportAfterError } from 'containers/ModalReportAfterError/ModalReportAfterError';
import useDelay from 'hooks/useDelay';
import { useEffect, useRef, useState } from 'react';
import { put, select, take } from 'redux-saga/effects';
import { Client, Subscription } from 'stompjs';
import {
  setStreamSocketOfImportThemeAtomToClientService,
  useSetEventIdOfImportThemeAtomToClientService,
  useSetStreamSocketOfImportThemeAtomToClientService,
} from 'store/global/socket/actions';
import { socketOfImportThemeAtomClientServiceSelector } from 'store/selectors';
import { i18n } from 'translation';
import storage from 'utils/functions/storage';
import { getActionType } from 'wiloke-react-core/utils';
import { OnConnect, OnDisconnect } from './types';

let socketForImportThemeAtomToClientService: WebSocket | undefined;
let stompClientForImporrtThemeAtomToClientService: Client | undefined;

const createSocket = () => {
  socketForImportThemeAtomToClientService = new window.SockJS(
    `${configureApp.socketAPIForImportThemeAtomToClientService}/${configureApp.socketEndpoint}`,
  );
  stompClientForImporrtThemeAtomToClientService = window.Stomp.over(socketForImportThemeAtomToClientService);
};

export interface ImportThemeAtomToClientServiceMessage {
  eventType: 'Import theme atom -> client service ngoài dashboard';
  message: string;
  step: 'PROCESSING' | 'SUCCESS' | 'END';
  status: 'success' | 'error';
  themeCommandId?: string;
}

export const useSocketForImportThemeAtomToClientService = () => {
  const setEventIdOfImportThemeAtomToClientService = useSetEventIdOfImportThemeAtomToClientService();
  const [statusSocketConnection, setStatusSocketConnection] = useState<Status>(
    stompClientForImporrtThemeAtomToClientService?.connected ? 'success' : 'idle',
  );
  const [delay, cancelDelay] = useDelay();
  const setStreamSocketOfImportThemeAtomToClientService = useSetStreamSocketOfImportThemeAtomToClientService();
  const subcription = useRef<Subscription | undefined>(undefined);

  const handleDisconnect_ = async ({ cb }: OnDisconnect, isConnectAction: boolean) => {
    if (subcription.current) {
      stompClientForImporrtThemeAtomToClientService?.unsubscribe(subcription.current.id);
      subcription.current = undefined;
    }
    if (!isConnectAction) {
      setStatusSocketConnection('idle');
    }
    cb?.();
  };

  const handleDisconnect = (callbacks: OnDisconnect, isConnectAction: boolean) => {
    if (stompClientForImporrtThemeAtomToClientService?.connected) {
      stompClientForImporrtThemeAtomToClientService?.disconnect(() => handleDisconnect_(callbacks, isConnectAction));
    } else {
      handleDisconnect_(callbacks, isConnectAction);
    }
  };

  const handleListenSocketOfImportThemeAtomToClientService = (data: ImportThemeAtomToClientServiceMessage) => {
    if (data.step.toUpperCase() === 'END' && data.status.toUpperCase() === 'ERROR') {
      setStreamSocketOfImportThemeAtomToClientService({ message: data, status: 'failure', eventType: data.eventType });
      notification.error({
        message: i18n.t('import_theme_atom_to_client_service.import_error'),
        description: data.message,
      });
      ModalReportAfterError.getActions(MODAL_REPORT_AFTER_IMPORT_THEME_ERROR).report({
        cause: i18n.t('ModalReportAfterError.error_cause.connect_socket'),
        description: data.message,
      });
    }
    if (data.step.toUpperCase() === 'END' && data.status.toUpperCase() === 'SUCCESS') {
      setStreamSocketOfImportThemeAtomToClientService({ message: data, status: 'success', eventType: data.eventType });
      notification.success({
        message: i18n.t('import_theme_atom_to_client_service.import_success'),
        description: data.message,
      });
    }
  };

  const handleError: Parameters<Client['connect']>[2] = async error => {
    await delay(500);
    setStatusSocketConnection('failure');
    ModalReportAfterError.getActions(MODAL_REPORT_AFTER_IMPORT_THEME_ERROR).report({
      cause: i18n.t('ModalReportAfterError.error_cause.connect_socket'),
      description: typeof error === 'string' ? error : '',
    });
  };

  const handleSuccess: Parameters<Client['connect']>[1] = async frame => {
    if (frame && frame.headers['user-name']) {
      setStatusSocketConnection('success');
      setEventIdOfImportThemeAtomToClientService(frame.headers['user-name']);
      subcription.current = stompClientForImporrtThemeAtomToClientService?.subscribe('/user/topic/theme/synced', message => {
        const data: ImportThemeAtomToClientServiceMessage = JSON.parse(message.body);
        handleListenSocketOfImportThemeAtomToClientService(data);
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
    if (['/iframe', '/preview'].includes(window.location.pathname) || stompClientForImporrtThemeAtomToClientService?.connected) {
      setStatusSocketConnection('success');
      return;
    }
    createSocket();
    stompClientForImporrtThemeAtomToClientService?.connect(
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
    if (stompClientForImporrtThemeAtomToClientService?.connected) {
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
      if (statusSocketConnection === 'success' || stompClientForImporrtThemeAtomToClientService?.connected) {
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

/** Saga ĐỢI vf lắng nghe socket import theme atom hoàn thành */
export function* handleWaitForSocketOfImportThemeAtomToClientServiceFulfill(eventType: ImportThemeAtomToClientServiceMessage['eventType']) {
  const { streams }: ReturnType<typeof socketOfImportThemeAtomClientServiceSelector> = yield select(socketOfImportThemeAtomClientServiceSelector);
  if (fulfillStatus.includes(streams[eventType].status as SyncFulfillStatus)) {
    yield put(setStreamSocketOfImportThemeAtomToClientService({ message: undefined, status: 'idle', eventType }));
    return streams[eventType].status as SyncFulfillStatus;
  }
  while (true) {
    yield take(getActionType(setStreamSocketOfImportThemeAtomToClientService));
    const { streams }: ReturnType<typeof socketOfImportThemeAtomClientServiceSelector> = yield select(socketOfImportThemeAtomClientServiceSelector);
    if (fulfillStatus.includes(streams[eventType].status as SyncFulfillStatus)) {
      yield put(setStreamSocketOfImportThemeAtomToClientService({ message: undefined, status: 'idle', eventType }));
      return streams[eventType].status as SyncFulfillStatus;
    }
  }
}
