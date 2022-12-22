import Active from 'components/Active';
import AsyncComponent from 'components/AsyncComponent';
import MyModal from 'components/MyModal';
import ProductCard from 'components/ProductCard';
import TextInput from 'components/TextInput';
import VirtualList from 'components/VirtualList/VirtualList';
import withDebounce from 'hocs/withDebounce';
import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useChangeProductKey, useGetProducts, useLoadMoreProducts } from 'store/actions/shopify';
import { defaultProductDataState } from 'store/reducers/shopify/reducerProducts';
import { shopifySelector } from 'store/selectors';
import { i18n } from 'translation';
import { debounce } from 'utils/functions/debounce';
import { GridSmart, ViewportTracking } from 'wiloke-react-core';
import { useSettingsShopifyPicker } from './slice';

const DebounceInput = withDebounce(TextInput, 'value', 'onValueChange', 300);

const ROW_HEIGHT = 172;
const NUMBER_OF_COLUMNS = 6;

interface MultiProductPickerProps {
  onOk?: () => void;
  onCancel?: () => void;
}

export const MultiProductPicker: FC<MultiProductPickerProps> = ({ onOk, onCancel }) => {
  const { products, searchKey } = useSelector(shopifySelector.products);
  const { data, requestStatus, hasNextPage, loadMoreStatus } = products[searchKey] || defaultProductDataState;

  const { visibleProduct, slugsProduct } = useSelector(shopifySelector.multiShopifyPicker);

  const changeKey = useChangeProductKey();
  const changeSettingsShopify = useSettingsShopifyPicker();
  const getProducts = useGetProducts();
  const loadMoreProducts = useLoadMoreProducts();

  useEffect(() => {
    if (visibleProduct) {
      getProducts.request({ search: searchKey });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visibleProduct, searchKey]);

  const _handleSelectPage = (handle: string, id: number, featuredImage?: string) => (isSelect: boolean) => {
    if (isSelect) {
      changeSettingsShopify({
        slugsProduct: [...slugsProduct, { itemId: id, handle, featuredImg: featuredImage }],
      });
    } else {
      changeSettingsShopify({
        slugsProduct: slugsProduct.filter(item => item.handle !== handle),
      });
    }
  };

  const _handleSearch = (val: string) => {
    changeKey(val);
  };

  const handleClose = () => {
    if (!!onCancel) {
      onCancel?.();
    } else {
      changeSettingsShopify({
        visibleProduct: false,
        // slugsProduct: [],
      });
    }
  };

  const handleOk = () => {
    if (!!onOk) {
      onOk?.();
    } else {
      changeSettingsShopify({
        visibleProduct: false,
      });
    }
  };

  const handleLoadMore = debounce(() => {
    if (loadMoreStatus !== 'loading' && hasNextPage) {
      loadMoreProducts.request({
        search: searchKey,
      });
    }
  }, 50);

  const _renderProducts = () => {
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
              {rowItem.map(item => {
                if (typeof item === 'undefined' && loadMoreStatus !== 'failure') {
                  return (
                    <ViewportTracking key={index} offsetBottom={-50} onEnterViewport={handleLoadMore}>
                      <ProductCard.Loading cssContainer={{ height: '165px', overflow: 'hidden' }} />
                    </ViewportTracking>
                  );
                }
                if (item) {
                  const _stateHandles = slugsProduct.map(state => state.handle);
                  return (
                    <Active
                      disabledMulti
                      onActive={_handleSelectPage(item.handle, Number(item.id), item.featuredImage?.src)}
                      variant="style2"
                      active={_stateHandles.includes(item.handle)}
                      key={item.id}
                    >
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

  return (
    <MyModal
      bodyCss={{
        height: '80%',
      }}
      headerText={i18n.t('general.products')}
      isVisible={visibleProduct}
      depsHeightRecalculation={requestStatus}
      onCancel={handleClose}
      onOk={handleOk}
      cancelText="Remove"
      okText="Accept"
      size="large"
      scrollDisabled
    >
      <DebounceInput
        block
        sizeInput="medium"
        placeholder="Search product..."
        css={{ marginBottom: '8px' }}
        value={searchKey}
        onValueChange={_handleSearch}
      />

      <AsyncComponent status={requestStatus} isEmpty={data.length === 0} Success={_renderProducts()} />
    </MyModal>
  );
};
