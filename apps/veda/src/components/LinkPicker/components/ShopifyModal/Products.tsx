import AsyncComponent from 'components/AsyncComponent';
import { useLinkPicker } from 'components/LinkPicker/store/context/LinkPickerContext';
import { getShopifyHandle } from 'components/LinkPicker/utils/getShopifyHandle';
import { useShopifyModal } from 'components/LinkPicker/utils/globaState';
import PageCard from 'components/PageCard';
import VirtualList from 'components/VirtualList/VirtualList';
import { isEmpty } from 'ramda';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useChangeProductKey, useGetProducts, useLoadMoreProducts } from 'store/actions/shopify';
import { defaultProductDataState } from 'store/reducers/shopify/reducerProducts';
import { shopifySelector } from 'store/selectors';
import { i18n } from 'translation';
import { ActivityIndicator, View, ViewportTracking } from 'wiloke-react-core';
import { DebounceTextInput } from '../Form/Fields/Fields';

const ROW_HEIGHT = 55;
const NUMBER_OF_COLUMNS = 1;

export const Products = () => {
  const { products, searchKey } = useSelector(shopifySelector.products);
  const { data, requestStatus, hasNextPage, loadMoreStatus } = products[searchKey] || defaultProductDataState;
  const { dispatch, value } = useLinkPicker();
  const getCollections = useGetProducts();
  const changeKey = useChangeProductKey();
  const [, setVisible] = useShopifyModal();
  const loadMoreProducts = useLoadMoreProducts();

  useEffect(() => {
    getCollections.request({ search: searchKey });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchKey]);

  const _handleSearch = (val: string) => {
    changeKey(val);
  };

  const renderProducts = () => {
    const rowCount = Math.ceil(data.length / NUMBER_OF_COLUMNS) + 6;

    return (
      <VirtualList
        containerCss={{ paddingLeft: '10px', paddingRight: '10px', height: '72%' }}
        rowHeight={ROW_HEIGHT}
        rowCount={rowCount}
        rowRender={index => {
          const dataSlice = data.slice(index * NUMBER_OF_COLUMNS, index * NUMBER_OF_COLUMNS + NUMBER_OF_COLUMNS);
          const rowItem = dataSlice.length ? dataSlice : hasNextPage ? Array(NUMBER_OF_COLUMNS).fill(undefined) : [];

          return rowItem.map(item => {
            if (typeof item === 'undefined' && loadMoreStatus !== 'failure') {
              return (
                <ViewportTracking
                  key={index}
                  offsetTop={-50}
                  onEnterViewport={() => {
                    if (loadMoreStatus !== 'loading' && hasNextPage && index % NUMBER_OF_COLUMNS === 0) {
                      loadMoreProducts.request({ search: searchKey });
                    }
                  }}
                >
                  <View css={{ padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                    <ActivityIndicator />
                  </View>
                </ViewportTracking>
              );
            }
            if (item) {
              return (
                <PageCard.Style2
                  isActive={item.handle === getShopifyHandle(value)}
                  title={item.title}
                  image={item.featuredImage?.src}
                  css={{ marginBottom: '5px' }}
                  key={item.id}
                  onClick={() => {
                    setVisible(false);
                    dispatch({
                      type: '@LinkPicker/setSettings',
                      payload: {
                        value: `/products/${item.handle}`,
                      },
                    });
                  }}
                />
              );
            }
            return null;
          });
        }}
      />
    );
  };

  return (
    <View css={{ padding: '15px 0 20px', height: '100%' }}>
      <View css={{ padding: '0 10px' }}>
        <DebounceTextInput
          block
          sizeInput="medium"
          placeholder={i18n.t('builderPage.search', { text: i18n.t('general.products') })}
          css={{ marginBottom: '8px' }}
          value={searchKey}
          onValueChange={_handleSearch}
        />
      </View>

      <AsyncComponent status={requestStatus} isEmpty={isEmpty(data)} Success={renderProducts()} />
    </View>
  );
};
