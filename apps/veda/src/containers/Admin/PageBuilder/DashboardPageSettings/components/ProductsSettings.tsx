import { notification } from 'antd';
import Active from 'components/Active';
import AsyncComponent from 'components/AsyncComponent';
import Field from 'components/Field';
import MyModal from 'components/MyModal';
import ProductCard from 'components/ProductCard';
import Radio from 'components/Radio';
import TextInput from 'components/TextInput';
import VirtualList from 'components/VirtualList/VirtualList';
import { dashboardPageSettingsSelector, useChangeSettingsDashboardPage } from 'containers/Admin/PageBuilder/DashboardPageSettings';
import withDebounce from 'hocs/withDebounce';
import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useChangeProductKey, useGetProducts, useLoadMoreProducts } from 'store/actions/shopify';
import { defaultProductDataState } from 'store/reducers/shopify/reducerProducts';
import { shopifySelector } from 'store/selectors';
import { i18n } from 'translation';
import { ProductPageLiquidVariable } from 'types/Page';
import { ProductApiData } from 'types/Products';
import { debounce } from 'utils/functions/debounce';
import { getUserInfo } from 'utils/functions/getUserInfo';
import { GridSmart, Text, View, ViewportTracking } from 'wiloke-react-core';
import { RenewButton } from './RenewButton';

const ROW_HEIGHT = 172;
const NUMBER_OF_COLUMNS = 6;

const DebounceInput = withDebounce(TextInput, 'value', 'onValueChange');

interface ListMultiProductsProps {}
/*
 * Component này nằm ở các page item trang product
 */
export const ListMultiProducts: FC<ListMultiProductsProps> = () => {
  const { products, searchKey } = useSelector(shopifySelector.products);
  const { page, originPage, visibleListProduct } = useSelector(dashboardPageSettingsSelector);
  const { data, requestStatus, hasNextPage, loadMoreStatus } = products[searchKey] || defaultProductDataState;
  const [applyType, setApplyType] = useState<'all' | 'custom'>(Array.isArray(page?.shopifyPages) ? 'custom' : 'all');

  const changeKey = useChangeProductKey();
  const changeSettings = useChangeSettingsDashboardPage();
  const getProducts = useGetProducts();
  const loadMoreProducts = useLoadMoreProducts();

  const history = useHistory();
  const { shopName } = getUserInfo();

  useEffect(() => {
    if (visibleListProduct) {
      getProducts.request({ search: searchKey });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchKey, visibleListProduct]);

  useEffect(() => {
    if (visibleListProduct) {
      setApplyType(Array.isArray(page?.shopifyPages) ? 'custom' : 'all');
    }
  }, [page?.shopifyPages, visibleListProduct]);

  const _handleSearch = (val: string) => {
    changeKey(val);
  };

  const handleChooseProducts = (item: ProductApiData) => (isSelect: boolean) => {
    if (page) {
      // isSelect = true thì thêm vào mảng
      if (isSelect) {
        changeSettings({
          page: {
            ...page,
            shopifyPages: [
              ...(Array.isArray(page?.shopifyPages) ? page.shopifyPages : []),
              { itemId: Number(item.id), handle: item.handle, featuredImg: item.featuredImage?.src },
            ],
          },
        });
      } else {
        changeSettings({
          page: {
            ...page,
            shopifyPages: (Array.isArray(page?.shopifyPages) ? page.shopifyPages : []).filter(liquid => liquid?.handle !== item.handle),
          },
        });
      }
    }
  };

  const handleLoadMore = debounce(() => {
    if (loadMoreStatus !== 'loading' && hasNextPage) {
      loadMoreProducts.request({
        search: searchKey,
      });
    }
  }, 50);

  const renderSuccess = () => {
    const rowCount = Math.ceil(data.length / NUMBER_OF_COLUMNS) + (hasNextPage ? NUMBER_OF_COLUMNS : 1);

    return (
      <VirtualList
        rowHeight={ROW_HEIGHT}
        rowCount={rowCount}
        containerCss={{ height: 'calc(100% - 42px)' }}
        rowRender={index => {
          const dataSlice = data.slice(index * NUMBER_OF_COLUMNS, index * NUMBER_OF_COLUMNS + NUMBER_OF_COLUMNS);
          const rowItem = dataSlice.length ? dataSlice : hasNextPage ? Array(NUMBER_OF_COLUMNS).fill(undefined) : [];

          return (
            <GridSmart columnWidth={200} columnGap={10} columnCount={NUMBER_OF_COLUMNS}>
              {rowItem.map((item, index) => {
                if (typeof item === 'undefined' && loadMoreStatus !== 'failure') {
                  return (
                    <ViewportTracking key={index} offsetBottom={-50} onEnterViewport={handleLoadMore}>
                      <ProductCard.Loading cssContainer={{ height: '165px', overflow: 'hidden' }} />
                    </ViewportTracking>
                  );
                }
                if (item) {
                  const isActive =
                    page !== undefined && page.shopifyPages !== undefined && page.shopifyPages !== 'all'
                      ? page.shopifyPages.map(item => (item as ProductPageLiquidVariable)?.handle ?? '').includes(item.handle)
                      : false;
                  return (
                    <Active disabledMulti onActive={handleChooseProducts(item)} variant="style2" active={isActive} key={item.id}>
                      <ProductCard imageAspectRatio={16 / 9} imageSrc={item.featuredImage?.src || ''} title={item.title} />
                    </Active>
                  );
                }
                return null;
              })}
            </GridSmart>
          );
        }}
      />
    );
  };

  const handleOverride = () => {
    if (page) {
      // nếu applyType = custom thì người dùng phải chọn ít nhất 1 product để có thể update lên server
      if (applyType === 'custom' && !Array.isArray(page.shopifyPages)) {
        notification.warning({
          message: i18n.t('validate.choose_at_least', { text: i18n.t('adminDashboard.product') }),
        });
      } else {
        const entityVariant = 'Client';
        history.push(`/builder?shop=${shopName}&id=${page.commandId}&entityVariant=${entityVariant}`, {
          label: page.label,
          type: 'product',
          isCreate: false,
          shopifyRepresentPage: page.shopifyRepresentPage,
          shopifyPages: applyType === 'all' ? 'all' : page.shopifyPages,
          backToPage: '/page/products',
          entityVariant,
        });
        changeSettings({
          visibleListProduct: false,
          originPage: undefined,
        });
      }
    }
  };

  const handleCancel = () => {
    changeSettings({
      visibleListProduct: false,
      originPage: undefined,
      page: undefined,
    });
  };

  const _handleChangeType = (val: string) => {
    const _val = val as 'all' | 'custom';
    if (page && _val === 'all') {
      changeSettings({
        page: {
          ...page,
          shopifyPages: 'all',
        },
      });
    }
    if (page && _val === 'custom') {
      changeSettings({
        page: {
          ...page,
          shopifyPages: !originPage?.shopifyPages || typeof originPage.shopifyPages === 'string' ? [] : originPage?.shopifyPages,
        },
      });
    }
  };

  return (
    <MyModal
      bodyCss={{
        height: applyType === 'all' ? '280px' : '80%',
      }}
      headerText={i18n.t('general.products')}
      size="large"
      isVisible={visibleListProduct}
      onOk={handleOverride}
      onCancel={handleCancel}
      scrollDisabled
    >
      <Text size={16} css={{ margin: '15px 0' }}>
        Select product to which this page will be applied to. Find the product you want on the left column and select to add it to application list.
      </Text>

      <Field label="Apply to">
        <View css={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Radio.Group size="large" defaultValue={applyType} value={applyType} onChangeValue={_handleChangeType}>
            <Radio.Button value="all">{i18n.t('adminDashboard.all')}</Radio.Button>
            <Radio.Button value="custom"> {i18n.t('adminDashboard.specific_text', { text: i18n.t('general.products') })}</Radio.Button>
          </Radio.Group>
          <RenewButton variant="product" />
        </View>
      </Field>

      {applyType === 'custom' && (
        <>
          <DebounceInput
            block
            sizeInput="medium"
            placeholder="Search product..."
            css={{ marginBottom: '8px' }}
            value={searchKey}
            onValueChange={_handleSearch}
          />

          <AsyncComponent status={requestStatus} Success={renderSuccess()} />
        </>
      )}

      {/* <ModalAskBeforeSave isLoading={statusSocketConnection == 'loading' || updateStatus === 'loading'} onOverride={handleOverride} /> */}
    </MyModal>
  );
};
