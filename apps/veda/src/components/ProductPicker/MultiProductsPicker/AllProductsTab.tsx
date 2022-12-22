import AsyncComponent from 'components/AsyncComponent';
import Button from 'components/Button';
import PageCard from 'components/PageCard';
import TextInput from 'components/TextInput';
import VirtualList from 'components/VirtualList/VirtualList';
import withDebounce from 'hocs/withDebounce';
import { isEmpty, range } from 'ramda';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useGetProductsObject } from 'store/actions/liquid/actionLiquidVariables';
import { useChangeProductKey, useGetProducts, useLoadMoreProducts, useRenewProducts } from 'store/actions/shopify';
import { defaultProductDataState } from 'store/reducers/shopify/reducerProducts';
import { liquidVariablesSelector, shopifySelector } from 'store/selectors';
import { i18n } from 'translation';
import { ProductApiData } from 'types/Products';
import { debounce } from 'utils/functions/debounce';
import { getUserInfo } from 'utils/functions/getUserInfo';
import { ActivityIndicator, FontAwesome, View, ViewportTracking } from 'wiloke-react-core';
import * as styles from '../styles';
import { useMultiProductsPicker } from './store/context';

const DebounceInput = withDebounce(TextInput, 'value', 'onValueChange');

const ROW_HEIGHT = 57;
const NUMBER_OF_COLUMNS = 1;

export const AllProductsTab = () => {
  const { productIdsLoading, productIdsFailed } = useSelector(liquidVariablesSelector);
  const { searchKey, products } = useSelector(shopifySelector.products);
  const { data, requestStatus, loadMoreStatus, hasNextPage } = products[searchKey] || defaultProductDataState;
  const { dispatch, products: products_ } = useMultiProductsPicker();

  const changeSearchKey = useChangeProductKey();
  const getProducts = useGetProducts();
  const getProductsObject = useGetProductsObject();
  const loadMoreProducts = useLoadMoreProducts();
  const renewProducts = useRenewProducts();
  const { shopName } = getUserInfo();

  useEffect(() => {
    if (requestStatus !== 'success') {
      getProducts.request({ search: searchKey });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchKey]);

  const handleChangeKey = (value: string) => {
    changeSearchKey(value);
  };

  const handleLoadmore = debounce(() => {
    if (loadMoreStatus !== 'loading' && hasNextPage) {
      loadMoreProducts.request({ search: searchKey });
    }
  }, 50);

  const handleRefresh = () => {
    renewProducts.request({ search: searchKey });
  };

  const handleChooseProduct = (item: ProductApiData) => () => {
    const isExist = !!products_.find(product => product.id?.toString() === item.id.toString());
    if (isExist) {
      dispatch({
        type: '@DeleteProduct',
        payload: { productId: Number(item.id) },
      });
    } else {
      getProductsObject.request({
        products: [
          {
            featuredImg: item.featuredImage?.src,
            handle: item.handle,
            itemId: Number(item.id),
          },
        ],
        onSuccess: response => {
          const [product] = Object.values(response.products);
          if (product) {
            dispatch({
              type: '@AddProduct',
              payload: {
                product: {
                  id: product.id,
                  handle: product.handle,
                  featured_image: product.featured_image,
                  images: product.images,
                  title: product.title,
                  url: product.url,
                  price: product.price,
                  price_max: product.price_max,
                  price_min: product.price_min,
                  price_varies: product.price_varies,
                  compare_at_price: product.compare_at_price,
                  compare_at_price_max: product.compare_at_price_max,
                  compare_at_price_min: product.compare_at_price_min,
                  compare_at_price_varies: product.compare_at_price_varies,
                },
              },
            });
          }
        },
      });
    }
  };

  const renderLoading = () => {
    return range(1, Math.floor(Math.random() * 12) + 1).map(num => <PageCard.Loading key={num} />);
  };

  const renderSuccess = () => {
    const extendCount = loadMoreStatus === 'failure' ? 1 : NUMBER_OF_COLUMNS;
    const rowCount = Math.ceil(data.length / NUMBER_OF_COLUMNS) + (hasNextPage ? NUMBER_OF_COLUMNS : 0);
    return (
      <VirtualList
        rowHeight={ROW_HEIGHT}
        rowCount={rowCount}
        rowRender={rowIndex => {
          const dataSlice = data.slice(rowIndex * NUMBER_OF_COLUMNS, rowIndex * NUMBER_OF_COLUMNS + NUMBER_OF_COLUMNS);
          const rowItem = dataSlice.length ? dataSlice : hasNextPage ? Array(extendCount).fill(undefined) : [];

          return rowItem.map((item, index) => {
            if (loadMoreStatus === 'failure' && typeof item === 'undefined' && rowIndex !== rowCount - 1) {
              return (
                <Button
                  key={index}
                  onClick={() => {
                    loadMoreProducts.request({ search: searchKey });
                  }}
                  radius={8}
                  size="large"
                  block
                  css={{ width: '100%' }}
                >
                  {i18n.t('builderPage.retry')}
                </Button>
              );
            }
            if (typeof item === 'undefined' && loadMoreStatus !== 'failure') {
              return (
                <ViewportTracking key={index} offsetTop={-200} onEnterViewport={handleLoadmore}>
                  {renderLoading()}
                </ViewportTracking>
              );
            }
            if (item) {
              return (
                <PageCard.Style3
                  borderColor="gray3"
                  key={item.id}
                  loading={productIdsLoading.includes(Number(item.id))}
                  isActive={!!products_.find(product => product.id?.toString() === item.id.toString())}
                  isFailed={productIdsFailed.includes(Number(item.id))}
                  image={item.featuredImage?.src}
                  title={item.title}
                  onClick={handleChooseProduct(item)}
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
    <View css={{ height: '100%' }}>
      <View css={styles.filter}>
        <DebounceInput
          css={styles.input}
          placeholder={i18n.t('builderPage.search', { text: i18n.t('adminDashboard.product') })}
          value={searchKey}
          onValueChange={handleChangeKey}
          block
        />
        <View css={styles.refreshIcon} onClick={handleRefresh}>
          {requestStatus === 'loading' ? <ActivityIndicator size={18} /> : <FontAwesome color="primary" size={18} type="far" name="sync-alt" />}
        </View>
      </View>
      <View
        tagName="a"
        href={`https://${shopName}/admin/products/new`}
        color="primary"
        colorHover="primary"
        target="_blank"
        fontFamily="secondary"
        css={[styles.createLink, { marginBottom: '5px' }]}
      >
        <View css={{ flex: '1', display: 'flex', alignItems: 'center' }}>
          <View css={{ ...styles.icon, marginRight: '8px' }}>
            <FontAwesome size={20} type="far" name="plus-square" />
          </View>
          <View>{i18n.t('general.create', { text: i18n.t('adminDashboard.product') })}</View>
        </View>

        <FontAwesome size={16} type="far" name="external-link" />
      </View>
      <AsyncComponent status={requestStatus} Request={renderLoading()} Success={renderSuccess()} isEmpty={isEmpty(data)} />
    </View>
  );
};
