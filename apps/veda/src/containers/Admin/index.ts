import { combineReducers } from 'redux';
import { reducerBlankPage } from './PageBuilder/BlankPage';
import { reducerThemeTemplates } from './ThemeBuilder/ThemeTemplates';
import { sliceTemplatePage } from './PageBuilder/TemplatesPage';
import { sliceProductPage } from './PageBuilder/ProductsPage';
import { sliceCollectionPage } from './PageBuilder/CollectionPage';
import { sliceArticlePage } from './PageBuilder/ArticlesPage';
import { dashboardPageSettingsSlice } from './PageBuilder/DashboardPageSettings/slice';
import { sliceThemeDashboardSettings } from './ThemeBuilder/ThemeSettings/sliceThemeSettingsDashboard';
import { sliceHomePage } from './PageBuilder/HomePage';
import { sliceCartPage } from './PageBuilder/CartPage';
import { sliceSearchPage } from './PageBuilder/SearchPage';
import { slicePasswordPage } from './PageBuilder/PasswordPage';
import { sliceNotFoundPage } from './PageBuilder/NotFoundPage';
import { sliceCustomerLogin } from './PageBuilder/CustomerLogin';
import { sliceCustomerResetPassword } from './PageBuilder/CustomerResetPassword';
import { sliceCustomerActivateAccount } from './PageBuilder/CustomerActivateAccount';
import { sliceCustomerRegister } from './PageBuilder/CustomerRegister';
import { sliceCustomerAccount } from './PageBuilder/CustomerAccount';
import { sliceCustomerOrder } from './PageBuilder/CustomerOrder';
import { sliceCustomerAddresses } from './PageBuilder/CustomerAddresses';
import { sliceGiftCard } from './PageBuilder/GiftCard';
import { sliceCollectionListing } from './PageBuilder/CollectionListing';
import { sliceThemeDashboard } from './ThemeBuilder/ThemeDashboard/slice/sliceThemeDashboard';
import { slicePagesAtom } from './Management/Pages/store/reducers/slicePagesAtom';
import { slicePagesDraft } from './Management/Pages/store/reducers/slicePagesDraft';
import { slicePagesProduct } from './Management/Pages/store/reducers/slicePagesProduct';
import { sliceThemesAtom } from './Management/Themes/store/reducers/sliceThemesAtom';
import { slicePagesTemplate } from './Management/Themes/store/reducers/slicePagesTemplate';
import { sliceThemesDraft } from './Management/Themes/store/reducers/sliceThemesDraft';
import { sliceThemesProduct } from './Management/Themes/store/reducers/sliceThemesProduct';

const adminDashboardReducers = combineReducers({
  pageBuilder: combineReducers({
    blankPage: reducerBlankPage,
    templates: sliceTemplatePage.reducer,
    productPage: sliceProductPage.reducer,
    collectionPage: sliceCollectionPage.reducer,
    articlePage: sliceArticlePage.reducer,
    dashboardPageSettings: dashboardPageSettingsSlice.reducer,
    homePage: sliceHomePage.reducer,
    cartPage: sliceCartPage.reducer,
    searchPage: sliceSearchPage.reducer,
    passwordPage: slicePasswordPage.reducer,
    notFoundPage: sliceNotFoundPage.reducer,
    customerLogin: sliceCustomerLogin.reducer,
    customerResetPassword: sliceCustomerResetPassword.reducer,
    customerActivateAccount: sliceCustomerActivateAccount.reducer,
    customerRegister: sliceCustomerRegister.reducer,
    customerAccount: sliceCustomerAccount.reducer,
    customerOrder: sliceCustomerOrder.reducer,
    customerAddresses: sliceCustomerAddresses.reducer,
    giftCard: sliceGiftCard.reducer,
    collectionListing: sliceCollectionListing.reducer,
  }),
  themeBuilder: combineReducers({
    templates: reducerThemeTemplates,
    themeSettings: sliceThemeDashboardSettings.reducer,
    themeDashboard: sliceThemeDashboard.reducer,
  }),
  pagesDraft: slicePagesDraft.reducer,
  pagesAtom: slicePagesAtom.reducer,
  pagesProduct: slicePagesProduct.reducer,
  pagesTemplate: slicePagesTemplate.reducer,
  themesAtom: sliceThemesAtom.reducer,
  themesDraft: sliceThemesDraft.reducer,
  themesProduct: sliceThemesProduct.reducer,
});

export { adminDashboardReducers };
