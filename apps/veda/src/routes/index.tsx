import AsyncComponent from 'components/AsyncComponent';
import { CodeSpliting } from 'components/CodeSpliting';
import { VedaLoadingItem } from 'components/VedaLoadingItem';
import configureApp from 'configureApp';
import { PageManagement } from 'containers/Admin/Management/Pages';
import { ThemeManagement } from 'containers/Admin/Management/Themes';
import { ArticlesPage } from 'containers/Admin/PageBuilder/ArticlesPage';
import { BlankPage } from 'containers/Admin/PageBuilder/BlankPage';
import CartPage from 'containers/Admin/PageBuilder/CartPage';
import CollectionListing from 'containers/Admin/PageBuilder/CollectionListing';
import { CollectionPage } from 'containers/Admin/PageBuilder/CollectionPage';
import CustomerAccount from 'containers/Admin/PageBuilder/CustomerAccount';
import CustomerActivateAccount from 'containers/Admin/PageBuilder/CustomerActivateAccount';
import CustomerAddresses from 'containers/Admin/PageBuilder/CustomerAddresses';
import CustomerLogin from 'containers/Admin/PageBuilder/CustomerLogin';
import CustomerOrder from 'containers/Admin/PageBuilder/CustomerOrder';
import CustomerRegister from 'containers/Admin/PageBuilder/CustomerRegister';
import CustomerResetPassword from 'containers/Admin/PageBuilder/CustomerResetPassword';
import { DashboardPage } from 'containers/Admin/PageBuilder/DashboardPage';
import GiftCard from 'containers/Admin/PageBuilder/GiftCard';
import { HomePage } from 'containers/Admin/PageBuilder/HomePage';
import { NotFoundPage as NotFoundPageBuilder } from 'containers/Admin/PageBuilder/NotFoundPage';
import PasswordPage from 'containers/Admin/PageBuilder/PasswordPage';
import { ProductsPage } from 'containers/Admin/PageBuilder/ProductsPage';
import SearchPage from 'containers/Admin/PageBuilder/SearchPage';
import { TemplatesPage } from 'containers/Admin/PageBuilder/TemplatesPage';
import { PlanManagement } from 'containers/Admin/PlanManagement';
import { ModalCampaign } from 'containers/Admin/PlanManagement/components/ModalCampaign';
import { ValidateCoupon } from 'containers/Admin/PlanManagement/ValidateCoupon';
import { PresetStylesPage } from 'containers/Admin/PresetStylesPage';
import { ThemeDashboard } from 'containers/Admin/ThemeBuilder/ThemeDashboard';
import { ModalMigration } from 'containers/Admin/ThemeBuilder/ThemeDashboard/ModalMigration';
import { ThemeSettings } from 'containers/Admin/ThemeBuilder/ThemeSettings';
import { ThemeTemplates } from 'containers/Admin/ThemeBuilder/ThemeTemplates';
import { Maintainance } from 'containers/Maintainance';
import {
  MODAL_REPORT_AFTER_IMPORT_THEME_ERROR,
  MODAL_REPORT_AFTER_SYNC_ERROR,
  MODAL_REPORT_INITIALIZATION_SESSION_BUILDER_ERROR,
  MODAL_REPORT_SAVE_ERROR,
  MODAL_REPORT_SAVE_PAGE_SETITNGS_IN_DASHBOARD_ERROR,
  MODAL_REPORT_SAVE_THEME_SETITNGS_IN_DASHBOARD_ERROR,
  MODAL_REPORT_DELETE_PAGE_ERROR,
  MODAL_REPORT_UPDATE_STATUS_PAGE_ERROR,
} from 'containers/ModalReportAfterError/const';
import { ModalReportAfterError } from 'containers/ModalReportAfterError/ModalReportAfterError';
import { ModalSyncShopifyForPreviewSuccess } from 'containers/ModalSyncShopifySuccess/ModalSyncShopifyForPreviewSuccess';
import { ModalSyncShopifyForSaveSuccess } from 'containers/ModalSyncShopifySuccess/ModalSyncShopifyForSaveSuccess';
import { NotFoundPage } from 'containers/NotFoundPage';
import { PricingPage } from 'containers/PricingPage';
import EmbeddedTestPage from 'containers/TestPage/EmbeddedTestPage';
import TestPage from 'containers/TestPage/TestPage';
import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { useSetAccessToken, useVerifyUser } from 'store/global/auth';
import { useGlobalMount } from 'store/global/globalMount/action';
import { authSelector, globalMountSelector } from 'store/selectors';
import storage from 'utils/functions/storage';
import { isIframePage } from 'utils/isFramePage';
import { isPreviewPage } from 'utils/isPreviewPage';
import { View } from 'wiloke-react-core';
import GuardedRoute from './components/GuardedRoute';
import { Page } from './types';

export const pages: Page[] = [
  {
    path: '/pricing',
    component: PricingPage,
    exact: true,
  },
  {
    path: '/manager-plan',
    component: PlanManagement,
    exact: true,
  },
  {
    path: '/manager-users',
    component: () => (
      <CodeSpliting
        component={() => import(/* webpackChunkName: "UserManagement", webpackPrefetch: true */ 'containers/Admin/UserManagement')}
        CHUNK_ID="UserManagement"
      />
    ),
    exact: true,
  },
  {
    path: '/login',
    component: () => (
      <CodeSpliting component={() => import(/* webpackChunkName: "LoginPage", webpackPrefetch: true */ 'containers/Login')} CHUNK_ID="LoginPage" />
    ),
    exact: true,
  },
  {
    path: '/account',
    component: () => (
      <CodeSpliting
        component={() => import(/* webpackChunkName: "AccountPage", webpackPrefetch: true */ 'containers/Admin/AccountPage')}
        CHUNK_ID="AccountPage"
      />
    ),
    exact: true,
  },
  {
    path: '/notifications',
    component: () => (
      <CodeSpliting
        component={() => import(/* webpackChunkName: "NotificationPage", webpackPrefetch: true */ 'containers/Admin/NotificationPage')}
        CHUNK_ID="NotificationPage"
      />
    ),
    exact: true,
  },
  {
    path: '/theme/settings',
    component: ThemeSettings,
    exact: true,
  },
  {
    path: '/page',
    exact: true,
    component: DashboardPage,
  },
  {
    path: '/theme',
    exact: true,
    component: ThemeDashboard,
  },
  {
    path: '/page/templates',
    exact: true,
    component: TemplatesPage,
  },
  {
    path: '/home',
    exact: true,
    title: 'Home',
    component: () => (
      <CodeSpliting component={() => import(/* webpackChunkName: "HomePage", webpackPrefetch: true */ 'containers/HomePage')} CHUNK_ID="HomePage" />
    ),
  },
  {
    path: '/builder',
    exact: true,
    title: 'Veda Builder',
    component: () => (
      <CodeSpliting
        component={() => import(/* webpackChunkName: "BuilderPage", webpackPrefetch: true */ 'containers/BuilderPage')}
        CHUNK_ID="BuilderPage"
      />
    ),
  },
  {
    path: '/iframe',
    exact: true,
    component: () => (
      <CodeSpliting
        component={() => import(/* webpackChunkName: "IframePage", webpackPrefetch: true */ 'containers/IframePage')}
        CHUNK_ID="IframePage"
      />
    ),
  },
  {
    path: '/page/blank',
    exact: true,
    component: BlankPage,
  },
  {
    path: '/page/home',
    exact: true,
    component: HomePage,
  },
  {
    path: '/page/article',
    exact: true,
    component: ArticlesPage,
  },
  {
    path: '/page/collection',
    exact: true,
    component: CollectionPage,
  },
  {
    path: '/page/products',
    exact: true,
    component: ProductsPage,
  },
  {
    path: '/page/cart',
    exact: true,
    component: CartPage,
  },
  {
    path: '/page/search',
    exact: true,
    component: SearchPage,
  },
  {
    path: '/page/password',
    exact: true,
    component: PasswordPage,
  },
  {
    path: '/page/notfound',
    exact: true,
    component: NotFoundPageBuilder,
  },
  {
    path: '/page/customer-login',
    exact: true,
    component: CustomerLogin,
  },
  {
    path: '/page/customer-reset-password',
    exact: true,
    component: CustomerResetPassword,
  },
  {
    path: '/page/customer-activate-account',
    exact: true,
    component: CustomerActivateAccount,
  },
  {
    path: '/page/customer-account',
    exact: true,
    component: CustomerAccount,
  },
  {
    path: '/page/customer-addresses',
    exact: true,
    component: CustomerAddresses,
  },
  {
    path: '/page/customer-register',
    exact: true,
    component: CustomerRegister,
  },
  {
    path: '/page/gift-card',
    exact: true,
    component: GiftCard,
  },
  {
    path: '/page/collection-listing',
    exact: true,
    component: CollectionListing,
  },
  {
    path: '/page/customer-order',
    exact: true,
    component: CustomerOrder,
  },
  {
    path: '/theme/templates',
    exact: true,
    component: ThemeTemplates,
  },
  {
    path: '/test',
    exact: true,
    component: TestPage,
  },
  {
    path: '/embeddedtest',
    exact: true,
    component: EmbeddedTestPage,
  },
  {
    path: '/preset-styles',
    exact: true,
    component: PresetStylesPage,
  },
  {
    path: '/preview',
    exact: true,
    component: () => (
      <CodeSpliting
        component={() => import(/* webpackChunkName: "PreviewPage", webpackPrefetch: true */ 'containers/IframePage/PreviewPage')}
        CHUNK_ID="PreviewPage"
      />
    ),
  },
  {
    path: '/notfound',
    exact: true,
    component: NotFoundPage,
  },
  {
    path: '/manager-page',
    exact: true,
    component: PageManagement,
  },
  {
    path: '/manager-theme',
    exact: true,
    component: ThemeManagement,
  },
  {
    path: '/maintainance',
    exact: true,
    component: Maintainance,
  },
];

const Routes: FC = () => {
  const { accessToken } = useSelector(authSelector);
  const { status } = useSelector(globalMountSelector);
  const globalMount = useGlobalMount();
  const getUserInfo = useVerifyUser();
  const setAccessToken = useSetAccessToken();

  useEffect(() => {
    const token = storage.getItem('TOKEN');
    if (configureApp.env === 'dev') {
      if (accessToken === '') {
        setAccessToken(token ?? 'dev');
        // setRoleForDev('admin');
      }
    } else {
      setAccessToken(token ?? '');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken]);

  useEffect(() => {
    if (!isIframePage() && !isPreviewPage()) {
      if (configureApp.env === 'dev') {
        if (accessToken) {
          getUserInfo.request({
            callback: () => {
              globalMount.request(undefined);
            },
          });
        }
      } else {
        getUserInfo.request({
          callback: () => {
            globalMount.request(undefined);
          },
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken]);

  const renderLoading = (
    <View
      css={{
        position: 'fixed',
        inset: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
      }}
    >
      <VedaLoadingItem />
    </View>
  );

  return (
    <BrowserRouter>
      <Switch>
        <Route exact={true} path="/">
          <Redirect from="/" to={'/theme'} exact></Redirect>
        </Route>

        {pages.map(({ component: Component, path, ...rest }) => {
          const _Component =
            path === '/iframe' || path === '/preview' ? (
              <Component />
            ) : (
              <AsyncComponent Request={renderLoading} status={status} Success={<Component />} />
            );
          return (
            <GuardedRoute key={path} {...rest} path={path}>
              {_Component}
            </GuardedRoute>
          );
        })}

        <Route>
          <NotFoundPage />
        </Route>
      </Switch>
      <ModalSyncShopifyForSaveSuccess />
      <ModalSyncShopifyForPreviewSuccess />
      <ModalReportAfterError id={MODAL_REPORT_AFTER_SYNC_ERROR} />
      <ModalReportAfterError id={MODAL_REPORT_AFTER_IMPORT_THEME_ERROR} />
      <ModalReportAfterError id={MODAL_REPORT_INITIALIZATION_SESSION_BUILDER_ERROR} />
      <ModalReportAfterError id={MODAL_REPORT_SAVE_ERROR} />
      <ModalReportAfterError id={MODAL_REPORT_SAVE_PAGE_SETITNGS_IN_DASHBOARD_ERROR} />
      <ModalReportAfterError id={MODAL_REPORT_SAVE_THEME_SETITNGS_IN_DASHBOARD_ERROR} />
      <ModalReportAfterError id={MODAL_REPORT_DELETE_PAGE_ERROR} />
      <ModalReportAfterError id={MODAL_REPORT_UPDATE_STATUS_PAGE_ERROR} />

      {status === 'success' && <ModalCampaign />}
      <ModalMigration />
      <ValidateCoupon />
    </BrowserRouter>
  );
};

export default Routes;
