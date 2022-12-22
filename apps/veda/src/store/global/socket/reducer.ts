import { ImportThemeAtomToClientServiceMessage } from 'hooks/useSocket/useSocketForImportThemeAtomToClientService';
import { SocketMessage } from 'hooks/useSocket/useSocketForSyncShopify';
import { ActionTypes, createReducer, handleAction } from 'wiloke-react-core/utils';
import {
  syncToShopify,
  previewWithShopify,
  setEventIdOfSyncShopify,
  setStreamSocketOfSyncShopify,
  resetSyncToShopifyStatus,
  resetPreviewWithShopifyStatus,
  setEventIdOfImportThemeAtomToClientService,
  setStreamSocketOfImportThemeAtomToClientService,
} from './actions';

interface StreamData {
  status: SyncStatus;
  message: SocketMessage | ImportThemeAtomToClientServiceMessage | undefined;
}

const defaultStreamData: StreamData = {
  status: 'idle',
  message: undefined,
};

interface State {
  syncShopify: {
    eventId: string | undefined;
    statusSyncToShopify: Status;
    statusPreviewWithShopify: Status;
    previewUrls: string[] | null | undefined;
    // @tuong -> "streams" dùng để lắng nghe socket hoàn thành cũng như chứa dữ liệu mà socket trả về
    streams: Record<SocketMessage['eventType'], StreamData>;
  };
  importThemeAtomToClientService: {
    eventId: string | undefined;
    // @tuong -> "streams" dùng để lắng nghe socket hoàn thành cũng như chứa dữ liệu mà socket trả về
    streams: Record<ImportThemeAtomToClientServiceMessage['eventType'], StreamData>;
  };
}
type Actions = ActionTypes<
  | typeof syncToShopify
  | typeof previewWithShopify
  | typeof setEventIdOfSyncShopify
  | typeof setStreamSocketOfSyncShopify
  | typeof resetSyncToShopifyStatus
  | typeof resetPreviewWithShopifyStatus
  | typeof setEventIdOfImportThemeAtomToClientService
  | typeof setStreamSocketOfImportThemeAtomToClientService
>;

export const defaultStateOutputOfBuilder: State = {
  syncShopify: {
    eventId: undefined,
    statusSyncToShopify: 'idle',
    statusPreviewWithShopify: 'idle',
    previewUrls: [],
    streams: {
      'Delete ouput builder ngoài dashboard': defaultStreamData,

      'Publish | Unpublish page ngoài dashboard': defaultStreamData,

      'Update shopifyPages ngoài dashboard': defaultStreamData,
      'Update shopifyPages ngoài dashboard/Từ "all" -> 1 vài => Unpublish tất cả': defaultStreamData,

      'Ghi file khi save ở builder page / Ghi global (sinh ra từ themeSettings)': defaultStreamData,
      'Ghi file khi save ở builder page / Ghi header footer': defaultStreamData,
      'Ghi file khi save ở builder page / Ghi page': defaultStreamData,

      'Ghi file khi update page settings ngoài dashboard': defaultStreamData,

      'Ghi file khi update theme settings ngoài dashboard': defaultStreamData,

      'Ghi file atomic css khi save ở builder page': defaultStreamData,

      'Ghi file khi save ở builder page / Ghi addon enable position': defaultStreamData,
      'Ghi file khi save ở builder page / Ghi addon disable position': defaultStreamData,
      'Ghi file khi save ở builder page / Ghi các addon disable position vừa tạo xong vào file theme': defaultStreamData,

      'Delete addon khi save ở builder': defaultStreamData,

      'Sync translation': defaultStreamData,

      'Migrate theme': defaultStreamData,
    },
  },
  importThemeAtomToClientService: {
    eventId: undefined,
    streams: {
      'Import theme atom -> client service ngoài dashboard': { status: 'idle', message: undefined },
    },
  },
};

export const reducerSocket = createReducer<State, Actions>(defaultStateOutputOfBuilder, [
  handleAction('@syncShopify/setEventIdOfSyncShopify', ({ state, action }) => {
    return {
      ...state,
      syncShopify: { ...state.syncShopify, eventId: action.payload },
    };
  }),
  handleAction('@syncShopify/syncing', ({ state }) => {
    return {
      ...state,
      syncShopify: {
        ...state.syncShopify,
        statusSyncToShopify: 'loading',
      },
    };
  }),
  handleAction('@syncShopify/synced', ({ state }) => {
    return {
      ...state,
      syncShopify: {
        ...state.syncShopify,
        statusSyncToShopify: 'success',
      },
    };
  }),
  handleAction('@syncShopify/syncFailure', ({ state }) => {
    return {
      ...state,
      syncShopify: {
        ...state.syncShopify,
        statusSyncToShopify: 'failure',
      },
    };
  }),
  handleAction('@previewWithShopify/syncing', ({ state }) => {
    return {
      ...state,
      syncShopify: {
        ...state.syncShopify,
        statusPreviewWithShopify: 'loading',
      },
    };
  }),
  handleAction('@previewWithShopify/synced', ({ state }) => {
    return {
      ...state,
      syncShopify: {
        ...state.syncShopify,
        statusPreviewWithShopify: 'success',
      },
    };
  }),
  handleAction('@previewWithShopify/syncFailure', ({ state }) => {
    return {
      ...state,
      syncShopify: {
        ...state.syncShopify,
        statusPreviewWithShopify: 'failure',
      },
    };
  }),
  handleAction('@syncShopify/setStreamSocketOfSyncShopify', ({ state, action }) => {
    const { eventType, message, status } = action.payload;
    return {
      ...state,
      syncShopify: {
        ...state.syncShopify,
        previewUrls: message && 'previewUrls' in message ? message?.previewUrls : state.syncShopify.previewUrls,
        streams: {
          ...state.syncShopify.streams,
          [eventType]: {
            status,
            message,
          },
        },
      },
    };
  }),
  handleAction('@syncShopify/resetSyncToShopifyStatus', ({ state }) => {
    return {
      ...state,
      syncShopify: {
        ...state.syncShopify,
        statusSyncToShopify: 'idle',
        previewUrls: [],
      },
    };
  }),
  handleAction('@previewWithShopify/resetPreviewWithShopifyStatus', ({ state }) => {
    return {
      ...state,
      syncShopify: {
        ...state.syncShopify,
        statusPreviewWithShopify: 'idle',
        previewUrls: [],
      },
    };
  }),
  handleAction('@importThemeAtomToClientService/setEventIdOfSyncShopify', ({ state, action }) => {
    return {
      ...state,
      importThemeAtomToClientService: { ...state.importThemeAtomToClientService, eventId: action.payload },
    };
  }),
  handleAction('@importThemeAtomToClientService/setStreamSocketOfImportThemeAtomToClientService', ({ state, action }) => {
    const { eventType, message, status } = action.payload;
    return {
      ...state,
      importThemeAtomToClientService: {
        ...state.importThemeAtomToClientService,
        streams: {
          ...state.importThemeAtomToClientService.streams,
          [eventType]: {
            status: status as SyncStatus,
            message,
          },
        },
      },
    };
  }),
]);
