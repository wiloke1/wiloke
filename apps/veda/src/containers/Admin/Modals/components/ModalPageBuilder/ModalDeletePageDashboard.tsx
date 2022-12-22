import { notification } from 'antd';
import MyModal from 'components/MyModal';
import { useDeleteArticlePages } from 'containers/Admin/PageBuilder/ArticlesPage';
import { useDeleteBlankPages } from 'containers/Admin/PageBuilder/BlankPage';
import { useDeleteCartPages } from 'containers/Admin/PageBuilder/CartPage';
import { useDeleteCollectionListings } from 'containers/Admin/PageBuilder/CollectionListing';
import { useDeleteCollectionPages } from 'containers/Admin/PageBuilder/CollectionPage';
import { useDeleteCustomerAccounts } from 'containers/Admin/PageBuilder/CustomerAccount';
import { useDeleteCustomerActivateAccounts } from 'containers/Admin/PageBuilder/CustomerActivateAccount';
import { useDeleteCustomerAddresses } from 'containers/Admin/PageBuilder/CustomerAddresses';
import { useDeleteCustomerLogins } from 'containers/Admin/PageBuilder/CustomerLogin';
import { useDeleteCustomerOrders } from 'containers/Admin/PageBuilder/CustomerOrder';
import { useDeleteCustomerRegisters } from 'containers/Admin/PageBuilder/CustomerRegister';
import { useDeleteCustomerResetPasswords } from 'containers/Admin/PageBuilder/CustomerResetPassword';
import { useDeleteGiftCards } from 'containers/Admin/PageBuilder/GiftCard';
import { useDeleteHomePages } from 'containers/Admin/PageBuilder/HomePage';
import { useDeleteNotFoundPages } from 'containers/Admin/PageBuilder/NotFoundPage';
import { useDeletePasswordPages } from 'containers/Admin/PageBuilder/PasswordPage';
import { useDeleteProductPages } from 'containers/Admin/PageBuilder/ProductsPage';
import { useDeleteSearchPages } from 'containers/Admin/PageBuilder/SearchPage';
import { blankPageSelector, modalsSelector } from 'containers/Admin/selector';
import { useSocketForSyncShopify } from 'hooks/useSocket/useSocketForSyncShopify';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import {
  articlePageSelector,
  cartPageSelector,
  collectionListingSelector,
  collectionPageSelector,
  customerAccountSelector,
  customerActivateAccountSelector,
  customerAddressesSelector,
  customerLoginSelector,
  customerOrderSelector,
  customerRegisterSelector,
  customerResetPasswordSelector,
  giftCardSelector,
  homePageSelector,
  notFoundPageSelector,
  passwordPageSelector,
  productPageSelector,
  searchPageSelector,
} from 'store/selectors';
import { i18n } from 'translation';
import { PageType } from 'types/Page';
import { useChangeModalAdminSettings } from '../../store';

interface ModalDeletePageDashboardProps {
  pageType: PageType;
}

export const ModalDeletePageDashboard: FC<ModalDeletePageDashboardProps> = ({ pageType }) => {
  const {
    deleteBlank,
    deleteHome,
    deleteProduct,
    deleteCollection,
    deleteArticle,
    deleteCart,
    deleteSearch,
    deletePassword,
    deleteNotFound,
    deleteCustomersLogin,
    deleteCustomersResetPassword,
    deleteCustomersActivateAccount,
    deleteCustomersRegister,
    deleteCustomersAccount,
    deleteCustomersOrder,
    deleteCustomersAddresses,
    deleteGiftCard,
    deleteCollectionListing,
  } = useSelector(modalsSelector);
  const articlePageState = useSelector(articlePageSelector);
  const blankPageState = useSelector(blankPageSelector);
  const cartPageState = useSelector(cartPageSelector);
  const collectionPageState = useSelector(collectionPageSelector);
  const collectionListingState = useSelector(collectionListingSelector);
  const customerAccountState = useSelector(customerAccountSelector);
  const customerActivateAccountState = useSelector(customerActivateAccountSelector);
  const customerAddressesState = useSelector(customerAddressesSelector);
  const customerLoginState = useSelector(customerLoginSelector);
  const customerOrderState = useSelector(customerOrderSelector);
  const customerRegisterState = useSelector(customerRegisterSelector);
  const customerResetPasswordState = useSelector(customerResetPasswordSelector);
  const giftCardState = useSelector(giftCardSelector);
  const homePageState = useSelector(homePageSelector);
  const notFoundPageState = useSelector(notFoundPageSelector);
  const passwordPageState = useSelector(passwordPageSelector);
  const productPageState = useSelector(productPageSelector);
  const searchPageState = useSelector(searchPageSelector);

  const changeModalAdminSettings = useChangeModalAdminSettings();
  const deleteArticleRequest = useDeleteArticlePages();
  const deleteBlankRequest = useDeleteBlankPages();
  const deleteCartRequest = useDeleteCartPages();
  const deleteCollectionRequest = useDeleteCollectionPages();
  const deleteCollectionListingRequest = useDeleteCollectionListings();
  const deleteAccountRequest = useDeleteCustomerAccounts();
  const deleteActivateAccountRequest = useDeleteCustomerActivateAccounts();
  const deleteAddressesRequest = useDeleteCustomerAddresses();
  const deleteLoginRequest = useDeleteCustomerLogins();
  const deleteOrderRequest = useDeleteCustomerOrders();
  const deleteRegisterRequest = useDeleteCustomerRegisters();
  const deleteResetPasswordRequest = useDeleteCustomerResetPasswords();
  const deleteGiftCardRequest = useDeleteGiftCards();
  const deleteHomePageRequest = useDeleteHomePages();
  const deleteNotFoundRequest = useDeleteNotFoundPages();
  const deletePasswordRequest = useDeletePasswordPages();
  const deleteProductRequest = useDeleteProductPages();
  const deleteSearchRequest = useDeleteSearchPages();

  const { connect, disconnect, statusSocketConnection } = useSocketForSyncShopify();

  const visibleMapping: Record<PageType, boolean> = {
    account: deleteCustomersAccount,
    activateAccount: deleteCustomersActivateAccount,
    addresses: deleteCustomersAddresses,
    article: deleteArticle,
    cart: deleteCart,
    collection: deleteCollection,
    collections: deleteCollectionListing,
    giftCard: deleteGiftCard,
    home: deleteHome,
    login: deleteCustomersLogin,
    order: deleteCustomersOrder,
    page: deleteBlank,
    pageNotFound: deleteNotFound,
    password: deletePassword,
    product: deleteProduct,
    register: deleteCustomersRegister,
    resetPassword: deleteCustomersResetPassword,
    search: deleteSearch,
  };

  const handleCancel = () => {
    const cancelMapping: Record<PageType, () => void> = {
      account: () => changeModalAdminSettings({ deleteCustomersAccount: false }),
      activateAccount: () => changeModalAdminSettings({ deleteCustomersActivateAccount: false }),
      addresses: () => changeModalAdminSettings({ deleteCustomersAddresses: false }),
      article: () => changeModalAdminSettings({ deleteArticle: false }),
      cart: () => changeModalAdminSettings({ deleteCart: false }),
      collection: () => changeModalAdminSettings({ deleteCollection: false }),
      collections: () => changeModalAdminSettings({ deleteCollectionListing: false }),
      giftCard: () => changeModalAdminSettings({ deleteGiftCard: false }),
      home: () => changeModalAdminSettings({ deleteHome: false }),
      login: () => changeModalAdminSettings({ deleteCustomersLogin: false }),
      order: () => changeModalAdminSettings({ deleteCustomersOrder: false }),
      page: () => changeModalAdminSettings({ deleteBlank: false }),
      pageNotFound: () => changeModalAdminSettings({ deleteNotFound: false }),
      password: () => changeModalAdminSettings({ deletePassword: false }),
      product: () => changeModalAdminSettings({ deleteProduct: false }),
      register: () => changeModalAdminSettings({ deleteCustomersRegister: false }),
      resetPassword: () => changeModalAdminSettings({ deleteCustomersResetPassword: false }),
      search: () => changeModalAdminSettings({ deleteSearch: false }),
    };

    cancelMapping[pageType]();
  };

  const handleOk = () => {
    const okMapping: Record<PageType, () => void> = {
      article: () => {
        console.log('article', articlePageState.ids);
        deleteArticleRequest.request({ ids: articlePageState.ids, onFulfill: () => disconnect({}) });
      },
      account: () => {
        console.log('account', customerAccountState.ids);
        deleteAccountRequest.request({ ids: customerAccountState.ids, onFulfill: () => disconnect({}) });
      },
      activateAccount: () => {
        console.log('activateAccount', customerActivateAccountState.ids);
        deleteActivateAccountRequest.request({ ids: customerActivateAccountState.ids, onFulfill: () => disconnect({}) });
      },
      addresses: () => {
        console.log('addresses', customerAddressesState.ids);
        deleteAddressesRequest.request({ ids: customerAddressesState.ids, onFulfill: () => disconnect({}) });
      },
      cart: () => {
        console.log('cart', cartPageState.ids);
        deleteCartRequest.request({ ids: cartPageState.ids, onFulfill: () => disconnect({}) });
      },
      collection: () => {
        console.log('collection', collectionPageState.ids);
        deleteCollectionRequest.request({ ids: collectionPageState.ids, onFulfill: () => disconnect({}) });
      },
      collections: () => {
        console.log('collections', collectionListingState.ids);
        deleteCollectionListingRequest.request({ ids: collectionListingState.ids, onFulfill: () => disconnect({}) });
      },
      giftCard: () => {
        console.log('giftCard', giftCardState.ids);
        deleteGiftCardRequest.request({ ids: giftCardState.ids, onFulfill: () => disconnect({}) });
      },
      home: () => {
        console.log('home', homePageState.ids);
        deleteHomePageRequest.request({ ids: homePageState.ids, onFulfill: () => disconnect({}) });
      },
      login: () => {
        console.log('login', customerLoginState.ids);
        deleteLoginRequest.request({ ids: customerLoginState.ids, onFulfill: () => disconnect({}) });
      },
      order: () => {
        console.log('order', customerOrderState.ids);
        deleteOrderRequest.request({ ids: customerOrderState.ids, onFulfill: () => disconnect({}) });
      },
      page: () => {
        console.log('blankPage', blankPageState.ids);
        deleteBlankRequest.request({ ids: blankPageState.ids, onFulfill: () => disconnect({}) });
      },
      pageNotFound: () => {
        console.log('pageNotFound', notFoundPageState.ids);
        deleteNotFoundRequest.request({ ids: notFoundPageState.ids, onFulfill: () => disconnect({}) });
      },
      password: () => {
        console.log('password', passwordPageState.ids);
        deletePasswordRequest.request({ ids: passwordPageState.ids, onFulfill: () => disconnect({}) });
      },
      product: () => {
        console.log('product', productPageState.ids);
        deleteProductRequest.request({ ids: productPageState.ids, onFulfill: () => disconnect({}) });
      },
      register: () => {
        console.log('register', customerRegisterState.ids);
        deleteRegisterRequest.request({ ids: customerRegisterState.ids, onFulfill: () => disconnect({}) });
      },
      resetPassword: () => {
        console.log('resetPassword', customerResetPasswordState.ids);
        deleteResetPasswordRequest.request({ ids: customerResetPasswordState.ids, onFulfill: () => disconnect({}) });
      },
      search: () => {
        console.log('search', searchPageState.ids);
        deleteSearchRequest.request({ ids: searchPageState.ids, onFulfill: () => disconnect({}) });
      },
    };
    connect({
      onSuccess: () => {
        okMapping[pageType]();
      },
      onError: () => {
        notification.error({
          message: i18n.t('publish_shopify.init_sync_error'),
        });
      },
    });
  };

  return (
    <MyModal
      isVisible={visibleMapping[pageType]}
      isLoading={
        statusSocketConnection === 'loading' ||
        articlePageState.deletePending.length > 0 ||
        blankPageState.deletePending.length > 0 ||
        cartPageState.deletePending.length > 0 ||
        collectionPageState.deletePending.length > 0 ||
        collectionListingState.deletePending.length > 0 ||
        customerAccountState.deletePending.length > 0 ||
        customerActivateAccountState.deletePending.length > 0 ||
        customerAddressesState.deletePending.length > 0 ||
        customerLoginState.deletePending.length > 0 ||
        customerOrderState.deletePending.length > 0 ||
        customerRegisterState.deletePending.length > 0 ||
        customerResetPasswordState.deletePending.length > 0 ||
        giftCardState.deletePending.length > 0 ||
        homePageState.deletePending.length > 0 ||
        notFoundPageState.deletePending.length > 0 ||
        passwordPageState.deletePending.length > 0 ||
        productPageState.deletePending.length > 0 ||
        searchPageState.deletePending.length > 0
      }
      onOk={handleOk}
      onCancel={handleCancel}
      headerText={i18n.t('general.warning')}
      okText={i18n.t('general.delete')}
    >
      {i18n.t('adminDashboard.confirm_delete')}
    </MyModal>
  );
};
