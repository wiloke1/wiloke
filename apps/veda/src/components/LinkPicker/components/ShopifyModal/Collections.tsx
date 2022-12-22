import AsyncComponent from 'components/AsyncComponent';
import { useLinkPicker } from 'components/LinkPicker/store/context/LinkPickerContext';
import { getShopifyHandle } from 'components/LinkPicker/utils/getShopifyHandle';
import { useShopifyModal } from 'components/LinkPicker/utils/globaState';
import PageCard from 'components/PageCard';
import ScrollBars from 'components/ScrollBars';
import { isEmpty } from 'ramda';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useChangeCollectionKey, useGetCollections, useLoadMoreCollections } from 'store/actions/shopify';
import { defaultCollectionDataState } from 'store/reducers/shopify/reducerCollection';
import { shopifySelector } from 'store/selectors';
import { i18n } from 'translation';
import { CollectionApiData } from 'types/Collections';
import { ActivityIndicator, View, ViewportTracking } from 'wiloke-react-core';
import { DebounceTextInput } from '../Form/Fields/Fields';

export const Collections = () => {
  const { collections, searchKey } = useSelector(shopifySelector.collections);
  const { data, requestStatus, hasNextPage, loadMoreStatus } = collections[searchKey] || defaultCollectionDataState;
  const { value, dispatch } = useLinkPicker();
  const getCollections = useGetCollections();
  const changeKey = useChangeCollectionKey();
  const [, setVisible] = useShopifyModal();
  const loadMoreCollections = useLoadMoreCollections();

  useEffect(() => {
    getCollections.request({ search: searchKey });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchKey]);

  const _handleSearch = (val: string) => {
    changeKey(val);
  };

  const renderLoadMore = () => {
    if (hasNextPage || loadMoreStatus === 'loading') {
      return (
        <ViewportTracking
          offsetBottom={0}
          onEnterViewport={() => {
            if (requestStatus === 'success') {
              loadMoreCollections.request({ search: searchKey });
            }
          }}
        >
          <View css={{ padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
            <ActivityIndicator />
          </View>
        </ViewportTracking>
      );
    }
  };

  const _renderRowItem = (item: CollectionApiData) => {
    const { id, title, handle, image } = item;
    return (
      <PageCard.Style2
        image={image?.src}
        title={title}
        isActive={handle === getShopifyHandle(value)}
        css={{ marginBottom: '5px' }}
        key={id}
        onClick={() => {
          setVisible(false);
          dispatch({
            type: '@LinkPicker/setSettings',
            payload: {
              value: `/collections/${handle}`,
            },
          });
        }}
      />
    );
  };

  const _renderSuccess = () => {
    return (
      <ScrollBars css={{ height: 'calc(100% - 100px) !important' }}>
        <View css={{ padding: '10px', height: '100%' }}>
          <PageCard.Style2
            title={'Collections'}
            isActive={'collections' === getShopifyHandle(value)}
            css={{ marginBottom: '5px' }}
            onClick={() => {
              setVisible(false);
              dispatch({
                type: '@LinkPicker/setSettings',
                payload: {
                  value: `/collections`,
                },
              });
            }}
          />
          {data.map(_renderRowItem)}
          {renderLoadMore()}
        </View>
      </ScrollBars>
    );
  };

  return (
    <View css={{ padding: '15px 0 20px', height: '100%' }}>
      <View css={{ padding: '0 10px' }}>
        <DebounceTextInput
          block
          sizeInput="medium"
          placeholder={i18n.t('builderPage.search', { text: i18n.t('adminDashboard.collection') })}
          css={{ marginBottom: '8px' }}
          value={searchKey}
          onValueChange={_handleSearch}
        />
      </View>

      <AsyncComponent status={requestStatus} isEmpty={isEmpty(data)} Success={_renderSuccess()} />
    </View>
  );
};
