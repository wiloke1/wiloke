import { CodeSpliting } from 'components/CodeSpliting';
import SectionPageHeader from 'components/SectionPageHeader';
import { ModalCreateNormalPage, ModalDeletePageDashboard, useChangeModalAdminSettings } from 'containers/Admin/Modals';
import { Dashboard } from 'containers/Dashboard';
import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { cartPageSelector } from 'store/selectors';
import { i18n } from 'translation';
import { BUILDER_CART_PAGE_MAIN_CONTENT } from 'utils/constants/chunkIds';
import { View } from 'wiloke-react-core';
import { useGetCartPageItems } from '.';
import { useGetTemplatesPopup } from '../BlankPage';
import { DashboardPageSettings } from '../DashboardPageSettings/DashboardPageSettings';

export const CartPage: FC = () => {
  const changeSettings = useChangeModalAdminSettings();
  const getTemplates = useGetTemplatesPopup();
  const { filterType, search } = useSelector(cartPageSelector);
  const getItems = useGetCartPageItems();

  useEffect(() => {
    getItems.request({ s: search, pageType: 'cart', filterType });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, filterType]);

  return (
    <Dashboard
      Modals={() => (
        <>
          <ModalCreateNormalPage pageType="cart" />
          <ModalDeletePageDashboard pageType="cart" />
          <DashboardPageSettings pageType="cart" />
        </>
      )}
      Content={() => (
        <View>
          <SectionPageHeader
            title={i18n.t('general.prefix_page', { prefix: i18n.t('adminDashboard.cart', { textTransform: 'capitalize' }) })}
            description=""
            onClick={() => {
              changeSettings({ createNormalPage: true });
              getTemplates.request({ type: 'cart' });
            }}
          />
          <CodeSpliting
            component={() => import(/* webpackChunkName: "BuilderCartPageMainContent", webpackPrefetch: true */ './MainContent')}
            CHUNK_ID={BUILDER_CART_PAGE_MAIN_CONTENT}
          />
        </View>
      )}
    />
  );
};
