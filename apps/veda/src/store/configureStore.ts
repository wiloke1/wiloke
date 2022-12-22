import createSagaMiddleware from '@redux-saga/core';
import { backToPage } from 'containers/BuilderPage/store/saveForBuilder/actions';
import { trackingActionMiddleware } from 'hooks/useUndoRedoForRedux/trackingActionMiddleware';
import { useUndoRedoForRedux } from 'hooks/useUndoRedoForRedux/useUndoRedoForRedux';
import { applyMiddleware, combineReducers, compose, createStore, Middleware } from 'redux';
import { createLogger } from 'redux-logger';
import { PersistConfig, persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import rootReducers from 'store/rootReducers';
import rootSaga from 'store/rootSagas';
import { createAction, getActionType } from 'wiloke-react-core/utils';
import { isIframePage } from 'utils/isFramePage';
import { isPreviewPage } from 'utils/isPreviewPage';
import { defaultPageGeneralSettings } from './global/generalSettings/slice';
import { defaultPageJs } from './global/globalJs/slice';
import { defaultPageScss } from './global/globalScss/slice';
import { setIframeHover } from './global/iframeHover/slice';
import { defaultThemeHeaderFooterState } from './global/themeHeaderFooter/slice';
import { defaultStatePages } from './reducers/reducerPages';
import { defaultPageVendors } from './reducers/reducerVendors';
import { redirectReduxMiddleware, reduxPersistCompress } from './global/redirected/slice';
import { sliceSectionIdHover } from './global/sectionIdHover/slice';
import { setAppState } from './actions/actionAppState';

const _isDev = process.env.NODE_ENV === 'development';
const composeEnhancers =
  ((window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true, traceLimit: 25 })) ||
  compose;

const persistConfig: PersistConfig<AppState> = {
  key: 'root',
  storage,
  whitelist: ['global'],
  transforms: [reduxPersistCompress()],
};

const _combineReducers = combineReducers({
  ...rootReducers,
});

const _appReducer = (state: ReturnType<typeof _combineReducers> | undefined, action: ReturnType<ReturnType<typeof createAction>>) => {
  if (action.type === getActionType(setAppState) && state && isPreviewPage()) {
    const appState = (action.payload as any).appState as AppState;
    return _combineReducers(appState, action);
  }
  // const resetCond = action.type === getActionType(backToPage) || (!isPreviewPage() && !isIframePage() && window.location.pathname !== '/builder');
  // khi bấm back phải reset lại state theme addons nếu không sẽ bị trường hợp tạo page mới nhưng vẫn còn các addons đã load từ đợt load trước
  if (action.type === getActionType(backToPage)) {
    return _combineReducers(
      state
        ? {
            ...state,
            global: {
              ...state.global,
              pages: defaultStatePages,
              themeHeaderFooter: defaultThemeHeaderFooterState,
              pageSettings: {
                generalSettings: defaultPageGeneralSettings,
                vendors: defaultPageVendors,
                globalScss: defaultPageScss,
                globalJs: defaultPageJs,
              },
              generalSettingStatus: {
                ...state.global.generalSettingStatus,
                getPageSettingsStatus: 'idle',
              },
              redirected: false,
              themeSettings: {
                cssVariables: state.global.originThemeSettings.isSavedTheme
                  ? state.global.themeSettings.cssVariables
                  : state.global.originThemeSettings.themeSettings.cssVariables,
                generalSettings: state.global.originThemeSettings.isSavedTheme
                  ? state.global.themeSettings.generalSettings
                  : state.global.originThemeSettings.themeSettings.generalSettings,
                globalJs: state.global.originThemeSettings.isSavedTheme
                  ? state.global.themeSettings.globalJs
                  : state.global.originThemeSettings.themeSettings.globalJs,
                globalScss: state.global.originThemeSettings.isSavedTheme
                  ? state.global.themeSettings.globalScss
                  : state.global.originThemeSettings.themeSettings.globalScss,
                layoutSettings: state.global.originThemeSettings.isSavedTheme
                  ? state.global.themeSettings.layoutSettings
                  : state.global.originThemeSettings.themeSettings.layoutSettings,
                vendors: state.global.originThemeSettings.isSavedTheme
                  ? state.global.themeSettings.vendors
                  : state.global.originThemeSettings.themeSettings.vendors,
                globalTranslations: {
                  ...state.global.themeSettings.globalTranslations,
                  translation: state.global.originThemeSettings.isSavedTheme
                    ? state.global.themeSettings.globalTranslations.translation
                    : state.global.originThemeSettings.themeSettings.globalTranslations,
                },
              },
            },
            adminDashboard: {
              ...state.adminDashboard,
              themeBuilder: {
                ...state.adminDashboard.themeBuilder,
                templates: {
                  ...state.adminDashboard.themeBuilder.templates,
                  getThemeStatus: 'idle',
                },
              },
            },
          }
        : undefined,
      action,
    );
  }
  if (Object.values(useUndoRedoForRedux.ACTIONS).includes(action.type)) {
    const snapshot = action.payload as Reducers;
    const { pages, themeAddons, themeHeaderFooter, pageSettings, themeSettings, megaMenu } = snapshot.global;
    return _combineReducers(
      state
        ? {
            ...state,
            global: {
              ...state.global,
              pages,
              themeAddons,
              themeHeaderFooter,
              pageSettings,
              themeSettings,
              megaMenu,
            },
          }
        : undefined,
      action,
    );
  }
  return _combineReducers(state, action);
};

const sagaMiddleware = createSagaMiddleware();
const reducers = isIframePage() ? _appReducer : persistReducer(persistConfig, _appReducer);
const middlewares: Middleware[] = [sagaMiddleware, thunk, trackingActionMiddleware, redirectReduxMiddleware];

const _logger = createLogger({
  predicate: (_, action) =>
    action.type !== getActionType(setIframeHover) && action.type !== getActionType(sliceSectionIdHover.actions.setSectionIdHover),
  titleFormatter: (action: any, _time: string, took: number) => {
    return `action ${action.type} - took: ${took.toFixed(2)} ms`;
  },
  collapsed: true,
});

if (!isIframePage()) {
  middlewares.push(_logger);
}

// @ts-ignore
const store = createStore(reducers, undefined, composeEnhancers(applyMiddleware(...middlewares)));
sagaMiddleware.run(rootSaga);
const persistor = isIframePage() || isPreviewPage() ? undefined : persistStore(store as any);

export type Reducers = ReturnType<typeof _combineReducers>;

window.store = store;

export { store, persistor };
