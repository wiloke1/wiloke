import { StackNavigatorState } from 'components/StackNavigator/types';
import { LeftBarParamList } from 'containers/BuilderPage/components/SidebarScreen/SidebarScreen';
import { useUndoRedoForRedux } from 'hooks/useUndoRedoForRedux/useUndoRedoForRedux';
import { Store } from 'redux';
import { ThunkAction as _ThunkAction } from 'redux-thunk';
import SockJS from 'sockjs';
import { Stomp } from 'stompjs';
import { Twig } from 'twig';
import { getErrorOfCodeLiquid } from 'utils/LiquidSyntaxToTwig/getExceptionOfCodeLiquid';
import { ActionTypes } from 'wiloke-react-core/utils';
import { Reducers } from './store/configureStore';

declare global {
  declare type AppState = Reducers;
  declare type RootState = Reducers;
  declare type GetState = () => AppState;
  declare type ThunkAction<TAction> =
    | _ThunkAction<void, AppState, unknown, ActionTypes<TAction>>
    | Promise<_ThunkAction<Promise<void>, AppState, unknown, ActionTypes<TAction>>>;
  declare type Connect<TTypeOfMapStateToProps, TTypeOfMapDispatchToProps> = ReturnType<TTypeOfMapStateToProps> & TTypeOfMapDispatchToProps;

  declare type ValueOf<T> = T[keyof T];

  declare type Status = 'idle' | 'loading' | 'success' | 'failure';

  declare type SyncStatus = Exclude<Status, 'loading'>;
  declare type SyncFulfillStatus = Exclude<SyncStatus, 'idle'>;

  declare type UnionToIntersection<T> = (T extends any ? (x: T) => any : never) extends (x: infer R) => any ? R : never;

  export type DeepPartial<T> = T extends (args: any[]) => any ? T : T extends Record<any, any> ? { [P in keyof T]?: DeepPartial<T[P]> } : T;

  declare interface Window {
    $crisp: any;
    CRISP_WEBSITE_ID: string;
    shopName: string;
    baseUrl: string;
    tidioChatApi: any;
    Sass: any;
    Twig: Twig['exports'] & Twig;
    builderMode: boolean;
    tsSuggestions: string;
    htmlSuggestion: languages.CompletionItem[];
    vscodeTheme: any;
    Stomp: typeof Stomp;
    SockJS: typeof SockJS;
    motaCoreClassNames: string[];
    motaProps: Record<string, string>;
    motaPseudo: Record<string, string>;
    cssData: {
      properties: { name: string; values: { name: string; description: string }[]; description: string }[];
      pseudoClasses: { name: string; values: { name: string; description: string }[]; description: string }[];
      pseudoElements: { name: string; values: { name: string; description: string }[]; description: string }[];
    };
    getCompletionItemMediaForMota(max?: boolean): languages.CompletionItem[];
    readyForScreenshot: boolean;
    fakeProduct: any;
    prettier: any;
    prettierPlugins: any;
    prettierPluginLiquid: any;
    hiddenFieldAction: any;
    redirectTo: any;
    store: Store<AppState>;
    useUndoRedoForRedux: typeof useUndoRedoForRedux;
    vedaNavigation: StackNavigatorState<LeftBarParamList>;
    monacoCheckerAsync: (language: Language, isSaveEvent: MonacoErrorParams['isSaveEvent']) => Promise<MonacoError>;
    getErrorOfCodeLiquid: typeof getErrorOfCodeLiquid;
  }
  declare namespace NodeJS {
    interface ProcessEnv {
      readonly REACT_APP_PRODUCT: 'veda';
      readonly REACT_APP_IMAGE_EDITOR_TOKEN: string;
      readonly REACT_APP_ADMIN_IMAGE_EDITOR_TOKEN: string;
      readonly TOKEN: string;
    }
  }

  // yêu cầu có các key chỉ định trong Partial<T>
  declare type AtLeast<T, K extends keyof T> = Partial<T> & Pick<T, K>;

  declare type Callback = () => void;

  declare type EntityType = 'Draft' | 'Atom' | 'Client';
}
