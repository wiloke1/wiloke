import AsyncComponent from 'components/AsyncComponent';
import Button from 'components/Button';
import PageCard from 'components/PageCard';
import TextInput from 'components/TextInput';
import VirtualList from 'components/VirtualList/VirtualList';
import withDebounce from 'hocs/withDebounce';
import { isEmpty, range } from 'ramda';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useChangeProductKey, useGetProducts, useLoadMoreProducts, useRenewProducts } from 'store/actions/shopify';
import { defaultProductDataState } from 'store/reducers/shopify/reducerProducts';
import { liquidVariablesSelector, shopifySelector } from 'store/selectors';
import { i18n } from 'translation';
import { ProductApiData } from 'types/Products';
import { getUserInfo } from 'utils/functions/getUserInfo';
import { ActivityIndicator, FontAwesome, View, ViewportTracking } from 'wiloke-react-core';
import * as styles from '../styles';
import { useSingleProductPicker } from './store/context';

const DebounceInput = withDebounce(TextInput, 'value', 'onValueChange');

const ROW_HEIGHT = 57;
const NUMBER_OF_COLUMNS = 1;

export const Content = () => {
  const { productIdsLoading, productIdsFailed, productIdsLoaded } = useSelector(liquidVariablesSelector);
  const { searchKey, products } = useSelector(shopifySelector.products);
  const { data, requestStatus, hasNextPage, loadMoreStatus } = products[searchKey] || defaultProductDataState;
  const { dispatch, product } = useSingleProductPicker();

  const changeSearchKey = useChangeProductKey();
  const getProducts = useGetProducts();
  const loadMoreProducts = useLoadMoreProducts();
  const refresh = useRenewProducts();
  const { shopName } = getUserInfo();

  useEffect(() => {
    getProducts.request({ search: searchKey });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchKey]);

  const _handleChangeKey = (value: string) => {
    changeSearchKey(value);
  };

  const _handleChooseProduct = (item: ProductApiData) => () => {
    const isLoading = productIdsLoading.length > 0;
    if (isLoading) {
      return;
    } else {
      dispatch({
        type: '@SetProduct',
        payload: {
          data: {
            handle: item.handle,
            itemId: Number(item.id),
            featuredImg: item.featuredImage?.src,
          },
        },
      });
    }
  };

  const handleRefresh = () => {
    refresh.request({ search: searchKey });
  };

  const renderLoading = () => {
    return range(1, Math.floor(Math.random() * 12) + 1).map(num => <PageCard.Loading key={num} />);
  };

  const renderProducts = () => {
    const rowCount = Math.ceil(data.length / NUMBER_OF_COLUMNS) + (hasNextPage ? NUMBER_OF_COLUMNS : 1);

    return (
      <View css={{ height: '100%', padding: '5px 10px 10px 10px' }}>
        <VirtualList
          rowHeight={ROW_HEIGHT}
          rowCount={rowCount}
          containerCss={{ height: 'calc(100% - 42px)' }}
          rowRender={index => {
            const dataSlice = data.slice(index * NUMBER_OF_COLUMNS, index * NUMBER_OF_COLUMNS + NUMBER_OF_COLUMNS);
            const rowItem = dataSlice.length ? dataSlice : hasNextPage ? Array(NUMBER_OF_COLUMNS).fill(undefined) : [];

            return rowItem.map((item, index) => {
              if (loadMoreStatus === 'failure' && typeof item === 'undefined' && index % NUMBER_OF_COLUMNS === 0) {
                return (
                  <Button
                    key={index}
                    onClick={() => {
                      getProducts.request({ search: searchKey });
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
                  <ViewportTracking
                    key={index}
                    offsetTop={-200}
                    onEnterViewport={() => {
                      if (loadMoreStatus !== 'loading' && hasNextPage && index % NUMBER_OF_COLUMNS === 0) {
                        loadMoreProducts.request({ search: searchKey });
                      }
                    }}
                  >
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
                    isActive={item.handle === product?.handle && productIdsLoaded.includes(Number(item.id))}
                    isFailed={productIdsFailed.includes(Number(item.id))}
                    image={item.featuredImage?.src}
                    title={item.title}
                    onClick={_handleChooseProduct(item)}
                  />
                );
              }
              return null;
            });
          }}
        />
      </View>
    );
  };

  const renderSelected = () => {
    if (product) {
      if (productIdsLoading.includes(product.itemId)) {
        return <PageCard.Style3 css={{ cursor: 'auto' }} borderColor="gray3" title={`${i18n.t('builderPage.data_request.loading')}...`} />;
      }
      if (productIdsLoaded.includes(product.itemId)) {
        const _product = data.find(item => item.handle === product.handle);
        return <PageCard.Style3 css={{ cursor: 'auto' }} image={product.featuredImg} borderColor="gray3" title={_product?.title ?? product.handle} />;
      }
      if (productIdsFailed.includes(product.itemId)) {
        return (
          <PageCard.Style3
            css={{ cursor: 'auto' }}
            image={product.featuredImg}
            borderColor="gray3"
            title={`${i18n.t('builderPage.data_request.failed')}`}
          />
        );
      }
    }

    return (
      <PageCard.Style3
        css={{ cursor: 'auto' }}
        borderColor="gray3"
        title={i18n.t('builderPage.data_not_selected', { text: i18n.t('adminDashboard.product') })}
      />
    );
  };

  return (
    <View css={{ height: '100%', position: 'relative' }} className="SingleProduct-Content">
      <View css={{ height: 'calc(100% - 160px)' }}>
        <View css={{ padding: '10px 10px 0px 10px' }}>
          <View css={styles.filter}>
            <DebounceInput
              css={styles.input}
              placeholder={i18n.t('builderPage.search', { text: i18n.t('adminDashboard.product') })}
              value={searchKey}
              onValueChange={_handleChangeKey}
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
            css={styles.createLink}
          >
            <View css={{ flex: '1', display: 'flex', alignItems: 'center' }}>
              <View css={{ ...styles.icon, marginRight: '8px' }}>
                <FontAwesome size={20} type="far" name="plus-square" />
              </View>
              <View>{i18n.t('general.create', { text: i18n.t('adminDashboard.product') })}</View>
            </View>

            <FontAwesome size={16} type="far" name="external-link" />
          </View>
        </View>

        <AsyncComponent status={requestStatus} Request={renderLoading()} Success={renderProducts()} isEmpty={isEmpty(data)} />
      </View>

      <View css={styles.selectedItem} backgroundColor="light">
        <View css={{ lineHeight: '1.8' }} fontFamily="secondary" color="primary">
          {i18n.t('general.currently_selected')}
        </View>

        {renderSelected()}
      </View>
    </View>
  );
};
