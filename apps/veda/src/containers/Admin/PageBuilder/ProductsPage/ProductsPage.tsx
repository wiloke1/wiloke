import { CodeSpliting } from 'components/CodeSpliting';
import SectionPageHeader from 'components/SectionPageHeader';
import { ModalCreateProduct, ModalDeletePageDashboard, useChangeModalAdminSettings } from 'containers/Admin/Modals';
import { Dashboard } from 'containers/Dashboard';
import { MultiProductPicker } from 'containers/Shopify/ModalMultiPicker';
import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { productPageSelector } from 'store/selectors';
import { i18n } from 'translation';
import { PRODUCT_PAGE_MAIN_CONTENT } from 'utils/constants/chunkIds';
import { View } from 'wiloke-react-core';
import { useGetProductPageItems } from '.';
import { useGetTemplatesPopup } from '../BlankPage';
import { ListMultiProducts } from '../DashboardPageSettings/components/ProductsSettings';
import { DashboardPageSettings } from '../DashboardPageSettings/DashboardPageSettings';

export const ProductsPage: FC = () => {
  const changeSettings = useChangeModalAdminSettings();
  const getTemplates = useGetTemplatesPopup();
  const { filterType, search } = useSelector(productPageSelector);
  const getItems = useGetProductPageItems();

  useEffect(() => {
    getItems.request({ s: search, pageType: 'product', filterType });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, filterType]);

  return (
    <Dashboard
      Modals={() => (
        <>
          <ModalCreateProduct />
          <ModalDeletePageDashboard pageType="product" />
          <DashboardPageSettings />
          <ListMultiProducts />
          <MultiProductPicker />
        </>
      )}
      Content={() => (
        <View>
          <SectionPageHeader
            title={i18n.t('general.prefix_page', { prefix: i18n.t('general.products', { textTransform: 'capitalize' }) })}
            description={i18n.t('adminDashboard.page_description.product')}
            onClick={() => {
              // mở modal tạo product page
              changeSettings({ createProduct: true });
              getTemplates.request({ type: 'product' });
            }}
          />

          <CodeSpliting
            component={() => import(/* webpackChunkName: "ProductPageMainContent", webpackPrefetch: true */ './MainContent')}
            CHUNK_ID={PRODUCT_PAGE_MAIN_CONTENT}
          />
        </View>
      )}
    />
  );
};
