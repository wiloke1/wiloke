import { all, call, spawn, delay } from '@redux-saga/core/effects';
import { sagasChooseTemplate } from 'containers/ChooseTemplate';
import sagaImageGallery from 'components/ChooseImage/sagas/sagaStockPage';
import { sagasBlankPage } from 'containers/Admin/PageBuilder/BlankPage';
import { sagasThemeTemplates } from 'containers/Admin/ThemeBuilder/ThemeTemplates';
import { sagasBuilderPage } from 'containers/BuilderPage';
import { sagasTemplatePage } from 'containers/Admin/PageBuilder/TemplatesPage';
import { sagasPresetStyle } from 'containers/Admin/PresetStylesPage';
import { sagasMegaMenu } from 'containers/BuilderPage/components/DraggableMenu';
import { sagasProductPage } from 'containers/Admin/PageBuilder/ProductsPage';
import { sagasCollectionPage } from 'containers/Admin/PageBuilder/CollectionPage';
import { sagasArticlePage } from 'containers/Admin/PageBuilder/ArticlesPage';
import { sagasDashboardPageSettings } from 'containers/Admin/PageBuilder/DashboardPageSettings';
import { sagaThemeBuilder } from 'containers/Admin/ThemeBuilder';
import { sagasHomePage } from 'containers/Admin/PageBuilder/HomePage';
import { sagasCartPage } from 'containers/Admin/PageBuilder/CartPage';
import { sagasSearchPage } from 'containers/Admin/PageBuilder/SearchPage';
import { sagasPasswordPage } from 'containers/Admin/PageBuilder/PasswordPage';
import { sagasNotFoundPage } from 'containers/Admin/PageBuilder/NotFoundPage';
import { sagasCustomerLogin } from 'containers/Admin/PageBuilder/CustomerLogin';
import { sagasCustomerResetPassword } from 'containers/Admin/PageBuilder/CustomerResetPassword';
import { sagasCustomerActivateAccount } from 'containers/Admin/PageBuilder/CustomerActivateAccount';
import { sagasCustomerRegister } from 'containers/Admin/PageBuilder/CustomerRegister';
import { sagasCustomerAccount } from 'containers/Admin/PageBuilder/CustomerAccount';
import { sagasCustomerOrder } from 'containers/Admin/PageBuilder/CustomerOrder';
import { sagasCustomerAddresses } from 'containers/Admin/PageBuilder/CustomerAddresses';
import { sagasGiftCard } from 'containers/Admin/PageBuilder/GiftCard';
import { sagasCollectionListing } from 'containers/Admin/PageBuilder/CollectionListing';
import { sagasPageManagement } from 'containers/Admin/Management/Pages';
import { sagasThemeManagement } from 'containers/Admin/Management/Themes';
import { sagasPlanManagement } from 'containers/Admin/PlanManagement';
import { sagasLiquidVariables } from './sagas/liquid/sagasLiquidVariables';
import sagasGlobal from './sagas';
import { sagaShopify } from './sagas/shopify/sagaShopify';
import { sagasVersion } from './sagas/versions';
import { sagasAuth } from './global/auth';
import { sagasAuthors } from './global/authors';
import { sagasLiquidSnippets } from './global/globalSnippets/sagas';
import { sagaPageCounter } from './global/pageCounter';

const sagas = [
  ...sagasGlobal,
  ...sagasBuilderPage,
  ...sagasBlankPage,
  ...sagasChooseTemplate,
  ...sagaImageGallery,
  ...sagaShopify,
  ...sagasLiquidVariables,
  ...sagasThemeTemplates,
  ...sagasVersion,
  ...sagasTemplatePage,
  ...sagasPresetStyle,
  ...sagasMegaMenu,
  ...sagasProductPage,
  ...sagasCollectionPage,
  ...sagasArticlePage,
  ...sagasAuth,
  ...sagasDashboardPageSettings,
  ...sagaThemeBuilder,
  ...sagasHomePage,
  ...sagasCartPage,
  ...sagasSearchPage,
  ...sagasPasswordPage,
  ...sagasNotFoundPage,
  ...sagasCustomerLogin,
  ...sagasCustomerResetPassword,
  ...sagasCustomerActivateAccount,
  ...sagasCustomerRegister,
  ...sagasCustomerAccount,
  ...sagasCustomerOrder,
  ...sagasCustomerAddresses,
  ...sagasGiftCard,
  ...sagasCollectionListing,
  ...sagasPageManagement,
  ...sagasThemeManagement,
  ...sagasAuthors,
  ...sagasPlanManagement,
  ...sagasLiquidSnippets,
  ...sagaPageCounter,
];

// https://github.com/redux-saga/redux-saga/issues/760#issuecomment-273737022
const makeRestartable = (saga: any) => {
  return function*() {
    yield spawn(function*() {
      while (true) {
        try {
          yield call(saga);
          console.error('unexpected root saga termination. The root sagas are supposed to be sagas that live during the whole app lifetime!', saga);
        } catch (e) {
          console.error('Saga error, the saga will be restarted', e);
        }
        yield delay(1000); // Avoid infinite failures blocking app TODO use backoff retry policy...
      }
    });
  };
};

const rootSagas = sagas.map(makeRestartable);

export default function* root() {
  yield all(rootSagas.map(call));
}
